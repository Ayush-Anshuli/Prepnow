"use client"

import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState, useContext as useReactContext } from 'react'
import { UserDetailContext } from './context/UserDetailContext';
import { useRouter } from 'next/navigation';

function Provider({children}) {

    const [user,setUser] = useState();
    const router = useRouter();

    const CreateNewUser = async () => {
        supabase.auth.getUser().then(async({data:{user}}) => {

            let { data: Users, error } = await supabase
                .from('Users')
                .select("*")
                .eq('email', user?.email)

            console.log(Users)

            if(Users?.length == 0) {
                const {data,error} = await supabase.from('Users').insert([
                    {
                        name: user?.user_metadata?.name,
                        email:user?.email,
                        picture: user?.user_metadata?.picture
                    }
                ])
                console.log(data)
                setUser(data)
                return
            }
            setUser(Users[0])
        })
    }

    const logout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push('/auth');
    };


    useEffect(() => {
        CreateNewUser();
    },[])

  return (
    <UserDetailContext.Provider value={{user, setUser, logout}}>
    <div>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider

export const useUser = () => {
    return useReactContext(UserDetailContext);
};