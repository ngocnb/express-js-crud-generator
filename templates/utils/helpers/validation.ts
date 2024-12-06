import AppError from '../config/app-error';
import { HTTP_RESPONSE } from '../constants/http-response';
import CustomerRepository from '../../repositories/customer';
import AccountRepository from '../../repositories/account';
import logger from '../config/logger';
import { AccountStatusEnum } from '../enum/base';
import TagRepository from '../../repositories/tag';
import QuoteRepository from '../../repositories/quote';
import DealRepository from '../../repositories/deal';
import DealEntity from '../../entities/deal';
import ProductRepository from '../../repositories/product';
import QuoteEntity from '../../entities/quote';
import ProductEntity from '../../entities/product';

export default class ValidationHelper {
  static validateExistAccountById = async (accountId: number, accountRepository: AccountRepository): Promise<void> => {
    const labelLog = '[helper/validation.ts] [validateExistAccountById]';
    const account = await accountRepository.findOne({ id: accountId });

    if (!account) {
      const message = HTTP_RESPONSE.ACCOUNT.NOT_FOUND.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.NOT_FOUND.code,
        message,
        HTTP_RESPONSE.ACCOUNT.NOT_FOUND.code,
      );
    }
  };

  static validateExistCustomerById = async (customerId: number, customerRepository: CustomerRepository): Promise<void> => {
    const labelLog = '[helper/validation.ts] [validateExistCustomerById]';
    const customer = await customerRepository.findOne({ id: customerId });

    if (!customer) {
      const message = HTTP_RESPONSE.CUSTOMER.NOT_FOUND.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.NOT_FOUND.code,
        message,
        HTTP_RESPONSE.CUSTOMER.NOT_FOUND.code,
      );
    }
  };

  static validateEmailAccountNotRegistered = async (email: string, accountRepository: AccountRepository): Promise<void> => {
    const labelLog = '[helper/validation.ts] [validateEmailAccountNotRegistered]';
    const existedAccount = await accountRepository.findOne(
      { email: email }
    );

    if (existedAccount) {      
      const message = HTTP_RESPONSE.ACCOUNT.EMAIL_ALREADY_EXISTS.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.BAD_REQUEST.code,
        message,
        HTTP_RESPONSE.ACCOUNT.EMAIL_ALREADY_EXISTS.code
      );
    }
  };

  static validateActiveAccountByEmail = async (email: string, accountRepository: AccountRepository) => {
    const labelLog = '[helper/validation.ts] [validateActiveAccountByEmail]';
    const existedAccount = await accountRepository.findOne(
      {
        email: email,
        status: AccountStatusEnum.ACTIVE,
      },
      {
        id: true,
        password: true,
      }
    );
    
    if (!existedAccount) {
      const message = HTTP_RESPONSE.AUTH.ACCOUNT_NOT_FOUND.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.NOT_FOUND.code,
        message,
        HTTP_RESPONSE.AUTH.ACCOUNT_NOT_FOUND.code,
      );
    }
  
    return existedAccount;
  };

  static validateExistTagByName = async (tagName: string, tagRepository: TagRepository): Promise<void> => {
    const labelLog = '[helper/validation.ts] [validateExistTagByName]';
    const existedTag = await tagRepository.findOne({ name: tagName.trim() });

    if (existedTag) {
      const message = HTTP_RESPONSE.TAG.ALREADY_EXISTS.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.ALREADY_EXISTS.code,
        message,
        HTTP_RESPONSE.TAG.ALREADY_EXISTS.code
      );
    }
  };

  static validateExistQuoteById = async (quoteId: number, quoteRepository: QuoteRepository): Promise<QuoteEntity> => {
    const labelLog = '[helper/validation.ts] [validateExistQuoteById]';
    const existedQuote = await quoteRepository.findOne({ id: quoteId });

    if (!existedQuote) {
      const message = HTTP_RESPONSE.QUOTE.NOT_FOUND.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.NOT_FOUND.code,
        message,
        HTTP_RESPONSE.QUOTE.NOT_FOUND.code,
      );
    }

    return existedQuote;
  };

  static validateExistDealById = async (dealId: number, dealRepository: DealRepository): Promise<DealEntity> => {
    const labelLog = '[helper/validation.ts] [validateExistDealById]';
    const deal = await dealRepository.findOne({ id: dealId });

    if (!deal) {
      const message = HTTP_RESPONSE.DEAL.NOT_FOUND.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.NOT_FOUND.code,
        message,
        HTTP_RESPONSE.DEAL.NOT_FOUND.code,
      );
    }

    return deal;
  };

  static validateExistProductById = async (productId: number, productRepository: ProductRepository): Promise<ProductEntity> => {
    const labelLog = '[helper/validation.ts] [validateExistProductById]';
    const product = await productRepository.findOne({ id: productId });

    if (!product) {
      const message = HTTP_RESPONSE.PRODUCT.NOT_FOUND.message;
      logger.debug(`${labelLog} ${message}`);

      throw new AppError(
        HTTP_RESPONSE.COMMON.NOT_FOUND.code,
        message,
        HTTP_RESPONSE.PRODUCT.NOT_FOUND.code,
      );
    }

    return product;
  };
}
