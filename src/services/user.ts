//In charge to connect with the dB
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import SubjectModel from "../models/subject";
import { Types } from "mongoose";

const insertUser = async(item: User) => {
    const responseInsert = await UserModel.create(item);
    return responseInsert;
};

const getUsers = async() => {
    const responseItem = await UserModel.find({});
    return responseItem;
};

const getUser = async(id: string) => {
    const responseItem = await UserModel.findOne({_id: id});
    return responseItem;
};

const updateUser = async(id: string, data: User) => {
    const responseItem = await UserModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

const deleteUser = async(id: string) => {
    const responseItem = await UserModel.findOneAndRemove({_id: id});
    return responseItem;
};

const getSubjectsUserById = async(idUser:string) => {
    const responseItem = await SubjectModel.find({"users": new Types.ObjectId(idUser)});
    return responseItem;
    
};
const idByName=async(name:string) => {
    const responseItem = await UserModel.find({"name":name});
    return responseItem;   
};
const subjectsBySemesterByUserName=async(nameUser:string,semester:number) => {
    const responseUser = await idByName(nameUser);
    const idUser=responseUser.map(user=>user._id);
    const subject=await getSubjectsUserById(idUser.toString());
    const subjetFilter=subject.filter(subject=>subject.semester==semester);
    return subjetFilter;   
};


export {insertUser, getUser, getUsers, updateUser, deleteUser,getSubjectsUserById,idByName,subjectsBySemesterByUserName};
