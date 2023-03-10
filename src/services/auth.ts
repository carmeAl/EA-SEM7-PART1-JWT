import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import {insertUser} from "../services/user"
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";


const registerNewUser=async(user:User)=>{
    //Busqueda en la BBDD para ver si existe el mismo nombre i apellido
    const checkIs =await UserModel.findOne({email:user.email})
    //Si el usuario existe
    if (checkIs)return "ALREADY_USER";
    //Si el usario NO existe seguimos
    user.password=await encrypt(user.password);
    const registerNewUser=await insertUser(user);
    return registerNewUser;
;

};
const loginUser=async(email:string,password:string)=>{
    const checkIs =await UserModel.findOne({email})
    //Si el usuario NO existe
    if (!checkIs)return "NOT_FOUND_USER";
    //Obtener el password encriptado de la BBDD
    const passwordHash=checkIs.password;
    //Comparar la password de BBDD i del login
    const isCorrect=await verified(password,passwordHash);
    if(!isCorrect) return "PASSWORD_INCORRECT";

    const token=generateToken(checkIs.email);
    const data={
        token,
        user:checkIs,
    }
    return data;
};
export{registerNewUser,loginUser};