import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
export const generateId = function () {
    // Generate random number using inbuilt crypto module
//   const randomBytes = crypto.randomBytes(4);
//   const randomNumbers = parseInt(randomBytes.toString("hex"), 16);
    const id = uuidv4();
    return id;
};

