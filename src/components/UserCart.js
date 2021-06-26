import React from 'react'
import axios from 'axios'
import {useEffect,useState} from 'react'

import {useParams} from 'react-router-dom'

function UserCart(props){
    let [cartData,setCartData]=useState([])
    console.log("cart data",cartData)

    useEffect(()=>{
        axios.get(`/user/getcart/${localStorage.getItem('username')}`)
        .then(res=>{
            let cartObj=res.data.message;
            let products=cartObj[0].products
            setCartData([...products])
        })
        .catch(err=>{
            console.log(err)
            alert("something went wrong")
        })
    },[cartData.username])
    return(
        <div>
           <h2>cart items</h2>

           <table>
               <thead>
                   <tr>
                       <th>Productname</th>
                       <th>Model</th>
                       <th>Price</th>
                       <th>productImage</th>
                   </tr>
               </thead>
               <tbody>
                   {cartData && cartData.map((data,ind)=>{
                   return(
                       <tr key={ind}>
                           <td>{data.productname}</td>
                           <td>{data.model}</td>
                           <td>rs{data.price}</td>
                           <td><img src={data.productImage} width="60px" alt="" /></td>
                       </tr>
                   )
                   }
                   )}
               </tbody>
                   </table> 
        </div>
    )
}

export default UserCart;
