import { CronJob } from 'cron';
import CronJobService from './service';
import logger from '../../utils/config/logger';

export default class CronJobModule {
  private static labelLog: string = '[cronjob/index.ts]';

  static runAllJob = () => {
    const labelLogLocal = `${this.labelLog} [runAllJob]`;
    logger.info(`${labelLogLocal} start running`);

    try {
      this.jobEvery3Minutes();
    } catch (error: any) {
      logger.error(`${labelLogLocal} error -> ${error.message}`);
    }
  };

  static jobEvery3Minutes = () => {
    const cronTime = '*/3 * * * *'; // Runs on every 3 minutes.

    const job = CronJob.from({
      cronTime,
      onTick: async () => {
        await CronJobService.RunCronJobEvery3Minutes();
      },
      start: false,
    });

    return job.start();
  };
}
