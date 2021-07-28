//"use strict";
import consola from "consola";
import {DOMAIN,HOST_EMAIL,HOST_EMAIL_PASSWORD} from '../Constants';
const nodemailer = require("nodemailer");
import EmailMessages from '../Constants/DTOs/Requset/Email/EmailMessages';

class SendEmail{

  static Send = async(email,subject,text,html)=>{
    try {
      let transporter =await nodemailer.createTransport({
          service:'gmail',
          secure:false,
          auth:{
              user:HOST_EMAIL,
              pass:HOST_EMAIL_PASSWORD
          }
      });
      
      let mailOptions = {
          from:HOST_EMAIL,
          to:email,
          subject:subject,
          text:text,
          html:html
      };

      await transporter.sendMail(mailOptions,function(err,data){
          if(err){ consola.error(`#Error Occours : ${err.message}`);}
          else{
            consola.success(`#Email Sent Successfully!`);
            consola.info(`#Message: ${data.response}`);
          }
      });
    } catch (error) {
      consola.error(`#ERROR : ${error.message}`);
    }
  };

  static VerificationLink = async (email,username,verificationCode)=>{
    let html = `
        <div>
            <h1>Hello, ${username}</h1>
            <p>Please click the following link to verify your account</p>
            <a href="${DOMAIN}users/verify-now/${verificationCode}"> Verify Now</a>
        </div>
        `;
    await SendEmail.Send(email,EmailMessages.EmailSubject_VerifyAccount,EmailMessages.EmailText_VerifyAccount,html);
};

  static ResetPasswordLink = async(email,username,resetPasswordToken)=>{
      let html = `
                  <div>
                      <h1>Hello, ${username}</h1>
                      <p>Please click the following link to reset your password</p>
                      <p>if this password reset request is not created by your thenyou can ignore this email.</p>
                      <a href="${DOMAIN}users/reset-password-now/${resetPasswordToken}"> Reset Password now</a>
                  </div>
                  `;
      await SendEmail.Send(email,EmailMessages.EmailSubject_ResetPassword,EmailMessages.EmailText_ResetPassword,html);
  };

  static ResetPasswordSuccessfully = async(email,username)=>{
      let html = `
          <div>
              <h1>Hello, ${username}</h1>
              <p>Your Password is REset Successfully.</p>
              <p>if this password reset request is not done by you can contact our team.</p>
          </div>
          `;
          await SendEmail.Send(email,EmailMessages.EmailSubject_PasswordResettedSuccess,EmailMessages.EmailText_PasswordResettedSuccess,html);
  };

}

module.exports = SendEmail;