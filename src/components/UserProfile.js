import React from 'react'
import {useParams} from 'react-router-dom'
//import axios from 'axios'
import { useEffect,useState } from 'react'
import ViewProducts from './ViewProducts';

export default function UserProfile(){
    let [user,setUser]=useState('');
    //get username from url
    let paramsObj=useParams();//{username:"rahul"}
   // console.log("paramsObj is",paramsObj)
    //fetch userdata from api
    useEffect(()=>{
  //  axios.get(`/user/getuser/${paramsObj.username}`)
   // .then(res=>{
       //get userobj from localstorage 
        let userObj=JSON.parse(localStorage.getItem('user'))
        setUser({...userObj})
    
   },[paramsObj.username])
       

   // .catch(err=>{
     //   console.log(err);
      //  alert("something went wrong")
    //})

   

    return(
        <div>
        <h5 className="text-end">Welcome,<span className="text-primary">   {paramsObj.username}</span></h5>
         <div>
             <h2>Personal details</h2>
             <h5>Username:{user.username}</h5>
             <h5>mail:{user.mail}</h5>
             <h5>dob:{user.dob}</h5>
             <img src={user.profileImage} width="200px" alt=""/>
         </div>
         <ViewProducts />
          </div>
    )
}

