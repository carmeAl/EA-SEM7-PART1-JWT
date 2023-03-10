import { Request,Response } from "express";
import { insertUser,getUsers,getUser,updateUser,deleteUser,getSubjectsUserById,idByName,subjectsBySemesterByUserName} from "../services/user";
import { handleHttp } from "../utils/error.handle";
import {registerNewUser,loginUser}from "../services/auth";

const getPerson=async({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await getUser(idUser);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_USER");
    }
};

const getPeople=async(req:Request,res:Response)=>{
    try{
        const response=await getUsers();
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_GET_USERS");
    }
};

const updatePerson=async ({params,body}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await updateUser(idUser,body);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_UPDATE_USER");
    }
};

const postPerson=async ({body}:Request,res:Response)=>{
    try{
        const responsePerson=await insertUser(body);
        res.send(responsePerson);
    }catch(e){
        handleHttp(res,"ERROR_POST_USER");
    }
};

const deletePerson=async ({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await deleteUser(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_DELETE_USER");
    }
};

const getSubjectsPersonById=async({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await getSubjectsUserById(idUser);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_USER");
    }
};
const getIdPersonByName=async({params}:Request,res:Response)=>{
    try{
        const {nameUser}=params;
        const response=await idByName(nameUser);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_USER");
    }
};
const getSubjectsBySemesterByUserName=async({params}:Request,res:Response)=>{
    try{
        const {nameUser,semester}=params;
        const semesterNumber:number=+semester;
        const response=await subjectsBySemesterByUserName(nameUser,semesterNumber);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_USER");
    }
};


const registerCtrl=async ({body}:Request,res:Response)=>{
    try{const response=await registerNewUser(body);
    const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_REGISTER_USER");
    }
};
const loginCtrl=async ({body}:Request,res:Response)=>{
    try{
        const {email,password}=body;
        const responseUser=await loginUser(email,password);
        if(responseUser==="PASSWORD_INCORRECT"){
            res.status(403);
            res.send(responseUser);
        }else{
            res.send(responseUser);
        }

    }catch(e){
    handleHttp(res,"ERROR_LOGIN_USER");
    }
};

export{getPerson,getPeople,postPerson,updatePerson,deletePerson,getSubjectsPersonById,getIdPersonByName,
    getSubjectsBySemesterByUserName,registerCtrl,loginCtrl};