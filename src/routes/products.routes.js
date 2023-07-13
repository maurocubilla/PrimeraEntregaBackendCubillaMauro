import {Router} from "express";
import { productManager } from "../dao/productManager.js";


const productService = new productManager('products.json');

const validateFields = (req,res,next)=>{
    const productInfo = req.body;
    if(!productInfo.title || !productInfo.description || !productInfo.price){
        return res.json({status:"error",messaje:"campos incompletos"})
    } else {
        next();
    }
}

const router = Router();

router.get("/",async (req,res)=>{
    try {
        const limit = req.query.limit;
        res.json({status:"succes", data:products});
        if(limit){
            // devolver productos de acuerdo al limite
        } else {
            res.json({status:"succes", data:products});
        }
        const products = await productService.get();
        
    } catch (error) {
        res.json({status:"error",messaje: error.messaje});
    }
});


router.get('/:pid',async(req,res)=>{
    try {
        let pid = req.params.pid;
        let result = await productService.getProductById(pid);
        res.json({ status:"success",data:result});
    } catch (error) {

        res.json({ status: "error!", message: error.message });
        throw new Error(error.message);

    }

});




router.post("/",validateFields,async(req,res)=>{
    
  
        //agregar el producto
        try {
            const productInfo = req.body;
            const productCreated = await productService.save(productInfo);
            res.json({status:"succes", data:productCreated, messaje:"Nuevo producto creado"});
        } catch (error) {
            res.json({status:"error",messaje: error.messaje});
        }
    
});

    // actualiza el producto
    router.put("/:pid", validateFields,async (req,res)=>{
        try {
            let pid = req.params.pid;
            let product = req.body;
            let result = await productService.updateProduct(pid,product);
            result.id = pid;
            res.json({status:"success",data:result});
        } catch (error) {
            res.json({status:"error",message:error.message});
        }
    });



router.delete("/:pid",async(req,res)=>{ 
    try {
        const pid = req.params.pid;
        const result = await productService.deleteProduct(pid);
        res.json({status:"success",data:result, message:"Eliminaste un producto"});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

export {router as productsRouter};

