import {User} from '../../Database/Models';
import { randomBytes } from 'crypto';

class UserServices{

//#region Common Services

    static GetByUsername = async(username)=>{
        return await User.findOne({username});
    };

    static GetByEmail = async(email)=>{
        return await User.findOne({email});
    };

//#endregion

//#region Registeration && Verify Account && Login && Logout

    static Register = async (model)=>{
        let user = new User({
            ...model,
            verificationCode: randomBytes(20).toString("hex"),
        });
        await user.save();
        return user;
    };

    static VerifyAccount = async(verificationCode)=>{
        let user = await User.findOne({verificationCode});
        user.verified = true;
        user.verificationCode = undefined;
        await user.save();
    };

    static Authenticate = async(username)=>{
        let user = await UserServices.GetByUsername(username);
        let token = await user.generateJWT();
        user.token = token;
        await user.save();
        return token;
    };

    static GetUserInfo = async(username)=>{
        let user = await UserServices.GetByUsername(username);
        return user.getUserInfo();
    };

    static LogOut = async(id)=>{
        let user = await User.findById(id);
        user.token= undefined;
        user.tokenExpiresIn = Date.now;
        await user.save(); 
    };

//#endregion

//#region Reset Password

    static GeneratePasswordReset = async(email)=>{
        let user = await UserServices.GetByEmail(email);
        user.generatePasswordReset();
        await user.save();
        return user.resetPasswordToken;
    };

    static SaveNewPasswordResetted = async(resetPasswordToken)=>{
        let user = await User.findOne({resetPasswordToken});
        user.password=password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresIn = undefined;
        await user.save();
        return user;
    };

//#endregion
}

module.exports = UserServices;