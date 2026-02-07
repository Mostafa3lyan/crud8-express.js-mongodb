import { MongoClient } from "mongodb";
import { DB_URI } from "../../config/config.service.js";
const client = new MongoClient(DB_URI)

export const authenticateDB = async () => {
  try {
    console.log("DB connected");
    
  } catch (error) {
    console.log(`fail to connect ${error}`);
    
  }
}