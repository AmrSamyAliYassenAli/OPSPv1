import {UserOrder} from '../../Database/Models';
const UserOrderQueryParams = require('../../Infrastructure/Enums/User/UserOrder.QueryParams');

class UserOrderServices{

    //#region UserOrder CRUD && (Block && Toggle isActive)

    static GetAll = async()=>{
        return await UserOrder.find({isActive:true}).select(UserOrderQueryParams.GetInfoQueryParams());
    };

    static GetById = async(id)=>{
        return await UserOrder.findById(id).select(UserOrderQueryParams.GetInfoQueryParams());
    };

    static Create = async(model)=>{
        let _UserOrder = new UserOrder({
            isActive:true,
            isCreated:true,
            createdId:"-1",
            ...model
        });
        await _UserOrder.save();
    };

    static Update = async(model)=>{
        let _UserOrder = await UserOrder.findOneAndUpdate({_id:model.id},{
            isActive:true,
            isUpdated:true,
            updatedId:"-1",
            ...model
        });
        return _UserOrder;
    };

    static Block = async(id)=>{
        await UserOrder.findOneAndUpdate({_id:id},{
            isActive:false
        });
    };

    static ToggleIsActive = async(id)=>{
        let {isActive} = await UserOrder.findById(id).exec();
        if(isActive){
            await UserOrder.findOneAndUpdate({_id:id},{
                isActive:false
            });
            return false;
        }else{
            await UserOrder.findOneAndUpdate({_id:id},{
                isActive:true
            });
            return true;
        }
    };

//#endregion 

}

module.exports=UserOrderServices;