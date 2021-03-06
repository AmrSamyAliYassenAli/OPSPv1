import {Router} from 'express';
const PharmacyProductController = require('../../Controllers/Pharmacy/PharmacyProduct.Controller');

const router = Router();

//#region Pharmacy CRUD

/**
 * @description if id<=0 "To Get all data of pharmacy Product" else id=value "To Get this pharmacy Product data"
 * @access Public
 * @api /parmacyproduct/api/get
 * @type Get
 */
router.get('/api/get',PharmacyProductController.Get);

/**
 * @description if id<=0 "To Create new pharmacy Product" else id=value "To Update this pharmacy Product" 
 * @access Public
 * @api /parmacyproduct/api/manage
 * @type Post 
 */
router.post('/api/manage',PharmacyProductController.Manage);

/**
 * @description to block pharmacy Product from system 
 * @access Public
 * @api /parmacyproduct/api/block
 * @type Post 
 */
router.post('/api/block',PharmacyProductController.Block);

/**
 * @description to toggle isActive 
 * @access Public
 * @api /parmacyproduct/api/toggleisacvtive
 * @type Post 
 */
router.post('/api/toggleisacvtive',PharmacyProductController.ToggleIsActive);

//#endregion

export default router;