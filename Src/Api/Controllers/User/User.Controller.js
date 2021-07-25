import ValidationMassages from '../../../Infrastructure/Constants/DTOs/ValidationDTO/ValidationMassages';
const SendMail = require('../../../Infrastructure/Helpers/email-sender');
const ResponseBuilder = require('../../../Infrastructure/Constants/DTOs/Responce/ResponseBuilder');
const UserValidation = require('../../../Infrastructure/Validators/User/User.Validation');
const UserServices = require('../../../Services/User/User.Services');
const PharmacyValidation = require('../../../Infrastructure/Validators/Pharmacy/Pharmacy.Validation');
const AddressValidation = require ('../../../Infrastructure/Validators/Common/Address.Validation');
const AddressService = require('../../../Services/Common/Address.Service');

import {join} from "path";

class UserController{

//#region Registeration && Verify Account && Login && Logout

    static Register = async(req,res)=>{
        try {
            let {username , email} = req.body;
            if(await UserValidation.IsExistUsername(username)) {
                return res.status(400).send(ResponseBuilder.Create(false,{},ValidationMassages.IsExistUsername));
            }
            if(await UserValidation.IsExistEmail(email)) {
                return res.status(400).send(ResponseBuilder.Create(false,{},ValidationMassages.IsExistEmail));
            }
            let Address_id =await AddressService.Create(req.body.addressObj);
            let {verificationCode} = await UserServices.Register(req.body,Address_id);       
            await SendMail.VerificationLink(email,username,verificationCode);
            return res.status(201).send(ResponseBuilder.Create(true,{verificationCode},ValidationMassages.AccountCreatedSuccessfully));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    }

    static VerifyAccount =async(req,res)=>{
        try {
            let {verificationCode} = req.params;
            if(!await UserValidation.IsValidVerificationCode(verificationCode)){
                return res.status(401).send(ResponseBuilder.Create(false,{},ValidationMassages.UnAuthorizedAccess+ValidationMassages.InvalidVerificationCode));
            }
            await UserServices.VerifyAccount(verificationCode);
            return res.sendFile(join(__dirname,'../../Templates/verification-success.html'));
        } catch (error) {
            return res.sendFile(join(__dirname,'../../Templates/errors.html'));
        }
    }

    static Authenticate =async(req,res)=>{
        try {
            let {username , password} = req.body;
            if(!await UserValidation.IsExistUsername(username)) {
                return res.status(400).send(ResponseBuilder.Create(false,{},ValidationMassages.IsExistUsername));
            }
            if(!await UserValidation.IsValidPassword(username,password)){
                return res.status(401).send(ResponseBuilder.Create(false,{},ValidationMassages.InCorrentPassword));
            }
            let token = await UserServices.Authenticate(username);
            let result = {user:await UserServices.GetUserInfo(username),token:`Bearer ${token}`};
            return res.status(200).send(ResponseBuilder.Create(true,result,ValidationMassages.SuccessfullyAuthenticated));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    }

    static GetAuthenticatedUser = async(req,res)=>{
        return res.status(200).send(ResponseBuilder.Create(true,{user:req.user},ValidationMassages.ScessfullyRetrived));
    };

    static LogOut = async(req,res)=>{
        try {
            let {_id} = req.user;
            if(!UserValidation.IsExistUserID(_id)){
                return res.status(400).send(ResponseBuilder.Create(false,{},ValidationMassages.IsNotFoundUser));
            }
            UserServices.LogOut(_id); 
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.LogOutSuccessfully));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

//#endregion

//#region Reset Password

    static PasswordReSet = async(req,res)=>{
        try {
            let {email} = req.body;
            if(await UserValidation.IsExistEmail(email)) {
                return res.status(400).send(ResponseBuilder.Create(false,{},ValidationMassages.IsExistEmail));
            }
            let resetPasswordToken = await UserServices.GeneratePasswordReset(email);
            await SendMail.ResetPasswordLink(email,username,resetPasswordToken);
            return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.PasswordResetMailSentSuccessfully}:${email}`));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

    static RenderPasswordResetPage = async(req,res)=>{
        try {
            let { resetPasswordToken } = req.params;
            if(!await UserValidation.IsValidToken(resetPasswordToken)){
                return res.status(401).send(ResponseBuilder.Create(false,{},ValidationMassages.InValidorEcpirePasswordResetToken));
            }
            return res.sendFile(join(__dirname,'../../Templates/password-reset/password-reset.html'));
        } catch (error) {
            return res.sendFile(join(__dirname,'../../Templates/errors.html'));
        }
    };

    static SaveNewPasswordResetted = async(req,res)=>{
        try {
            let { resetPasswordToken ,password} = req.body;
            if(!await UserValidation.IsValidToken(resetPasswordToken)){
                return res.status(401).send(ResponseBuilder.Create(false,{},ValidationMassages.InValidorEcpirePasswordResetToken));
            }    
            let {username , email} = await UserServices.SaveNewPasswordResetted(resetPasswordToken);
            await SendMail.ResetPasswordSuccessfully(email,username);
            return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.PasswordResetProcessSuccessfully}:${email}`));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

//#endregion

//#region Update(userInfo,userAddress) && Block Account && Toogle IsActive

static UpdateInfo = async(req,res)=>{
    try {
        let {id}=req.body;
        if(!UserValidation.IsExistUserID(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`UserId:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        await UserServices.UpdateInfo(req.body);
        return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyUpdated));         
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static UpdateAddress = async(req,res)=>{
    try {
        let {id,AddressID_FK}=req.body;
        if(!UserValidation.IsExistUserID(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`UserId:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        if(!await AddressValidation.IsValidId(AddressID_FK)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`Address Id:${AddressID_FK} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        await AddressService.Update(AddressID_FK,req.body.addressObj);
        await UserServices.UpdateAddress(id);
        return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyUpdated));         
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static Block = async(req,res)=>{
    try {
        let {id} = req.body;
        if(!UserValidation.IsExistUserID(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`UserId:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        await UserServices.Block(id);
        return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyBlockAccount));
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static ToggleIsActive = async(req,res)=>{
    try {
        let {id} = req.body;
        if(!UserValidation.IsExistUserID(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`UserId:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        let isActive = await UserServices.ToggleIsActive(id);
        return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.ScessfullyToggleIsActive} to ${isActive}`));
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

//#endregion

}

module.exports=UserController;