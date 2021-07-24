import {Product} from '../../../Database/Models';

class ProductValidation{
    static IsValidId = async(_id)=>{
        let data = await Product.findById(_id).exec();
        if(!data || data == null) return false;
        else return true;
    };
}
module.exports = ProductValidation;