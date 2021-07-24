import {Pharmacy} from '../../../Database/Models';

class PharmacyValidation{

    static IsValidId = async(_id)=>{
        let data = await Pharmacy.findById(_id).exec();
        if(!data || data == null) return false;
        else return true;
    };

}

module.exports=PharmacyValidation;