import sgMail from "@sendgrid/mail";
import { SENDGRID_APIKEY , HOST_EMAIL } from "../Constants";
import EmailMessages from '../Constants/DTOs/Requset/Email/EmailMessages';
import {DOMAIN} from '../Constants';

class SendMail{

    static sendMail = async (email,subject,text,html) =>{
        sgMail.setApiKey(SENDGRID_APIKEY);
        try {
            const msg = {
                html,
                text,
                subject,
                to:email,
                from:HOST_EMAIL
            };
            console.log(msg);
            await sgMail.send(msg);
            console.log("MAIL_SEND_SUCCESS:",error.message);
        } catch (error) {
            console.log("ERROR_MAIL_SERVER:",error.message);
        }finally{
            return;
        }
    };

    static VerificationLink = async (email,username,verificationCode)=>{
        let html = `
            <div>
                <h1>Hello, ${username}</h1>
                <p>Please click the following link to verify your account</p>
                <a href="${DOMAIN}/users/verify-now/${verificationCode}"> Verify Now</a>
            </div>
            `;
        await SendMail.sendMail(email,EmailMessages.EmailSubject_VerifyAccount,EmailMessages.EmailText_VerifyAccount,html);
    };

    static ResetPasswordLink = async(email,username,resetPasswordToken)=>{
        let html = `
                    <div>
                        <h1>Hello, ${username}</h1>
                        <p>Please click the following link to reset your password</p>
                        <p>if this password reset request is not created by your thenyou can ignore this email.</p>
                        <a href="${DOMAIN}/users/reset-password-now/${resetPasswordToken}"> Reset Password now</a>
                    </div>
                    `;
        await SendMail.sendMail(email,EmailMessages.EmailSubject_ResetPassword,EmailMessages.EmailText_ResetPassword,html);
    };

    static ResetPasswordSuccessfully = async(email,username)=>{
        let html = `
            <div>
                <h1>Hello, ${username}</h1>
                <p>Your Password is REset Successfully.</p>
                <p>if this password reset request is not done by you can contact our team.</p>
            </div>
            `;
            await SendMail.sendMail(email,EmailMessages.EmailSubject_PasswordResettedSuccess,EmailMessages.EmailText_PasswordResettedSuccess,html);
    };

}

module.exports = SendMail;