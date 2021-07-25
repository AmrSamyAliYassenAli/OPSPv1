const ProductServices = require('../../../Services/Product/Product.Services');
const ProductValidation = require('../../../Infrastructure/Validators/Product/Product.Validation');
const ResponseBuilder = require('../../../Infrastructure/Constants/DTOs/Responce/ResponseBuilder');
const ValidationMassages = require('../../../Infrastructure/Constants/DTOs/ValidationDTO/ValidationMassages');
class ProductController{ 

    //#region Product CRUD && (Block && Toggle isActive)

    static Get = async(req,res)=>{
        try {
            let {id}=req.body;
            if(id<=0){  // Get All Data
                return res.status(200).send(ResponseBuilder.Create(true,await ProductServices.GetAll(),ValidationMassages.ScessfullyRetrived));
            }else{ // Get by Id
                if(!ProductValidation.IsValidId(id)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                return res.status(200).send(ResponseBuilder.Create(true,await ProductServices.GetById(id),ValidationMassages.ScessfullyRetrived));
            }
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };
    
    static Manage = async(req,res)=>{
        try {
            let {id}=req.body;
            if(id<=0){  // Add           
                await ProductServices.Create(req.body);            
                return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyInserted));
            }else{  // Update
                if(!ProductValidation.IsValidId(id)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                await ProductServices.Update(req.body);
                return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyUpdated));
            }            
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };
    
    static Block = async(req,res)=>{
        try {
            let {id} = req.body;
            if(!ProductValidation.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            await ProductServices.Block(id);
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyBlockAccount));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

    static ToggleIsActive = async(req,res)=>{
        try {
            let {id} = req.body;
            if(!ProductValidation.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            let isActive = await ProductServices.ToggleIsActive(id);
            return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.ScessfullyToggleIsActive} to ${isActive}`));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

    //#endregion

}

module.exports = ProductController;