import {OrderItem} from '../../../Database/Models';

class OrderItemValidation{
    static IsValidId = async(_id)=>{
        let data = await OrderItem.findById(_id).exec();
        if(!data || data == null) return false;
        else return true;
    };
}
module.exports=OrderItemValidation;