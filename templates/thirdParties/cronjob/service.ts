import logger from '../../utils/config/logger';

export default class CronJobService {
  private static labelLog: string = '[cronjob/service.ts]';

  static RunCronJobEvery3Minutes = async () => {
    const labelLogLocal = `${this.labelLog} [RunCronJobEvery3Minutes]`;
    logger.info(`${labelLogLocal} running`);
    try {
    } catch (error: any) {
      logger.error(`${labelLogLocal} error -> ${error.message}`);
    }
  };
}
