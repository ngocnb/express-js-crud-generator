import lodash from 'lodash';
import { IJsonObjectBuilder, IPagination } from '../../interfaces/common';
import { Brackets, WhereExpressionBuilder } from 'typeorm';

export default class QueryHelper {
  static queryJsonObject = (payload: {
    alias: string;
    jsonObjectBuilders: IJsonObjectBuilder[];
    isArray: boolean;
  }) => {
    const { alias, jsonObjectBuilders, isArray = false } = payload;
    const jsonBuilder = jsonObjectBuilders
      .flatMap((item) => [`'${item.alias}'`, item.field])
      .join(', ');
    let queryBuilder = `JSON_BUILD_OBJECT(
            ${jsonBuilder}
          ) "${alias}"`;
    if (isArray) {
      queryBuilder = `JSON_AGG(${queryBuilder})`;
    }
    return queryBuilder;
  };

  static queryWhereLike = (column: string, search?: string) => {
    return `${column} ILIKE '%${search}%'`;
  };

  static querySearch = (queryBuilder: any, fields: string[], searchKey: string) => {
    queryBuilder.andWhere(
      new Brackets((qb: WhereExpressionBuilder) => {
        fields.forEach((field) => {
          qb.orWhere(`${this.queryWhereLike(field, searchKey)}`);
        });
      })
    );
  };
}
