import {Router} from 'express';
const ProductController = require('../../Controllers/Product/Product.Controller');

const router = Router();

//#region product CRUD

/**
 * @description if id<=0 "To Get all data of pharmacies" else id=value "To Get this pharmacy data"
 * @access Public
 * @api /product/api/get
 * @type Get
 */
router.get('/api/get',ProductController.Get);

/**
 * @description if id<=0 "To Create new pharmacy" else id=value "To Update this pharmacy" 
 * @access Public
 * @api /product/api/manage
 * @type Post 
 */
router.post('/api/manage',ProductController.Manage);

/**
 * @description to block pharmacy account 
 * @access Public
 * @api /product/api/block
 * @type Post 
 */
router.post('/api/block',ProductController.Block);

/**
 * @description to toggle isActive 
 * @access Public
 * @api /product/api/toggleisacvtive
 * @type Post 
 */
router.post('/api/toggleisacvtive',ProductController.ToggleIsActive);

//#endregion

export default router;