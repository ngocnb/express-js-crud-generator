export const HTTP_RESPONSE = {
  COMMON: {
    SUCCESS: {
      message: 'Success',
      code: 200,
    },
    CREATED: {
      message: 'Create Success',
      code: 201,
    },
    BAD_REQUEST: {
      message: 'Bad Request',
      code: 400,
    },
    UNAUTHORIZED: {
      message: 'Unauthorized',
      code: 401,
    },
    FORBIDDEN: {
      message: 'Forbidden',
      code: 403,
    },
    NOT_FOUND: {
      message: 'Not Found',
      code: 404,
    },
    INTERNAL_SERVER_ERROR: {
      message: 'Internal Server Error',
      code: 500,
    },
    ALREADY_EXISTS: {
      message: 'Already Exists',
      code: 409,
    },
  },

  FILE: {
    REQUIRED: {
      message: 'File Is Required',
      code: 39000,
    },
    EXT_INVALID: {
      message: 'Extension Invalid',
      code: 39001,
    },
    UPLOAD_SUCCESS: {
      MESSAGE: 'Upload file successful',
      CODE: 39002,
    },
    UPLOAD_FAIL: {
      MESSAGE: 'Upload file failed',
      CODE: 39003,
    },
    NOT_FOUND: {
      MESSAGE: 'File not found',
      CODE: 39004,
    },
  },

  AUTH: {
    LOGIN_SUCCESS: {
      message: 'Login Success',
      code: 10000,
    },
    INVALID_API_KEY: {
      message: 'Invalid Api Key',
      code: 10003,
    },
    ACCOUNT_NOT_FOUND: {
      message: 'Account not activated by admin or not registered',
      code: 10004,
    },
    INCORRECT: {
      message: 'The data you entered is not correct. Please review it',
      code: 10005,
    },
    INVALID_CODE: {
      message: 'The authorization code is invalid or has expired',
      code: 10006,
    },
    ALREADY_EXISTS_AND_DELETED: {
      message: 'Your account already exists and has been deleted.',
      code: 10007,
    },
  },

  ACCOUNT: {
    CREATED: {
      message: 'Create Account Success',
      code: 13000,
    },
    NOT_FOUND: {
      message: 'Account not found',
      code: 13001,
    },
    EMAIL_ALREADY_EXISTS: {
      message: 'Email already exists',
      code: 13002,
    },
  },

  USER: {
    GET_LIST_SUCCESS: {
      message: 'Get List Employees Successful',
      code: 14000,
    },
    CREATED: {
      message: 'Create Employee Successful',
      code: 14001,
    },
    INVALID_EMAIL: {
      message: 'Email Already Exists',
      code: 14002,
    },
    GET_USER_BY_ID: {
      message: 'Get Employee By ID Successful',
      code: 14003,
    },
    NOT_FOUND: {
      message: 'Employee Not Found',
      code: 14004,
    },
    UPDATE_BY_ID: {
      message: 'Update Employee By ID Successful',
      code: 14005,
    },
    DELETE: {
      message: 'Employees Deleted Successfully',
      code: 14006,
    },
  },

  TASK: {
    GET_LIST_SUCCESS: {
      message: 'Get List Tasks Successful',
      code: 15000
    },
    CREATED: {
      message: 'Create Task Successful',
      code: 15001
    },
    NOT_FOUND: {
      message: 'Task Not Found',
      code: 15004
    },
    UPDATE_SUCCESS: {
      message: 'Update Task Successful',
      code: 15005
    },
    DELETE_SUCCESS: {
      message: 'Delete Task Successful',
      code: 15006
    },
    ADD_FILES_TO_TASK_SUCCESS: {
      message: 'Add Files To Task Successful',
      code: 15007
    },
    GET_BY_ID: {
      message: 'Get Task By Id Successful',
      code: 15008
    },
  },

  TAG: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Tags Successful',
      code: 16000
    },
    CREATED: {
      message: 'Create Tag Successful',
      code: 16001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Tag By ID Successful',
      code: 16003,
    },
    NOT_FOUND: {
      message: 'Tag Not Found',
      code: 16004
    },
    UPDATE_SUCCESS: {
      message: 'Update Tag Successful',
      code: 16005
    },
    DELETE_SUCCESS: {
      message: 'Delete Tag Successful',
      code: 16006
    },
    ALREADY_EXISTS: {
      message: 'Tag Already Exists',
      code: 16007,
    },
  },

  CUSTOMER: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Customers Successful',
      code: 17000
    },
    CREATED: {
      message: 'Create Customer Successful',
      code: 17001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Customer By ID Successful',
      code: 17003,
    },
    NOT_FOUND: {
      message: 'Customer Not Found',
      code: 17004
    },
    UPDATE_SUCCESS: {
      message: 'Update Customer Successful',
      code: 17005
    },
    DELETE_SUCCESS: {
      message: 'Delete Customer Successful',
      code: 17006
    },
    INCORRECT: {
      message: 'Incorrect customer ID',
      code: 17007,
    },
  },

  QUOTE: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Quotes Successful',
      code: 18000
    },
    CREATED: {
      message: 'Create Quote Successful',
      code: 18001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Quote By ID Successful',
      code: 18003,
    },
    NOT_FOUND: {
      message: 'Quote Not Found',
      code: 18004
    },
    UPDATE_SUCCESS: {
      message: 'Update Quote Successful',
      code: 18005
    },
    DELETE_SUCCESS: {
      message: 'Delete Quote Successful',
      code: 18006
    },
  },

  OPPORTUNITY_MARK_LOST: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Opportunity Mark Losts Successful',
      code: 19000
    },
    CREATED: {
      message: 'Create Opportunity Mark Lost Successful',
      code: 19001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Opportunity Mark Lost By ID Successful',
      code: 19003,
    },
    NOT_FOUND: {
      message: 'Opportunity Mark Lost Not Found',
      code: 19004
    },
    UPDATE_SUCCESS: {
      message: 'Update Opportunity Mark Lost Successful',
      code: 19005
    },
    DELETE_SUCCESS: {
      message: 'Delete Opportunity Mark Lost Successful',
      code: 19006
    },
    RESTORE_SUCCESS: {
      message: 'Restore Deal Lost Successful',
      code: 19007
    },
  },

  PRODUCT: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Products Successful',
      code: 20000
    },
    CREATED: {
      message: 'Create Product Successful',
      code: 20001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Product By ID Successful',
      code: 20003,
    },
    NOT_FOUND: {
      message: 'Product Not Found',
      code: 20004
    },
    UPDATE_SUCCESS: {
      message: 'Update Product Successful',
      code: 20005
    },
    DELETE_SUCCESS: {
      message: 'Delete Product Successful',
      code: 20006
    },
  },

  PRODUCT_TYPE: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Product Types Successful',
      code: 21000
    },
    CREATED: {
      message: 'Create Product Type Successful',
      code: 21001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Product Type By ID Successful',
      code: 21003,
    },
    NOT_FOUND: {
      message: 'Product Type Not Found',
      code: 21004
    },
    UPDATE_SUCCESS: {
      message: 'Update Product Type Successful',
      code: 21005
    },
    DELETE_SUCCESS: {
      message: 'Delete Product Type Successful',
      code: 21006
    },
  },

  CUSTOMER_SCHEDULE: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Lead Schedules Successful',
      code: 21000
    },
    CREATED: {
      message: 'Create Lead Schedule Successful',
      code: 21001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Lead Schedule By ID Successful',
      code: 21003,
    },
    NOT_FOUND: {
      message: 'Lead Schedule Not Found',
      code: 21004
    },
    UPDATE_SUCCESS: {
      message: 'Update Lead Schedule Successful',
      code: 21005
    },
    DELETE_SUCCESS: {
      message: 'Delete Lead Schedule Successful',
      code: 21006
    },
  },

  DEAL: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Deals Successful',
      code: 22000
    },
    CREATED: {
      message: 'Create Deal Successful',
      code: 22001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Deal By ID Successful',
      code: 22003,
    },
    NOT_FOUND: {
      message: 'Deal Not Found',
      code: 22004
    },
    UPDATE_SUCCESS: {
      message: 'Update Deal Successful',
      code: 22005
    },
    DELETE_SUCCESS: {
      message: 'Delete Deal Successful',
      code: 22006
    },
    INCORRECT: {
      message: 'Incorrect Deal ID',
      code: 22007,
    },
  },

  QUOTE_ITEM: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Quote Items Successful',
      code: 23000
    },
    CREATED: {
      message: 'Create Quote Item Successful',
      code: 23001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Quote Item By Quote ID Successful',
      code: 23003,
    },
    NOT_FOUND: {
      message: 'Quote Item Not Found',
      code: 23004
    },
    UPDATE_SUCCESS: {
      message: 'Update Quote Item Successful',
      code: 23005
    },
    DELETE_SUCCESS: {
      message: 'Delete Quote Item Successful',
      code: 23006
    },
    ALREADY_EXISTS: {
      message: 'Quote Item Already Exists',
      code: 23009,
    },
  },

  PAYMENT: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Payments Successful',
      code: 24000
    },
    CREATED: {
      message: 'Create Payment Successful',
      code: 24001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Payment By Quote ID Successful',
      code: 24003,
    },
    NOT_FOUND: {
      message: 'Payment Not Found',
      code: 24004
    },
    UPDATE_SUCCESS: {
      message: 'Update Payment Successful',
      code: 24005
    },
    DELETE_SUCCESS: {
      message: 'Delete Payment Successful',
      code: 24006
    },
    ALREADY_EXISTS: {
      message: 'Payment Already Exists',
      code: 24009,
    },
    NOT_PRIMARY: {
      message: 'The quote is not primary; please only make payments based on the primary quote.',
      code: 24010,
    },
    ITEM_NOT_FOUND: {
      message: 'No items have been created in the quote yet.',
      code: 24011,
    },
  },

  DEAL_HISTORY: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Historys Successful',
      code: 25000
    },
    CREATED: {
      message: 'Create History Successful',
      code: 25001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get History By ID Successful',
      code: 25003,
    },
    NOT_FOUND: {
      message: 'History Not Found',
      code: 25004
    },
    UPDATE_SUCCESS: {
      message: 'Update History Successful',
      code: 25005
    },
    DELETE_SUCCESS: {
      message: 'Delete History Successful',
      code: 25006
    },
  },

  PRICE_MATRIX: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Matrices Successful',
      code: 26000
    },
    CREATED: {
      message: 'Create Matrix Successful',
      code: 26001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Matrix By ID Successful',
      code: 26003,
    },
    NOT_FOUND: {
      message: 'Matrix Not Found',
      code: 26004
    },
    UPDATE_SUCCESS: {
      message: 'Update Matrix Successful',
      code: 26005
    },
    DELETE_SUCCESS: {
      message: 'Delete Matrix Successful',
      code: 26006
    },
    ALREADY_EXISTS: {
      message: 'Matrix Already Exists',
      code: 26009,
    },
  },

  COUNTY_SALES_TAX: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Sales Taxes Successful',
      code: 27000
    },
    CREATED: {
      message: 'Create Sales Tax Successful',
      code: 27001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Sales Tax By ID Successful',
      code: 27003,
    },
    NOT_FOUND: {
      message: 'Sales Tax Not Found',
      code: 27004
    },
    UPDATE_SUCCESS: {
      message: 'Update Sales Tax Successful',
      code: 27005
    },
    DELETE_SUCCESS: {
      message: 'Delete Sales Tax Successful',
      code: 27006
    },
    ALREADY_EXISTS: {
      message: 'Sales Tax Already Exists',
      code: 27009,
    },
    STATE_ALREADY_EXISTS: {
      message: 'State Already Exists',
      code: 27010,
    },
    STATE_NOT_FOUND: {
      message: 'State Not Found',
      code: 27011
    },
  },

  DEAL_NOTE: {
    GET_LIST_SUCCESS: {
      message: 'Get List of Deal Notes Successful',
      code: 28000
    },
    CREATED: {
      message: 'Create Deal Note Successful',
      code: 28001
    },
    GET_BY_ID_SUCCESS: {
      message: 'Get Deal Note By ID Successful',
      code: 28003,
    },
    NOT_FOUND: {
      message: 'Deal Note Not Found',
      code: 28004
    },
    UPDATE_SUCCESS: {
      message: 'Update Deal Note Successful',
      code: 28005
    },
    DELETE_SUCCESS: {
      message: 'Delete Deal Note Successful',
      code: 28006
    },
  },
};
