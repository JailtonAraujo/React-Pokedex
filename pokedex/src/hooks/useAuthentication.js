import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useEffect, useState } from 'react';

export const useAuthentication = () =>{

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup
    //deal with memory leak
    const [cancelled, setCanceled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        }
    }

    const createUSer = async (data) =>{
        checkIfIsCancelled()

        setLoading(true);
        setError(null);

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })
            setLoading(false)

            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa ter mais que 6 caracteres"
            } else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado."
            }else{
                systemErrorMessage = "Ocorreu um erro por favor tente mais tarde"
            }

            setLoading(false)
            setError(systemErrorMessage);
        }
       
    };

    
        //logout
        const logout = () =>{
            checkIfIsCancelled();
             signOut(auth);
        };

        //login sign in
        const login = async (data) =>{
            checkIfIsCancelled();

            setError(null);
            setLoading(true);

            try {
                await signInWithEmailAndPassword(auth, data.email, data.password);
                setLoading(false)
            } catch (error) {

                let systemErrorMessage;

                if(error.message.includes("user-not-found")){
                    systemErrorMessage = "Usuario não encontrado!";
                }else if (error.message.includes("wrong-password")){
                    systemErrorMessage = "Senha incorreta!"
                }else{
                    systemErrorMessage = "Ocorreu um error por favor tente mais tarde!"
                }

                setError(systemErrorMessage);
                setLoading(false);
                
            }

        }

    useEffect(()=>{
        return () => setCanceled(true);
    },[]);

    return {
        auth,
        createUSer,
        error,
        loading,
        logout,
        login 
    };

};

