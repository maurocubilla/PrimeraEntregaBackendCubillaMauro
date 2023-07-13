import {__dirname} from "../utils.js";
import path from "path";
import fs from "fs";


export class productManager{
    constructor(filename){
        this.path=path.join(__dirname,`/files/${filename}`); // src/files/products.json

    };

    fileExists(){
        return fs.existsSync(this.path);
    }
    async get(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                return products;

            } else {
                throw new Error("No se encuentran los productos")
            }
        } catch (error) {
            throw error;
        }


    };

    async getById(id){
        //devolver producto con id recibido
        
    }
    async save(product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                let newId = 1;
                if(products.length>0){
                    newId= products[products.length-1].id+1;
                }
                const newProduct = {
                    id:newId,
                    ...product
                };
                products.push(newProduct);
                await fs.promises.writeFile(this.path,JSON.stringify(products,null,'\t'));
                return newProduct;

            } else {
                throw new Error("No es posible ejecutar la siguiente operacion ")
            }
        } catch (error) {
            throw error;
        }
    };

    addProduct(product) {
        if (!product.title || !product.description || !product.price )
         {
            console.error("Todos los campos son obligatorios");
            return;
        }

        const existingProduct = this.products.find((p) => p.code === product.code);
        if (existingProduct) {
            console.error('Product with the same code already exists');
            return;
        }

        const newProduct = {
            id: this.generateId(),
            title:product.title,
            description:product.description,
            price:product.price,
        };
        
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }
}