import express from 'express';
import validateSchema from '../utils/middleware/validate';
import AuthValidation from '../validation/auth';
import { handleRequest } from '../utils/middleware/request';
import { controllers } from '../utils/config/di';
import { checkLogin } from '../utils/middleware/auth';

const router = express.Router();

//#region login
/**
 * @openapi
 * /auth/login:
 *  post:
 *    summary: Login to API
 *    description: Login and return access_tokens
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/BodyLogin'
 *    responses:
 *      201:
 *        description: Login Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/responses/LoginSuccess'
 *
 * components:
 *   schemas:
 *     BodyLogin:
 *       type: Object
 *       properties:
 *         email:
 *           type: string
 *           example: 'admin-test@qa.alphabravodev.com'
 *         password:
 *           type: string
 *           example: '12345@aA'
 *   responses:
 *     LoginSuccess:
 *       type: Object
 *       properties:
 *         status:
 *           type: string
 *           example: 'success'
 *         message:
 *           type: string
 *           example: 'Login Success'
 *         code:
 *           type: string
 *           example: '10000'
 *         data:
 *           type: object
 *           properties:
 *             account:
 *               type: object
 *               properties:
 *                 access:
 *                   type: string
 *                   example: '1'
 *             token:
 *               type: object
 *               properties:
 *                 access:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkiLCJyb2xlIjoiMDAwMDMiLCJpYXQiOjE3MjgyOTc0MjIsImV4cCI6MTcyODM4MzgyMn0.sVDqfLMhZV_ituyLSuwJq9coSb_GqQZ4-CmA4J1hLiU'
 *                 refresh:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkiLCJyb2xlIjoiMDAwMDMiLCJpYXQiOjE3MjgyOTc0MjIsImV4cCI6MTcyODM4MzgyMn0.0XdE3R6VZ8Kq4Et1HD0nbSk05cSL8USwwTCHhiuNy6c'
 */
router.post('/login', validateSchema(AuthValidation.signin), handleRequest(controllers.auth.login));
//#endregion login

//#region signup
/**
 * @openapi
 * /auth/signup:
 *  post:
 *    summary: Signup
 *    description: Register account
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/BodySignup'
 *    responses:
 *      201:
 *        description: Signup Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/responses/SignupSuccess'
 *
 * components:
 *   schemas:
 *     BodySignup:
 *       type: Object
 *       properties:
 *         email:
 *           type: string
 *           example: 'admin-test@qa.alphabravodev.com'
 *         password:
 *           type: string
 *           example: '12345@aA'
 *         username:
 *           type: string
 *           example: 'admin'
 *   responses:
 *     SignupSuccess:
 *       type: Object
 *       properties:
 *         status:
 *           type: string
 *           example: 'success'
 *         message:
 *           type: string
 *           example: 'Signup Success'
 *         code:
 *           type: string
 *           example: '10000'
 *         data:
 *           type: object
 *           properties:
 *              id:
 *                type: string
 *                example: '1'
 *              email:
 *                type: string
 *                example: 'admin-test@qa.alphabravodev.com'
 *              password:
 *                type: string
 *                example: '12345678'
 *              username:
 *                type: string
 *                example: 'admin'
 *              role:
 *                type: string
 *                example: '00001'
 *              status:
 *                type: string
 *                example: 'ACTIVE'
 */
router.post('/signup', validateSchema(AuthValidation.signup), handleRequest(controllers.auth.signup));
//#endregion signup

//#region forgot-password
/**
 * @openapi
 * /auth/forgot-password:
 *  post:
 *    summary: Forgot password
 *    description: Forgot password
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/BodyForgotPassword'
 *    responses:
 *      201:
 *        description: ForgotPassword Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/responses/ForgotPasswordSuccess'
 *
 * components:
 *   schemas:
 *     BodyForgotPassword:
 *       type: Object
 *       properties:
 *         email:
 *           type: string
 *           example: 'admin-test@qa.alphabravodev.com'
 *   responses:
 *     ForgotPasswordSuccess:
 *       type: Object
 *       properties:
 *         status:
 *           type: string
 *           example: 'success'
 *         message:
 *           type: string
 *           example: 'Success'
 *         code:
 *           type: string
 *           example: '200'
 */
router.post(
    '/forgot-password',
    validateSchema(AuthValidation.forgotPassword),
    handleRequest(controllers.auth.forgotPassword)
);
//#endregion forgot-password

//#region reset-password
/**
 * @openapi
 * /auth/reset-password:
 *  post:
 *    summary: Reset password
 *    description: Reset password after send forgot password request
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/BodyResetPassword'
 *    responses:
 *      201:
 *        description: ResetPassword Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/responses/ResetPasswordSuccess'
 *
 * components:
 *   schemas:
 *     BodyResetPassword:
 *       type: Object
 *       properties:
 *         password:
 *           type: string
 *           example: '12345678'
 *         confirmPassword:
 *           type: string
 *           example: '12345678'
 *         code:
 *           type: string
 *           example: 'goGmjl6ejkxLs8GsUQPW'
 *   responses:
 *     ResetPasswordSuccess:
 *       type: Object
 *       properties:
 *         status:
 *           type: string
 *           example: 'success'
 *         message:
 *           type: string
 *           example: 'Success'
 *         code:
 *           type: string
 *           example: '200'
 */
router.post(
    '/reset-password',
    validateSchema(AuthValidation.createNewPassword),
    handleRequest(controllers.auth.createNewPassword)
);
//#endregion reset-password

//#region getUserLogin
/**
 * @openapi
 * /auth/me:
 *  get:
 *    summary: Get user login by access token
 *    description: Get user login by access token
 *    tags: [Auth]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/responses/GetUserLoginSuccess'
 *
 * components:
 *   responses:
 *     GetUserLoginSuccess:
 *       type: Object
 *       properties:
 *         status:
 *           type: string
 *           example: 'success'
 *         message:
 *           type: string
 *           example: 'Success'
 *         code:
 *           type: string
 *           example: '200'
 */
router.get('/me', checkLogin, handleRequest(controllers.auth.me));
//#endregion reset-password

//#region forgot-password
/**
 * @openapi
 * /auth/restore-account:
 *  post:
 *    summary: Restore deleted account
 *    description: Restore deleted account
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/BodyRestoreAccount'
 *    responses:
 *      201:
 *        description: RestoreAccount Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/responses/RestoreAccountSuccess'
 *
 * components:
 *   schemas:
 *     BodyRestoreAccount:
 *       type: Object
 *       properties:
 *         email:
 *           type: string
 *           example: 'admin-test@qa.alphabravodev.com'
 *   responses:
 *     RestoreAccountSuccess:
 *       type: Object
 *       properties:
 *         status:
 *           type: string
 *           example: 'success'
 *         message:
 *           type: string
 *           example: 'Success'
 *         code:
 *           type: string
 *           example: '200'
 */
router.post(
    '/restore-account',
    validateSchema(AuthValidation.restoreDeletedAccount),
    handleRequest(controllers.auth.restoreDeletedAccount)
);

export default router;
