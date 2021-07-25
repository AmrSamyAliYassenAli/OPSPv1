const UserOrderServices = require('../../../Services/User/UserOrder.Services');
const UserOrderValidations = require('../../../Infrastructure/Validators/User/UserOrder.Validations');
const ResponseBuilder = require('../../../Infrastructure/Constants/DTOs/Responce/ResponseBuilder');
const ValidationMassages = require('../../../Infrastructure/Constants/DTOs/ValidationDTO/ValidationMassages');

class UserOrderController{

//#region UserOrder CRUD && (Block && Toggle isActive)

static Get = async(req,res)=>{
    try {
        let {id}=req.body;
        if(id<=0){  // Get All Data
            return res.status(200).send(ResponseBuilder.Create(true,await UserOrderServices.GetAll(),ValidationMassages.ScessfullyRetrived));
        }else{ // Get by Id
            if(!UserOrderValidations.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`User Order Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            return res.status(200).send(ResponseBuilder.Create(true,await UserOrderServices.GetById(id),ValidationMassages.ScessfullyRetrived));
        }
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static Manage = async(req,res)=>{
    try {
        let {id}=req.body;
        if(id<=0){  // Add           
            await UserOrderServices.Create(req.body);            
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyInserted));
        }else{  // Update
            if(!UserOrderValidations.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`User Order Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            await UserOrderServices.Update(req.body);
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyUpdated));
        }            
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static Block = async(req,res)=>{
    try {
        let {id} = req.body;
        if(!UserOrderValidations.IsValidId(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`User Order Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        await UserOrderServices.Block(id);
        return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyBlockAccount));
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

static ToggleIsActive = async(req,res)=>{
    try {
        let {id} = req.body;
        if(!UserOrderValidations.IsValidId(id)){
            return res.status(404).send(ResponseBuilder.Create(true,{},`User Order Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
        }
        let isActive = await UserOrderServices.ToggleIsActive(id);
        return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.ScessfullyToggleIsActive} to ${isActive}`));
    } catch (error) {
        return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
    }
};

//#endregion

}

module.exports=UserOrderController;