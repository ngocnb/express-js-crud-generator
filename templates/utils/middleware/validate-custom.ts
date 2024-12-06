import { NextFunction, Request, Response } from "express";
import { repositories } from "../config/di";
import { HTTP_RESPONSE } from "../constants/http-response";
import { AccountRoleEnum, AccountStatusEnum } from "../enum/base";
import CommonHelper from "../helpers/common";

export const validateSalesRepsIds = async (req: Request, res: Response, next: NextFunction) => {
  const salesRepsIds = req.body?.salesRepsIds;
  if (!salesRepsIds) return next();
  
  for (const saleRepsId of salesRepsIds) {
    const employee = await repositories.account.findOne({
      id: Number(saleRepsId),
      status: AccountStatusEnum.ACTIVE,
      // role: AccountRoleEnum.FRANCHISEES
    });
    
    if (!employee) {
      return res.notFound(
        HTTP_RESPONSE.ACCOUNT.NOT_FOUND.message,
        HTTP_RESPONSE.COMMON.BAD_REQUEST.code
      );
    }
  }

  return next();
};

export const validateInterestedInIds = async (req: Request, res: Response, next: NextFunction) => {
  const interestedInIds = req.body.interestedInIds;
  if (!interestedInIds) return next();

  for (const productTypeId of interestedInIds) {
    const productType = await repositories.productType.findOne({ id: Number(productTypeId) });

    if (!productType) {
      const message = 'Product Type ' + HTTP_RESPONSE.COMMON.NOT_FOUND.message;
      return res.notFound(
        message,
        HTTP_RESPONSE.COMMON.BAD_REQUEST.code
      );
    }
  }

  return next();
};

export const validateAssigneIds = async (req: Request, res: Response, next: NextFunction) => {
  const assigneIds = req.body?.assigneesTo;
  if (!assigneIds || (Array.isArray(assigneIds) && assigneIds.length === 0)) return next();
  
  for (const assigneeId of assigneIds) {
    const employee = await repositories.account.findOne({
      id: Number(assigneeId),
    });
    
    if (!employee) {
      return res.notFound(
        HTTP_RESPONSE.ACCOUNT.NOT_FOUND.message,
        HTTP_RESPONSE.ACCOUNT.NOT_FOUND.code
      );
    }
  }

  return next();
};

export const validateProductConfig = async (req: Request, res: Response, next: NextFunction) => {
  const productConfigSelected = req.body?.item?.details;
  let productId = req.body?.item?.productId;
  let quoteItemId = req.params?.id;
  const errors: string[] = [];
  const fieldSelected = Object.values(productConfigSelected).reduce((acc, obj) => {
    return { ...(acc as object), ...(obj as object) };
  }, {});
  
  if (quoteItemId) {
    const quoteItem = await repositories.quoteItem.findOne({ id: Number(quoteItemId) });
    if (!quoteItem) {
      return res.notFound(
        HTTP_RESPONSE.QUOTE_ITEM.NOT_FOUND.message,
        HTTP_RESPONSE.QUOTE_ITEM.NOT_FOUND.code
      );
    }

    productId = quoteItem.productId;
  }

  if (!productConfigSelected ||!productId) {
    return res.notFound(
      HTTP_RESPONSE.PRODUCT.NOT_FOUND.message,
      HTTP_RESPONSE.PRODUCT.NOT_FOUND.code
    );
  }

  const product = await repositories.product.findOne({ id: productId });
  
  if (!product?.configurator) return next();

  const productConfig = JSON.parse(product.configurator);
  if (!productConfig?.configurable || Object.keys(productConfig?.configurable).length === 0) return next();

  for (const step in productConfig.configurable.step) {
    const stepConfig = productConfig.configurable.step[step];

    for (const field in stepConfig.fields) {
      const fieldConfig = stepConfig.fields[field];
      const fieldValue = productConfigSelected?.[step]?.[field];

      // Check required fields
      if (typeof fieldConfig.required === 'string') {

        //Convert condition in string to function
        const replaceCondition = replaceFunctionsWithConditions(fieldConfig.required, productConfig?.computed);
        const conditionResult = CommonHelper.evaluateCondition(replaceCondition, fieldSelected);

        if (!conditionResult && productConfigSelected[step]) {
          // If the condition is not met, do not allow input (set field as null)
          productConfigSelected[step][field] = null;
          continue;
        }

        // if the required with condition in json data does not match return error
        if (conditionResult && !fieldValue) {
          errors.push(`${step} ${field} is required if ${replaceCondition}`);
          continue;
        }
      } else if (!fieldValue && fieldConfig.required) {
        errors.push(`${step} ${field} is required`);
        continue;
      }

      // If the condition is not required but has a default value, set the default value.
      if (fieldConfig.default_value && !fieldValue) {
        productConfigSelected[step][field] = fieldConfig.default_value;
      }

      //Check value in options data
      if ((fieldConfig.options && fieldValue) || fieldConfig.input?.options && fieldValue) {
        const validOptions = [
          ...processFieldOptions(fieldConfig.options),
          ...processFieldOptions(fieldConfig.input?.options),
        ];

        if (!validOptions.includes(fieldValue)) {
          errors.push(`${step} ${field} must be one of: [${validOptions.join(", ")}]`);
        }

        //Handle error in option
        fieldConfig.options?.map((option: any) => {
          if (!option?.disabled || (fieldValue != option.label && fieldValue != option.choice)) return;
          
          if (typeof option.disabled === 'string') {
            const replaceOptionCondition = replaceFunctionsWithConditions(option.disabled, productConfig?.computed);            
            const optionConditionResult = CommonHelper.evaluateCondition(replaceOptionCondition, fieldSelected);
    
            if (!optionConditionResult) return;

            // if the required with condition in json data does not match return error
            return errors.push(`${option.disabled_message ?? option} when ${field} is ${option.label || option.choice}`);

          } else if (typeof option.disabled === 'boolean') {
            return errors.push(`${option.disabled_message ?? option} when ${field} is ${option.label || option.choice}`);
          }
        });
      }

      //Check value in option_set data
      if ((fieldConfig.option_set && fieldValue)) {
        const validOptionSet = fieldConfig.option_set.flatMap((optionSet: any) => {
          const replaceConditionActive = replaceFunctionsWithConditions(optionSet.active, productConfig?.computed);            
          const isConditionActive = CommonHelper.evaluateCondition(replaceConditionActive, fieldSelected);
          return isConditionActive ? optionSet.options : [];
        });

        const choices = validOptionSet.map((option: any) => option.choice || option.label || option);
        if (!choices.includes(fieldValue)) {
          errors.push(`${step} ${field} must be one of: [${choices.join(", ")}]`);
        }        
      }

      //Check field valid in checks
      if ((fieldConfig.checks && fieldValue)) {
        fieldConfig.checks.map((check: any) => {
          if (!check?.condition) return;
          if (typeof check.condition !== 'string') return;

          const replaceCondition = replaceFunctionsWithConditions(check.condition, productConfig?.computed);            
          const conditionResult = CommonHelper.evaluateCondition(replaceCondition, fieldSelected);

          if (!conditionResult) return;
          if (!check?.constraint) return;
          
          const replaceConstraint= replaceFunctionsWithConditions(check.constraint, productConfig?.computed);            
          const constraintResult = CommonHelper.evaluateCondition(replaceConstraint, fieldSelected);

          if (constraintResult) return;
          return errors.push(`${step} ${field} ${check.message}`);
        });  
      }

      //Check value data type
      if (fieldConfig.visible && typeof fieldConfig.visible === 'string') {
        const isVisible = CommonHelper.evaluateCondition(fieldConfig.visible, fieldSelected);
        if (!isVisible) continue;
      }

      if (fieldConfig.type === "Numeric" && typeof fieldValue !== "number") {
        errors.push(`${step} ${field} must be a number`);
      } else if (fieldConfig.type === "String" && typeof fieldValue !== "string") {
        errors.push(`${step} ${field} must be a string`);
      }
    }
  }

  if (errors.length > 0) {
    return res.badRequest(`Schema invalid: ${errors.join(". ")}`, HTTP_RESPONSE.COMMON.BAD_REQUEST.code);
  }

  return next();
};

const processFieldOptions = (options: any[]) => {
  return options?.map((option: any) => {
    if (option.choice) return option.choice;
    else if (option.label) return option.label;
    else return option;
  }) || [];
};

const replaceFunctionsWithConditions = (condition: string, computed: any): string => {
  if (!computed) return condition;

  // Regex find all format function `function()`
  const functionRegex = /(\w+)\(\)/g;

  // Replace all function from computed
  const res = condition.replace(functionRegex, (_, funcName) => {
    if (computed[funcName]) {
      return `(${computed[funcName]})`; 
    }
    return funcName;
  });

  return computed[condition] ?? res;
}