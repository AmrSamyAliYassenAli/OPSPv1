import {Product} from '../../Database/Models';
const ProductQueryParams = require('../../Infrastructure/Enums/Product/Product.QueryParams');

class ProductServices{

//#region product CRUD

    static GetAll = async()=>{
        return await Product.find({isActive:true}).select(ProductQueryParams.GetInfoQueryParams());
    };

    static GetById = async(id)=>{
        return await Product.findById(id).select(ProductQueryParams.GetInfoQueryParams());
    };

    static Create = async(model)=>{
        let product = new Product({
            isActive:true,
            isCreated:true,
            createdId:"-1",
            ...model
        });
        await product.save();
    };

    static Update = async(model)=>{
        let product = await Product.findOneAndUpdate({_id:model.id},{
            isActive:true,
            isUpdated:true,
            updatedId:"-1",
            ...model
        });
        return product;
    };

    static Block = async(id)=>{
        await Product.findOneAndUpdate({_id:id},{
            isActive:false
        });
    };

    static ToggleIsActive = async(id)=>{
        let {isActive} = await Product.findById(id).exec();
        if(isActive){
            await Product.findOneAndUpdate({_id:id},{
                isActive:false
            });
            return false;
        }else{
            await Product.findOneAndUpdate({_id:id},{
                isActive:true
            });
            return true;
        }
    };

//#endregion 
}

module.exports = ProductServices;