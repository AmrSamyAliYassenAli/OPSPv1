import ValidationMassages from '../../../Infrastructure/Constants/DTOs/ValidationDTO/ValidationMassages';
const PharmacyProductServices = require('../../../Services/Pharmacy/PharmacyProduct.Services');
const ResponseBuilder = require('../../../Infrastructure/Constants/DTOs/Responce/ResponseBuilder');
const PharmacyProductValidations = require('../../../Infrastructure/Validators/Pharmacy/PharmacyProduct/PharmacyProduct.Validations');
const PharmacyValidation = require('../../../Infrastructure/Validators/Pharmacy/Pharmacy.Validation');
const ProductValidation = require('../../../Infrastructure/Validators/Product/Product.Validation');

class PharmacyProductController{

//#region Pharmacy Product CRUD && (Block && Toggle isActive)

    static Get = async(req,res)=>{
        try {
            let {id}=req.body;
            if(id<=0){  // Get All Data
                return res.status(200).send(ResponseBuilder.Create(true,await PharmacyProductServices.GetAll(),ValidationMassages.ScessfullyRetrived));
            }else{ // Get by Id
                if(!PharmacyProductValidations.IsValidId(id)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                return res.status(200).send(ResponseBuilder.Create(true,await PharmacyProductServices.GetById(id),ValidationMassages.ScessfullyRetrived));
            }
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };
    
    static Manage = async(req,res)=>{
        try {
            let {id,PharmacyID_FK,ProductID_FK}=req.body;
            if(id<=0){  // Add           
                if(!PharmacyValidation.IsValidId(PharmacyID_FK)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                if(!ProductValidation.IsValidId(ProductID_FK)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                await PharmacyProductServices.Create(req.body);            
                return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyInserted));
            }else{  // Update
                if(!PharmacyValidation.IsValidId(id)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                if(!PharmacyValidation.IsValidId(PharmacyID_FK)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                if(!ProductValidation.IsValidId(ProductID_FK)){
                    return res.status(404).send(ResponseBuilder.Create(true,{},`Product Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
                }
                await PharmacyProductServices.Update(req.body);
                return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyUpdated));
            }            
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };
    
    static Block = async(req,res)=>{
        try {
            let {id} = req.body;
            if(!PharmacyProductValidations.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            await PharmacyProductServices.Block(id);
            return res.status(200).send(ResponseBuilder.Create(true,{},ValidationMassages.ScessfullyBlockAccount));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

    static ToggleIsActive = async(req,res)=>{
        try {
            let {id} = req.body;
            if(!PharmacyProductValidations.IsValidId(id)){
                return res.status(404).send(ResponseBuilder.Create(true,{},`Pharmacy Id:${id} is NotFound ${ValidationMassages.FaildRetriveData}`));
            }
            let isActive = await PharmacyProductServices.ToggleIsActive(id);
            return res.status(200).send(ResponseBuilder.Create(true,{},`${ValidationMassages.ScessfullyToggleIsActive} to ${isActive}`));
        } catch (error) {
            return res.status(500).send(ResponseBuilder.Create(false,{},error.message));
        }
    };

//#endregion
}
module.exports = PharmacyProductController;