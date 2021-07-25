import {Router} from 'express';
const UserOrderController = require('../../Controllers/User/UserOrder.Controller');

const router = Router();

//#region product CRUD

/**
 * @description if id<=0 "To Get all data of userorder" else id=value "To Get this userorder data"
 * @access Public
 * @api /userorder/api/get
 * @type Get
 */
router.get('/api/get',UserOrderController.Get);

/**
 * @description if id<=0 "To Create new userorder" else id=value "To Update this userorder" 
 * @access Public
 * @api /userorder/api/manage
 * @type Post 
 */
router.post('/api/manage',UserOrderController.Manage);

/**
 * @description to block userorder 
 * @access Public
 * @api /userorder/api/block
 * @type Post 
 */
router.post('/api/block',UserOrderController.Block);

/**
 * @description to toggle isActive 
 * @access Public
 * @api /userorder/api/toggleisacvtive
 * @type Post 
 */
router.post('/api/toggleisacvtive',UserOrderController.ToggleIsActive);

//#endregion

export default router;