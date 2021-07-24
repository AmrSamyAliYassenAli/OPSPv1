import {Router} from 'express';
const PharmacyController = require('../../Controllers/Pharmacy/Pharmacy.Controller');

const router = Router();

//#region Pharmacy CRUD

/**
 * @description if id<=0 "To Get all data of pharmacies" else id=value "To Get this pharmacy data"
 * @access Public
 * @api /pharmacy/api/get
 * @type Get
 */
router.get('/api/get',PharmacyController.Get);

/**
 * @description if id<=0 "To Create new pharmacy" else id=value "To Update this pharmacy" 
 * @access Public
 * @api /pharmacy/api/manage
 * @type Post 
 */
router.post('/api/manage',PharmacyController.Manage);

/**
 * @description to block pharmacy account 
 * @access Public
 * @api /pharmacy/api/block
 * @type Post 
 */
router.post('/api/block',PharmacyController.Block);

/**
 * @description to toggle isActive 
 * @access Public
 * @api /pharmacy/api/toggleisacvtive
 * @type Post 
 */
router.post('/api/toggleisacvtive',PharmacyController.ToggleIsActive);

//#endregion

export default router;