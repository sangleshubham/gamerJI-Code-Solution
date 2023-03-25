import { Router } from "express";
import { decryptValue, encryptValue } from "../controller/controller.js";


const route = Router()


route.post('/encrypt' , encryptValue)
route.post('/decrypt' , decryptValue)


export default route