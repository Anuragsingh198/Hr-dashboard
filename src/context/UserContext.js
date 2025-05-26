"use client"

import React ,{createContext , useEffect , useState} from 'react'

export  const  userContext =  createContext();

export const  UserProvider = ({children}) =>{
    const [users , setUsers] =  useState([]);
    const [loading , setLoading] =  useState(true);

    useEffect(()=>{
        const  fetchUsers = async()=>{
            setLoading(true);
            try{
                const response = await fetch('https://dummyjson.com/users?limit=20');
                const data = await response.json();
            }catch(err){
                console.error("there is  some  error in  fetching users : " , err)

            }finally{
                setLoading(false);
            }
        }
        fetchUsers()
    },[])

    return(
        <userContext.Provider value={{users , setUsers , loading}}>
            {children}
        </userContext.Provider>
    )
}