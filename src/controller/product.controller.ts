import type { IncomingMessage, ServerResponse } from "node:http"
import { productService } from "../service/product.service";
import type { IProduct } from "../types/product";


// console.log(productService);


const controller = (req:IncomingMessage, res:ServerResponse) => {
    const url = req.url;
    const method = req.method;
    // console.log(url);
    const urlParams = url?.split("/")
    // console.log(urlParams);
    const id = urlParams && urlParams[1] === "product" ? Number(urlParams[2]) : null;
    console.log(id);

//get all product
if (url === "/products" && method === "GET") {

// const product = productService();
const products = productService();
console.log(products);

res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({
        message: ("product retrived sucessfull"),
        data: products,
    }))
} else if(method === "GET" && id !== null){
const products = productService();
const product = products.find((p: IProduct) => p.id === id);
console.log(products);

res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({
        message: ("product retrived sucessfull"),
        data: product,
    }))
}


};
export default controller;
