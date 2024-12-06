// Must be have format PascalCase*Enum
export enum NodeEnvEnum {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGING = 'staging',
  TEST = 'test',
  LOCAL = 'local',
}

export enum ResponseStatusEnum {
  SUCCESS = 'success',
  FAILED = 'failed',
  ERROR = 'error',
}

export enum OrderTypeEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum AccountRoleEnum {
  ADMIN = '00001',
  STAFF = '00002',
  FRANCHISEES = '00003',
}

export enum AccountStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum OsPlatformEnum {
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}

export enum LoginTypeEnum {
  STANDARD = 'STANDARD',
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
}

export enum FileTypeEnum {
  ANY = 'ANY',
  MEDIA = 'MEDIA',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
  AUDIO = 'AUDIO',
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  FIELDS = 'FIELDS',
}

export enum TemplateEmailPathEnum {
  FORGOT_PASSWORD = '/src/utils/templates/forgot-password-email.ejs',
  SIGNUP_SUCCESS = '/src/utils/templates/signup-success.ejs',
  RESTORE_DELETED_ACCOUNT = '/src/utils/templates/restore-deleted-account.ejs',
}

export enum VerifyCodeTypeEnum {
  FORGOT_PASSWORD = 'forgot_password',
}

export enum TaskStatusEnum {
  NEW = 'NEW',
  PROGRESS = 'PROGRESS',
  HOLD = 'HOLD',
  COMPLETED = 'COMPLETED',
}

export enum TaskPriorityEnum {
  URGENT = 'URGENT',
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW',
}