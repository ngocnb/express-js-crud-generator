import { Container } from 'typedi';
import AuthController from '../../controllers/auth';
import FileController from '../../controllers/file';
import UserController from '../../controllers/user';
import AccountService from '../../services/user';
import AccountRepository from '../../repositories/account';
import ProfileRepository from '../../repositories/profile';
import TagController from '../../controllers/tag';
import ProductTypeController from '../../controllers/product-type';
import ProductTypeService from '../../services/product-type';
import TagService from '../../services/tag';
import FileService from '../../services/file';
import TagRepository from '../../repositories/tag';
import ProductTypeRepository from '../../repositories/product-type';
import FileRepository from '../../repositories/file';
import CustomerController from '../../controllers/customer';
import CustomerService from '../../services/customer';
import CustomerRepository from '../../repositories/customer';
import DealSalesRepRepository from '../../repositories/deal-sales-rep';
import DealProductInterestRepository from '../../repositories/deal-product-interest';
import TaskController from '../../controllers/task';
import TaskService from '../../services/task';
import TaskRepository from '../../repositories/task';
import DealScheduleController from '../../controllers/deal-schedule';
import DealScheduleRepository from '../../repositories/deal-schedule';
import DealScheduleService from '../../services/deal-schedule';
import ProductController from '../../controllers/product';
import TaskAssigneeRepository from '../../repositories/task-assignee';
import TaskTagRepository from '../../repositories/task-tag';
import TaskFileRepository from '../../repositories/task-file';
import QuoteController from '../../controllers/quote';
import QuoteService from '../../services/quote';
import QuoteRepository from '../../repositories/quote';
import DealOpportunityLostController from '../../controllers/deal-opportunity-lost';
import DealController from '../../controllers/deal';
import QuoteItemController from '../../controllers/quote-item';
import QuoteItemService from '../../services/quote-item';
import PaymentController from '../../controllers/payment';
import DealHistoryService from '../../services/deal-history';
import DealHistoryController from '../../controllers/deal-history';
import PriceMatrixController from '../../controllers/price-matrix';
import CountySalesTaxController from '../../controllers/county-sales-tax';
import ProductService from '../../services/product';
import ProductRepository from '../../repositories/product';
import DealNoteController from '../../controllers/deal-note';
import DealAttachmentController from '../../controllers/deal-attachment';
import QuoteItemRepository from '../../repositories/quote-item';

const controllers = {
  file: Container.get(FileController),
  auth: Container.get(AuthController),
  user: Container.get(UserController),
  tag: Container.get(TagController),
  productType: Container.get(ProductTypeController),
  customer: Container.get(CustomerController),
  task: Container.get(TaskController),
  dealSchedule: Container.get(DealScheduleController),
  product: Container.get(ProductController),
  quote: Container.get(QuoteController),
  dealOpportunityLost: Container.get(DealOpportunityLostController),
  deal: Container.get(DealController),
  quoteItem: Container.get(QuoteItemController),
  payment: Container.get(PaymentController),
  dealHistory: Container.get(DealHistoryController),
  priceMatrix: Container.get(PriceMatrixController),
  salesTax: Container.get(CountySalesTaxController),
  dealNote: Container.get(DealNoteController),
  dealAttachment: Container.get(DealAttachmentController),
};

const services = {
  account: Container.get(AccountService),
  productType: Container.get(ProductTypeService),
  tag: Container.get(TagService),
  file: Container.get(FileService),
  customer: Container.get(CustomerService),
  task: Container.get(TaskService),
  dealSchedule: Container.get(DealScheduleService),
  quote: Container.get(QuoteService),
  quoteItem: Container.get(QuoteItemService),
  dealHistory: Container.get(DealHistoryService),
  product: Container.get(ProductService),
};

const repositories = {
  account: Container.get(AccountRepository),
  profile: Container.get(ProfileRepository),
  productType: Container.get(ProductTypeRepository),
  tag: Container.get(TagRepository),
  file: Container.get(FileRepository),
  customer: Container.get(CustomerRepository),
  task: Container.get(TaskRepository),
  taskAssignee: Container.get(TaskAssigneeRepository),
  taskTag: Container.get(TaskTagRepository),
  taskFile: Container.get(TaskFileRepository),
  dealSchedule: Container.get(DealScheduleRepository),
  dealSalesRep: Container.get(DealSalesRepRepository),
  dealProductInterest: Container.get(DealProductInterestRepository),
  quote: Container.get(QuoteRepository),
  product: Container.get(ProductRepository),
  quoteItem: Container.get(QuoteItemRepository),
};

export { controllers, repositories, services };
