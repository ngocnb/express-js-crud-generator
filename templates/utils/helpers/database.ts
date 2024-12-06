import { Request } from 'express';

export const beforeCreate = (data: any, req: Request) => {
  const now = new Date();
  const accountId = req?.session?.account?.id;

  return {
    ...data,
    createdAt: now,
    updatedAt: now,
    createdBy: accountId,
    updatedBy: accountId,
  };
};

export const beforeUpdate = (data: any, req: Request) => {
  return {
    ...data,
    updatedAt: new Date(),
    updatedBy: req?.session?.account?.id,
  };
};

export const beforeDelete = (data: any, req: Request) => {
  return {
    ...data,
    deletedAt: new Date(),
    deletedBy: req?.session?.account?.id,
  };
};