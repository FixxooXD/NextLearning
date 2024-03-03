"use client";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function profile(){
    const router = useRouter();

    const logout = async () => {
       try {
        const response =  await axios.get("/api/users/logout");
        console.log(response);
        //toast.success("Logout Success")   
        router.push('/login')


       } catch (error: any) {
          console.log(error.message);
          // toast.error("error.message")
       }
    }
 
    return (
        <>
        <div className="text-5xl">Profile</div>
        <button onClick={logout} className="py-2 px-4">Logout</button>
        </>
    )
}