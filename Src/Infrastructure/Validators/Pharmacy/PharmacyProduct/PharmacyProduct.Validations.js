import {PharmacyProduct} from '../../../../Database/Models';

class PharmacyProductValidations{
    static IsValidId = async(_id)=>{
        let data = await PharmacyProduct.findById(_id).exec();
        if(!data || data == null) return false;
        else return true;
    };
}

module.exports = PharmacyProductValidations;