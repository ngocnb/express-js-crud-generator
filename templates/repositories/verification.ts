import VerificationEntity from '../entities/verification';
import { Service } from 'typedi';
import { BaseRepository } from './base';

@Service()
export default class VerificationRepository extends BaseRepository<VerificationEntity> {
    constructor() {
        super(VerificationEntity);
    }
}
