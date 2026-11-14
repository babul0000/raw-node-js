import type { IncomingMessage } from "node:http";

export const bodyParser = (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const clean = body.trim();
        resolve(clean ? JSON.parse(clean) : {});
      } catch (error) {
        console.log("Invalid JSON received:", body);
        resolve({}); // ভুল JSON আসলেও সার্ভার ক্র্যাশ না করে ফাঁকা অবজেক্ট দিবে
      }
    });
  });
};
