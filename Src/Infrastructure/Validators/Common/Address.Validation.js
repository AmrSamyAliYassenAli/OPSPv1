import {Address} from '../../../Database/Models';

class AddressValidation{

    static IsValidId = async(_id)=>{
        let data = await Address.findById(_id).exec();
        if(!data || data == null) return false;
        else return true;
    };

}

module.exports=AddressValidation;