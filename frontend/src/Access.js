import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Access() {
    const [acces,setAcces]=useState()

     useEffect(()=>{
        const fetchData= async ()=>{
    await axios.get("/welcome")
    .then(res=>{
        setAcces(res.data)
    })
        }
        fetchData()
     },[])
    return (    
        <div className="greatting">
            {acces}
        </div>
    )
}
