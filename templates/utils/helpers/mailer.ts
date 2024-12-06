import Joi from 'joi';
import * as fs from 'fs';
import ejs from 'ejs';
import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from '@getbrevo/brevo';
import env from '../config/env';
import { TemplateEmailPathEnum } from '../enum/base';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

class EmailService {
  config: SendSmtpEmail;

  private constructor(configs = {}) {
    this.config = new SendSmtpEmail();
    this.config = { ...this.config, ...configs };
  }

  static create(configs: WithRequired<SendSmtpEmail, 'subject' | 'sender' | 'to'>): EmailService {
    return new EmailService(configs);
  }

  /**
   * Compose the email by setting the template path, data, and validating data against the provided Joi schema.
   *
   * @param templatePath - The path to the EJS template file.
   * @param data - (Optional) The data to be used in the email template.
   * @param schema - (Optional) The Joi schema to validate the data against.
   * @returns {EmailService} - Returns the modified EmailService instance for method chaining.
   */
  async compose(
    templatePath: TemplateEmailPathEnum,
    data: any,
    schema?: Joi.Schema
  ): Promise<boolean> {
    try {
      const service = new TransactionalEmailsApi();
      service.setApiKey(TransactionalEmailsApiApiKeys.apiKey, env.BREVO_API_KEY);

      // Validation
      if (schema) {
        const validationResult = schema.validate(data);

        if (validationResult.error) {
          return false;
        }
      }

      // Load template html
      const template = fs.readFileSync(process.cwd() + templatePath, 'utf-8');
      const html = ejs.render(template, data);
      this.config.htmlContent = html;

      // Send mail
      const res = await service.sendTransacEmail(this.config);
      
      return true;
    } catch (error: any) {
      return false;
    }
  }
}

export default EmailService;
