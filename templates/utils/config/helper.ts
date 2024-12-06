import lodash from 'lodash';

export default class HelperService {
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

  static generateRandomCode = (codeLength: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomCode = Array.from({ length: codeLength }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');

    return randomCode;
  };

  static convertSnakeCaseToCamelCase = (data: object | object[]): object | object[] => {
    if (Array.isArray(data)) {
      return data.map((item) => this.convertKeysToCamelCase(item));
    }

    return this.convertKeysToCamelCase(data);
  };
}
