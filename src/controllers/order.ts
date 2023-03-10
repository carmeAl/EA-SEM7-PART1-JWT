import {Request,Response} from "express";
import { handleHttp } from "../utils/error.handle";
import {JwtPayload} from "jsonwebtoken";

interface RequestExt extends Request{
    userEmail?:string | JwtPayload;
}

const getItems=(req:RequestExt,res:Response)=>{
    try{
        res.send({
            data:"ESTO SOLO LO VE LAS PERSONAS CON SESSION / JWT",
            user:req.userEmail
        });
    }catch(e){
        handleHttp(res,"E")
    }
};

export{getItems};