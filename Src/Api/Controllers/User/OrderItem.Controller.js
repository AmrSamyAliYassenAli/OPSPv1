const OrderItemServices = require('../../../Services/User/OrderItem.Services');
const OrderItemValidation = require('../../../Infrastructure/Validators/User/OrderItem.Validation');
const ResponseBuilder = require('../../../Infrastructure/Constants/DTOs/Responce/ResponseBuilder');
const ValidationMassages = require('../../../Infrastructure/Constants/DTOs/ValidationDTO/ValidationMassages');

class OrderItemController{

//#region Order Item CRUD && (Block && Toggle isActive)

static Get = async(req,res)=>{
    try {
        let {id}=req.body;
        if(id<=0){  // Get All Data
            return res.status(200).send(ResponseBuilder.Create(true,await OrderItemServices.GetAll(),ValidationMassages.ScessfullyRetrived));
        }else{ // Get by Id
            if(!OrderItemValidation.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`OrderItem Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            return res.status(200).send(ResponseBuilder.Create(true,await OrderItemServices.GetById(id),ValidationMassages.ScessfullyRetrived));
        }
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static Manage = async(req,res)=>{
    try {
        let {id}=req.body;
        if(id<=0){  // Add           
            await OrderItemServices.Create(req.body);            
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyInserted));
        }else{  // Update
            if(!OrderItemValidation.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`OrderItem Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            await OrderItemServices.Update(req.body);
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyUpdated));
        }            
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static Block = async(req,res)=>{
    try {
        let {id} = req.body;
        if(!OrderItemValidation.IsValidId(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`OrderItem Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        await OrderItemServices.Block(id);
        return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyBlockAccount));
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static ToggleIsActive = async(req,res)=>{
    try {
        let {id} = req.body;
        if(!OrderItemValidation.IsValidId(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`OrderItem Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        let isActive = await OrderItemServices.ToggleIsActive(id);
        return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.ScessfullyToggleIsActive} to ${isActive}`));
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

//#endregion

}
module.exports=OrderItemController;