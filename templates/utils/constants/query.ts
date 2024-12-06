// profiles table
export const profileSelect = {
  id: true,
  firstName: true,
  lastName: true,
  createdAt: true,
};

// accounts table
export const accountSelect = {
  id: true,
  username: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  profile: profileSelect,
};

// files table
export const fileSelect = {
  id: true,
  url: true,
  type: true,
  resolution: true,
  mimetype: true,
  createdAt: true,
  updatedAt: true,
};

// profiles table
export const employeeProfileSelect = {
  id: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
  address: true,
  employeeID: true,
  performance: true,
  postalCode: true,
  city: true,
  state: true,
  gender: true,
  nationality: true,
  joinDate: true,
  createdAt: true,
  updatedAt: true,
  avatar: fileSelect,
};

// accounts table
export const employeeSelect = {
  id: true,
  email: true,
  username: true,
  role: true,
  status: true,
  enrolled: true,
  createdAt: true,
  updatedAt: true,
  profile: employeeProfileSelect,
};

// product_types table
export const productTypeSelect = {
  id: true,
  title: true,
  avatarId: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  avatar: fileSelect,
};

// products table
export const productSelect = {
  id: true,
  name: true,
  avatarId: true,
  productTypeId: true,
  description: true,
  configurator: true,
  createdAt: true,
  updatedAt: true,
  avatar: fileSelect,
  productType: productTypeSelect,
};

// deal_product_interests table
export const dealProductInterestSelect = {
  id: true,
  dealId: true,
  productTypeId: true,
  createdAt: true,
  updatedAt: true,
  productInterest: productTypeSelect,
};

// deal_sales_reps table
export const dealSalesRepSelect = {
  id: true,
  dealId: true,
  employeeId: true,
  createdAt: true,
  updatedAt: true,
  employee: employeeSelect,
};

// customer table
export const customerSelect = {
  id: true,
  name: true,
  email: true,
  address: true,
  phoneNumber: true,
  avatarId: true,
  referral: true,
  status: true,
  createdAt: true,
  updatedAt: true,
};

// deals table
export const dealSelect = {
  id: true,
  status: true,
  totalDue: true,
  valueWithTax: true,
  totalPaid: true,
  totalPayment: true,
  totalRefund: true,
  saleTax: true,
  referral: true,
  customerId: true,
  createdAt: true,
  updatedAt: true,
  salesRep: dealSalesRepSelect,
  productInterest: dealProductInterestSelect,
  customer: customerSelect
};

// schedule_assignees table
export const scheduleAssigneesSelect = {
  id: true,
  scheduleId: true,
  assigneeId: true,
  createdAt: true,
  updatedAt: true,
  employee: employeeSelect,
};

// deal_schedules table
export const dealScheduleSelect = {
  id: true,
  startDate: true,
  endDate: true,
  startTime: true,
  endTime: true,
  note: true,
  dealId: true,
  activityType: true,
  name: true,
  createdAt: true,
  updatedAt: true,
  deal: dealSelect,
  assignedTo: scheduleAssigneesSelect,
};

// task_assignees table
export const taskAssigneeSelect = {
  id: true,
  taskId: true,
  assigneeId: true,
  createdAt: true,
  updatedAt: true,
  assignee: accountSelect,
};

// tag table
export const tagSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
};

// task_tags table
export const taskTagSelect = {
  id: true,
  taskId: true,
  tagId: true,
  createdAt: true,
  updatedAt: true,
  tag: tagSelect,
};

// task_files table
export const taskFileSelect = {
  id: true,
  taskId: true,
  fileId: true,
  createdAt: true,
  updatedAt: true,
  file: fileSelect,
};

// tasks table
export const taskSelect = {
  id: true,
  name: true,
  description: true,
  startDate: true,
  endDate: true,
  priority: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  taskAssignee: taskAssigneeSelect,
  taskTag: taskTagSelect,
  taskFile: taskFileSelect,
};

// deal_opportunity_losts table
export const dealOpportunityLostSelect = {
  id: true,
  reason: true,
  note: true,
  dealId: true,
  deal: dealSelect,
};

// quote_items field table
export const quoteItemFieldSelect = {
  id: true,
  price: true,
  quantity: true,
  note: true,
  details: true,
  productId: true,
  createdAt: true,
  product: productSelect,
};

// quotes table
export const quoteSelect = {
  id: true,
  name: true,
  dealId: true,
  subtotal: true,
  discount: true,
  grandTotal: true,
  isPrimary: true,
  position: true,
  createdAt: true,
  updatedAt: true,
  updatedBy: true,
  deal: dealSelect,
  quoteItems: quoteItemFieldSelect,
};

// quote_items table
export const quoteItemSelect = {
  id: true,
  price: true,
  quantity: true,
  note: true,
  details: true,
  quoteId: true,
  productId: true,
  createdAt: true,
  updatedAt: true,
  updatedBy: true,
  product: productSelect,
  quote: quoteSelect,
};

// payments table
export const paymentSelect = {
  id: true,
  dealId: true,
  paidOn: true,
  amount: true,
  type: true,
  method: true,
  createdAt: true,
  updatedAt: true,
  deal: dealSelect,
};

// deal_histories table
export const dealHistorySelect = {
  id: true,
  dealId: true,
  eventDate: true,
  event: true,
  createdAt: true,
  updatedAt: true,
  deal: dealSelect,
};

// price_matrices table
export const priceMatrixSelect = {
  id: true,
  name: true,
  xAxisLabel: true,
  yAxisLabel: true,
  details: true,
  createdAt: true,
};

// price_matrices table
export const countySalesTaxSelect = {
  id: true,
  stateId: true,
  name: true,
  salesTax: true,
};

// price_matrices table
export const stateSelect = {
  id: true,
  name: true,
  createdAt: true,
  counties: countySalesTaxSelect,
};

// deal_notes table
export const dealNoteSelect = {
  id: true,
  dealId: true,
  content: true,
  authorId: true,
  createdAt: true,
  author: accountSelect,
};

// deal_attachments table
export const dealAttachmentSelect = {
  id: true,
  dealId: true,
  fileId: true,
  createdAt: true,
  deal: dealSelect,
  file: fileSelect,
};