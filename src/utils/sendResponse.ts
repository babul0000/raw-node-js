import type { ServerResponse } from "http";

export const sendResponse = (res: ServerResponse, sucess : boolean, statusCode: number, message: string, data: any) => {
    const response = {
         sucess,
           message,
            data,
    }

res.writeHead(statusCode, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({response})
      );
}
