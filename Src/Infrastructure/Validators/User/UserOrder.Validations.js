import {UserOrder} from '../../../Database/Models';

class UserOrderValidations{
    static IsValidId = async(_id)=>{
        let data = await UserOrder.findById(_id).exec();
        if(!data || data == null) return false;
        else return true;
    };
}

module.exports=UserOrderValidations;