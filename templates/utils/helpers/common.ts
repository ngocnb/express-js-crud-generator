import lodash from 'lodash';
import { IPagination } from '../../interfaces/common';

export default class CommonHelper {
  static generateGuid = (): string => {
    const generateSegment = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };

    const guid =
      generateSegment() +
      generateSegment() +
      '-' +
      generateSegment() +
      '-' +
      generateSegment() +
      '-' +
      generateSegment() +
      '-' +
      generateSegment() +
      generateSegment() +
      generateSegment();

    return guid;
  };

  static convertKeysToCamelCase = (data: object): object => {
    return lodash.mapKeys(data, (_, key) => lodash.camelCase(key));
  };

  static convertSnakeCaseToCamelCase = (data: object | object[]): object | object[] => {
    if (Array.isArray(data)) {
      return data.map((item) => this.convertKeysToCamelCase(item));
    }

    return this.convertKeysToCamelCase(data);
  };

  static assignPaging = (page = 1, limit = 10): IPagination => {
    const skip = (page - 1) * limit;

    return {
      page,
      limit,
      skip,
    };
  };

  static typeOf = (value: any): string => {
    return Object.prototype.toString.call(value);
  };

  static pagination = (page = 1, limit = 10, totalItems: number) => {
    const skip = (page - 1) * limit;

    return {
      totalItems: totalItems,
      totalPage: Math.ceil(totalItems / limit),
      page,
      limit,
      skip,
    }
  };

  static evaluateCondition = (condition: string, params: any): boolean => {
    try {
      const regex1 = /(\w+)\.present\(\)/g;
      const regex2 = /(\w+)\.present/g;

      // Replace present() and present from ruby with checking for property existence
      let transformedCondition = condition.replace(regex1, '$1');
      if (condition.includes('present')) {
        transformedCondition = transformedCondition.replace(regex2, '$1');
      }
      
      const fn = new Function(...Object.keys(params), `return ${transformedCondition};`);
      return fn(...Object.values(params));
  
    } catch (error: any) {
      return false;
    }
  }
}
