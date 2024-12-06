export enum BusinessFileEnum {
  AVATAR = 'AVATAR_ACCOUNT',
  INVENTORY_IMAGE = 'INVENTORY_IMAGE',
  FRANCHISEE_IMAGE = 'FRANCHISEE_IMAGE',
  TASK_FILE = 'TASK_FILE',
  DEAL_ATTACHMENT = 'DEAL_ATTACHMENT'
}

export enum ResolutionEnum {
  FULL_HD = '1920x1080',
  HD = '1280x720',
}

export enum QuoteStatus {
  COMPLETED = 'Completed',
  ARCHIVED = 'Archived',
  OPPORTUNITY = 'Opportunity',
  LEAD = 'Lead',
};

export enum CustomerStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  SCHEDULED = 'Scheduled',
};

export enum DealStatus {
  LEAD = 'lead',
  OPPORTUNITY = 'opportunity',
  QUOTED = 'quoted',
  WON = 'won',
  PENDING_SITE_CHECK = 'pending_measure',
  ORDERED = 'ordered',
  PENDING_INSTALLATION = 'install_in_progress',
  INSTALLED = 'installed',
  LOST = 'lost',
};

export enum ScheduleActivityType {
  SALES_CONSULT = 'Sales Consult',
  MEASURE = 'Measure',
  INSTALL_RETURN = 'Install Return',
  INSTALL = 'Install',
};

export enum PaymentTypeEnum {
  DEPOSIT = 'Deposit',
  REFUND = 'Refund',
};

export enum PaymentMethodEnum {
  NONE = 'None',
  CASH = 'Cash',
  CREDIT_CARD = 'Credit Card',
  CHECK = 'Check',
  ZELLE = 'Zelle',
};

export enum CustomerDealFilterEnum {
  OPPORTUNITY = 'opportunity',
  DEAL = 'deal',
  ALL = 'all',
};