import { db } from '../Firebase/config'

import {
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'

const auth = getAuth()


export const registerUser = async (userToRegister) =>{

    try {
        
        const {user} = await createUserWithEmailAndPassword(
            auth,
            userToRegister.email,
            userToRegister.password)
        
        await updateProfile(user,{displayName:userToRegister.displayName})

        return user;

    } catch (error) {
        
        let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa ter mais que 6 caracteres"
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado."
            }else{
                systemErrorMessage = "Ocorreu um erro por favor tente mais tarde"
            }
            

            return error = {status:404, message:systemErrorMessage, cause:error};
    }

}


const login = async (userToAuth) =>{

    try {
       const data =  await signInWithEmailAndPassword(auth, userToAuth.email, userToAuth.password);

       return data;
      
    } catch (error) {

        let systemErrorMessage;

        if(error.message.includes("user-not-found")){
            systemErrorMessage = "Usuario não encontrado!";
        }else if (error.message.includes("wrong-password")){
            systemErrorMessage = "Senha incorreta!"
        }else{
            systemErrorMessage = "Ocorreu um error por favor tente mais tarde!"
        }
        
        return  error = {status:404, message:systemErrorMessage, cause:error}
    }
}

const authService ={
    registerUser,
    login
}

export default authService;