import {PharmacyProduct} from '../../Database/Models';
const PharmacyProductQueryParams = require('../../Infrastructure/Enums/Pharmacy/PharmacyProduct.QueryParams');

class PharmacyProductServices{

//#region PharmacyProduct CRUD

    static GetAll = async()=>{
        return await PharmacyProduct.find({isActive:true}).select(PharmacyProductQueryParams.GetInfoQueryParams())
        .populate('Pharmacy').find({isActive:true}).populate('Product').find({isActive:true});
    };

    static GetById = async(id)=>{
        return await PharmacyProduct.findById(id).select(PharmacyProductQueryParams.GetInfoQueryParams())
        .populate('Pharmacy').find({isActive:true}).populate('Product').find({isActive:true});
    };

    static Create = async(model)=>{
        let pharmacyProduct = new PharmacyProduct({
            isActive:true,
            isCreated:true,
            createdId:"-1",
            ...model
        });
        await pharmacyProduct.save();
    };

    static Update = async(model)=>{
        await PharmacyProduct.findOneAndUpdate({_id:model.id},{
            isActive:true,
            isUpdated:true,
            updatedId:"-1",
            ...model
        });
    };

    static Block = async(id)=>{
        await PharmacyProduct.findOneAndUpdate({_id:id},{
            isActive:false
        });
    };

    static ToggleIsActive = async(id)=>{
        let {isActive} = await PharmacyProduct.findById(id).exec();
        if(isActive){
            await PharmacyProduct.findOneAndUpdate({_id:id},{
                isActive:false
            });
            return false;
        }else{
            await PharmacyProduct.findOneAndUpdate({_id:id},{
                isActive:true
            });
            return true;
        }
    };

//#endregion
}

module.exports = PharmacyProductServices;