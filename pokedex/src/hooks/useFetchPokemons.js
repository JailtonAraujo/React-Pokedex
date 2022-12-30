import { useState, useEffect } from "react";
import {db} from "../Firebase/config"
import{
    collection,
    query,
    orderBy,
    onSnapshot,
    where,

} from "firebase/firestore";

export const useFetchPokemons = (docColledction, search = null, uid = null) => {
    
    const [documets, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(()=>{

        async function loadData(){
            if(cancelled){
                return;
            } 

            setLoading(true)

            const collectionRef = await collection (db,docColledction);

            try {
                let q; 

                q = await query(collectionRef, where("uid","==",uid),
                orderBy("createdAt","desc"));

                 await onSnapshot(q, (querySnapshot) =>{
                    setDocuments(
                        querySnapshot.docs.map((doc) =>({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                 });   

                 setLoading(false);
                 console.log(documets);

            } catch (error) {
                console.log(error);
                setError(error.message);
                setLoading(false);
            }

           
        }
        loadData();
    },[docColledction,search,uid, cancelled]);

    useEffect(()=>{
       return() => setCancelled(true);
    },[])

    return {documets, loading, error};
};