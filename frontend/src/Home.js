import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function Home() {
const [homePage,setHomePage]=useState("")

useEffect(()=>{
    const fetchData= async()=>{
        await axios.get("http://localhost:8001/home")
        .then(res=>{
            setHomePage(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }
    fetchData()
},[homePage])

    return (
        <div>
            {homePage}
        </div>
    )
}
