var express = require('express');
var router = express.Router();
const ProductosController = require("../controllers/ProductosController")

/* GET users listing. */
router.get('/all', ProductosController.getAll);
router.get('/', ProductosController.getDestacados);
router.get('/:id',ProductosController.getById);
router.post('/',(req,res,next)=>req.app.verifyToken(req,res,next),ProductosController.create);
router.put('/:id',(req,res,next)=>req.app.verifyToken(req,res,next),ProductosController.update);
router.delete('/:id',(req,res,next)=>req.app.verifyToken(req,res,next),ProductosController.delete);
module.exports = router;
