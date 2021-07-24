import {check} from 'express-validator';

const name = check('name',"Name is Required.").not().isEmpty();
const username = check('username',"username is Required.").not().isEmpty();
const email = check('email',"email is Required.").isEmail();
const password = check('password',"password is Required of minmum length of 6.")
.isLength({
    min:6,
});

export const RegisterValidations = [name,username,email,password];
export const AuthenticateValidations = [username,password];
export const ResetPassword = [email];