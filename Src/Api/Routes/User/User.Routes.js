import {Router} from 'express';
import { RegisterValidations ,AuthenticateValidations, ResetPassword } from '../../../Infrastructure/Validators/User/User.Validators';
import Validator from '../../../Infrastructure/Middlewares/Validator.Middleware';
const UserController = require('../../Controllers/User/User.Controller');
import { userAuth } from '../../../Infrastructure/Middlewares/auth-guard.middleware';

const router = Router();

//#region Registeration && Verify Account && Login && Logout

/**
 * @description To Create new User Account
 * @access Public
 * @api /users/api/register
 * @type Post 
 */
router.post('/api/register',RegisterValidations,Validator,UserController.Register);

/**
 * @description To Verify new User Account via email
 * @access Public <only Via email>
 * @api /users/verify-now/verificationCode
 * @type Get
 */
router.get('/verify-now/:verificationCode',UserController.VerifyAccount);

/**
 * @description To Authenticate an user and get token
 * @access Public 
 * @api /users/api/authenticate
 * @type Post
 */
router.post('/api/authenticate',AuthenticateValidations,Validator,UserController.Authenticate);

/**
 * @description To get the Authenticated user's Profiles "Private" it needs access token to  access
 * @access Private 
 * @api /users/api/authenticate
 * @type Get
 */
router.get('/api/authenticate',userAuth,UserController.GetAuthenticatedUser);

/**
 * @description to make user logout and remove his token from database
 * @access Private 
 * @api /users/api/logout
 * @type put
 */
router.post('/api/logout',userAuth,UserController.LogOut);

//#endregion

//#region Reset Password

/**
 * @description To initiate the password reset process
 * @access Public
 * @api /users/api/reset-password
 * @type Get
 */
router.put('/api/reset-password',ResetPassword,Validator,UserController.PasswordReSet);

/**
 * @description To render rest password page
 * @access Restricted via Email
 * @api /users/reset-password/:resetPasswordToken
 * @type Get
 */
router.get('/reset-password-now/:resetPasswordToken',UserController.RenderPasswordResetPage);

/**
 * @description to save new password reseted in database
 * @access Restricted via Email
 * @api /users/api/reset-password-now
 * @type Post
 */
router.post('/api/reset-password-now',UserController.SaveNewPasswordResetted);

//#endregion

export default router;