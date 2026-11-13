import type { IncomingMessage, ServerResponse } from "node:http";
import controller from "../controller/product.controller";

const routeHandler = (req: IncomingMessage, res:ServerResponse) => {
const url = req.url
    const method = req.method
    if (url === "/" && method === "GET") {
   controller(req, res)
    }else if(url?.startsWith("/product")){
       controller(req, res)
    } else {
        // console.log("this invalid route");
        res.writeHead(200, {"content-type": "application/json"});
        res.end(JSON.stringify({
            log: ("invalid your route")
        }))
    }
}
export default routeHandler;
