import {Router} from 'express';
const OrderItemController = require('../../Controllers/User/OrderItem.Controller');

const router = Router();

//#region product CRUD

/**
 * @description if id<=0 "To Get all data of orderitem" else id=value "To Get this orderitem data"
 * @access Public
 * @api /orderitem/api/get
 * @type Get
 */
router.get('/api/get',OrderItemController.Get);

/**
 * @description if id<=0 "To Create new orderitem" else id=value "To Update this orderitem" 
 * @access Public
 * @api /orderitem/api/manage
 * @type Post 
 */
router.post('/api/manage',OrderItemController.Manage);

/**
 * @description to block orderitem
 * @access Public
 * @api /orderitem/api/block
 * @type Post 
 */
router.post('/api/block',OrderItemController.Block);

/**
 * @description to toggle isActive 
 * @access Public
 * @api /orderitem/api/toggleisacvtive
 * @type Post 
 */
router.post('/api/toggleisacvtive',OrderItemController.ToggleIsActive);

//#endregion

export default router;