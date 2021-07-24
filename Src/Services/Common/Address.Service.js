import {Address} from '../../Database/Models';

class AddressServices{

//#region Address CRUD

    static GetAll = async()=>{
        return await Address.find();
    };

    static GetById = async(id)=>{
        return Address.findById(id);
    };

    static Create = async(model)=>{
        let address = new Address({
            isActive:true,
            isCreated:true,
            createdId:"-1",
            ...model
        });
        await address.save();
        return address._id;
    };

    static Update = async(_id,model)=>{
        let address = await Address.findOneAndUpdate({_id},{
            isUpdated:true,
            isActive:true,
            updatedId:"-1",
            ...model
        });
        return address;
    };

//#endregion

}

module.exports = AddressServices;