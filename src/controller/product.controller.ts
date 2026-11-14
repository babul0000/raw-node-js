import type { IncomingMessage, ServerResponse } from "node:http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { sendResponse } from "../utils/sendResponse";

const controller = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  const urlParams = url?.split("/");
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  // Get All Product
  if (url === "/products" && method === "GET") {
    try {
      const products = productService();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products retrieved successfully!",
          data: products,
        })
      );
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Internal server error",
        })
      );
    }
  }
  // Get Single Product
  else if (method === "GET" && id !== null) {
    try {
      const products = productService();
      const product = products.find((p: IProduct) => p.id === id);

      if (!product) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Product not found!",
          })
        );
        return;
      }

      try {
        sendResponse(res, true, 200, "Products retrieved successfully!", product);
      } catch (error) {
sendResponse(res, false, 500, "internal server error", product);
      }

    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Internal server error",
        })
      );
    }
  }
  // Create Product (POST)
  else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    const products = productService();
    products.push(newProduct);
    createProduct(products);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created successfully!",
        data: newProduct,
      })
    );
  }
  // Update Product (PUT)
  else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found!",
        })
      );
      return;
    }
    products[index] = { id: products[index].id, ...body };
    createProduct(products);
    // console.log(products[index]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully!",
        data: products[index],
      })
    );
  }else if (method === "DELETE" && id !== null) {

 const products = productService();

  const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product Not Found!",
        })
      );
    }

// const arr = ["a", "b", "c"]
// console.log(arr.splice(1, 1));

products.splice(index, 1)
createProduct(products)


 res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product deleted successfully",
        })
      );
  }
};

export default controller;
