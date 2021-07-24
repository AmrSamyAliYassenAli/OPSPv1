import ValidationMassages from '../../../Infrastructure/Constants/DTOs/ValidationDTO/ValidationMassages';
const ResponseBuilder = require('../../../Infrastructure/Constants/DTOs/Responce/ResponseBuilder');
const PharmacyServices = require('../../../Services/Pharmacy/Pharmacy.Service');
const AddressService = require('../../../Services/Common/Address.Service');
const PharmacyValidation = require('../../../Infrastructure/Validators/Pharmacy/Pharmacy.Validation');
const AddressValidation = require ('../../../Infrastructure/Validators/Common/Address.Validation');

class PharmacyController{

    //#region Pharmacy CRUD && (Block && Toggle isActive)
    static Get = async(req,res)=>{
        try {
            let {id}=req.body;
            if(id<=0){  // Get All Data
                return res.status(200).send(ResponseBuilder.Create(true,await PharmacyServices.GetAll(),ValidationMassages.ScessfullyRetrived));
            }else{ // Get by Id
                if(!PharmacyValidation.IsValidId(id)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                return res.status(200).send(ResponseBuilder.Create(true,await PharmacyServices.GetById(id),ValidationMassages.ScessfullyRetrived));
            }
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };
    
    static Manage = async(req,res)=>{
        try {
            let {id}=req.body;
            if(id<=0){  // Add
                let Address_id =await AddressService.Create(req.body.address);            
                await PharmacyServices.Create(req.body.pharmacy,Address_id);            
                return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyInserted));
            }else{  // Update
                if(!PharmacyValidation.IsValidId(id)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                let AddressID_FK = await PharmacyServices.Update(req.body);
                if(!await AddressValidation.IsValidId(AddressID_FK)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Address Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                await AddressService.Update(AddressID_FK,req.body.address);
                return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyUpdated));
            }            
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };
    
    static Block = async(req,res)=>{
        try {
            let {id} = req.body;
            if(!PharmacyValidation.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            await PharmacyServices.Block(id);
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyBlockAccount));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

    static ToggleIsActive = async(req,res)=>{
        try {
            let {id} = req.body;
            if(!PharmacyValidation.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            let isActive = await PharmacyServices.ToggleIsActive(id);
            return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.ScessfullyToggleIsActive} to ${isActive}`));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

    //#endregion
    
}

module.exports=PharmacyController;