import React from 'react'
import {useParams} from 'react-router-dom'
//import axios from 'axios'
import { useEffect,useState } from 'react'
import ViewProducts from './ViewProducts';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import UserCart from "./UserCart"
import axios from 'axios';


export default function UserProfile(){
    let [user,setUser]=useState('');
    let [usercart,setUserCart]=useState('');
    let [products,setProducts]=useState('');
    
    //function to make post to usercart api
    const addProductToCart=(productObj)=>{
      //get username from localstorage
      let username=localStorage.getItem("username")

      let newObj={username,productObj}
      console.log("product added by user",newObj)
      //add username to product object
     // productObj.username=username;
     // console.log("product added to cart",productObj)
      //make post req
      axios.post("/user/addtocart",newObj)
      .then(res=>{
      let  responseObj=res.data
        alert(responseObj.message)
      })
      .catch(err=>{
        console.log("err in adding to cart",err)
        alert("something went wrong")
      })
    }





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
      <div className="text-center">
        <h5 className="text-end">Welcome,<span className="text-primary">   {paramsObj.username}</span>
        <img src={user.profileImage} width="60px" alt=""/>
        </h5>
       <h5>mail:{user.mail}</h5>

          <BrowserRouter>
       <ul className="nav nav-pills nav-fill">
       

           <li className="nav-item">
               <Link to="/view-products" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" >View products</Link>
           </li>

           <li className="nav-item">
           <Link to="/user-cart" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">cart</Link>
           </li>
       </ul>

       <Switch>

       <Route path="/user-cart">
           <UserCart/>
       </Route>

       <Route path="/view-products">
           <ViewProducts addProductToCart={addProductToCart}/>
       </Route>

       </Switch>
        </BrowserRouter>    

            
         </div>
        

    )
}

