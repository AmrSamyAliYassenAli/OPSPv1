import {OrderItem} from '../../Database/Models';
const OrderItemQueryParams = require('../../Infrastructure/Enums/User/OrderItem.QueryParams');

class OrderItemServices{
    //#region Order Item CRUD && (Block && Toggle isActive)

    static GetAll = async()=>{
        return await OrderItem.find({isActive:true}).select(OrderItemQueryParams.GetInfoQueryParams()).populate('UserOrder').find({isActive:true});
    };

    static GetById = async(id)=>{
        return await OrderItem.findById(id).select(OrderItemQueryParams.GetInfoQueryParams()).populate('UserOrder').find({isActive:true});
    };

    static Create = async(model)=>{
        let _OrderItem = new OrderItem({
            isActive:true,
            isCreated:true,
            createdId:"-1",
            ...model
        });
        await _OrderItem.save();
    };

    static Update = async(model)=>{
        let _OrderItem = await OrderItem.findOneAndUpdate({_id:model.id},{
            isActive:true,
            isUpdated:true,
            updatedId:"-1",
            ...model
        });
        return _OrderItem;
    };

    static Block = async(id)=>{
        await OrderItem.findOneAndUpdate({_id:id},{
            isActive:false
        });
    };

    static ToggleIsActive = async(id)=>{
        let {isActive} = await OrderItem.findById(id).exec();
        if(isActive){
            await OrderItem.findOneAndUpdate({_id:id},{
                isActive:false
            });
            return false;
        }else{
            await OrderItem.findOneAndUpdate({_id:id},{
                isActive:true
            });
            return true;
        }
    };

//#endregion 
}
module.exports=OrderItemServices;