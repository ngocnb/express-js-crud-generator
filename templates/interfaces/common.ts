import { OrderTypeEnum } from '../utils/enum/base';

export interface IBaseResponse<T = undefined> {
  status: string;
  message: string;
  code: string | number;
  data?: T;
}

export interface IPagination {
  page: number;
  limit: number;
  skip: number;
}

export interface IBaseQuery {
  page?: number;
  limit?: number;
  textSearch?: string;
  sortBy?: string;
  sortType?: OrderTypeEnum;
}

export interface IRequestFile {
  [fieldName: string]: Express.Multer.File[];
}

export interface IJsonObjectBuilder {
  alias: string;
  field: string;
}

export interface IGetListResponse<T> {
  responses: T[];
  pagination: object;
}

export interface IQueryGetList extends IBaseQuery {
  email?: string
}
