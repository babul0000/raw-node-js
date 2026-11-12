import type { IncomingMessage, ServerResponse } from "node:http"
import { productService } from "../service/product.service";

const controller = (req:IncomingMessage, res:ServerResponse) => {
    const url = req.url;
    const method = req.method;

if (url === "/product" && method === "GET") {

productService();

res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({
            message: ("product retrived sucessfull"),

        }))
} else {

}


}
export default controller;
