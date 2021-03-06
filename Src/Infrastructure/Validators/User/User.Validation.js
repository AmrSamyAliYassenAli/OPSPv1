import {User} from '../../../Database/Models';

class UserValidation{

    static IsExistUserID = async (id)=>{
        const data = await User.findById(id);
        if(data == null || data== false) return false;
        else return true;
    }

    static IsExistUsername = async (username)=>{
        const data = await User.find({username}).exec();
        if(data == null || data== false) return false;
        else return true;
    }

    static IsExistEmail = async (email)=>{
        const data = await User.find({email}).exec();
        if(data == null || data== false) return false;
        else return true;
    }

    static IsValidVerificationCode = async (verificationCode)=>{
        const data = await User.findOne({verificationCode});
        if(data == null || data== false) return false;
        else return true;
    };

    static IsValidPassword = async(username,password)=>{
        let user = await User.findOne({username});
        return await user.comparePassword(password);
    };

    static IsValidToken = async(resetPasswordToken)=>{
        let data = await User.findOne({
            resetPasswordToken,
            resetPasswordExpiresIn:{$gt:Date.now()}
        });
        if(data == null || data== false) return false;
        else return true;
    };
}


module.exports=UserValidation;