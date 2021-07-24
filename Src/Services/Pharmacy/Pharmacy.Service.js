import {Pharmacy} from '../../Database/Models';

class PharmacyServices{

//#region Pharmacy CRUD

    static GetAll = async()=>{
        return await Pharmacy.find({isActive:true}).select(["pharmacy_name"]).populate('Address').find({isActive:true});
    };

    static GetById = async(id)=>{
        return await Pharmacy.findById(id).select(["pharmacy_name"]).populate('Address').find({isActive:true}).exec();
    };

    static Create = async(model,address_id)=>{
        let pharmacy = new Pharmacy({
            AddressID_FK:address_id,
            isActive:true,
            isCreated:true,
            createdId:"-1",
            ...model
        });
        await pharmacy.save();
    };

    static Update = async(model)=>{
        let {id} = model;
        let {pharmacy_name} = model.pharmacy;
        console.log(id+" "+pharmacy_name);
        let pharacy = await Pharmacy.findOneAndUpdate({_id:id},{
            pharmacy_name,
            isActive:true,
            isUpdated:true,
            updatedId:"-1"
        });
        return pharacy.AddressID_FK;
    };

    static Block = async(id)=>{
        await Pharmacy.findOneAndUpdate({_id:id},{
            isActive:false
        });
    };

    static ToggleIsActive = async(id)=>{
        let {isActive} = await Pharmacy.findById(id).exec();
        if(isActive){
            await Pharmacy.findOneAndUpdate({_id:id},{
                isActive:false
            });
            return false;
        }else{
            await Pharmacy.findOneAndUpdate({_id:id},{
                isActive:true
            });
            return true;
        }
    };

//#endregion

}

module.exports = PharmacyServices;