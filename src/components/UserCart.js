/*import React from 'react'
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

export default UserCart;*/

////////
import { useState, useEffect } from 'react'
import axios from 'axios'

function UserCart(props) {
    console.log(props)

    // const [cartObj, setCartObj] = useState('')

    // useEffect(() => {
    //         let username=localStorage.getItem("username")

    //     axios.get(`/user/getproducts/${username}`)
    //         .then(res => {
    //             setCartObj(res.data.message)
    //             console.log(res.data.message)
    //         })
    //         .catch(err => {
    //             console.log("err in reading cart", err)
    //             alert("Something went wrong in getting cart")
    //         })

    // }, [])

    return (
        <div>
            <table className="table text-center w-75 mx-auto">
                <thead className="bg-primary">
                    <tr >
                    <th>Productname</th>
                    <th>Model</th>
                    <th>Image</th>
                    </tr>
                </thead>
                <tbody className="bg-dark text-white">
                    {props.cartObj &&
                        props.cartObj.products.map((product, index) => {
                            return <tr>
                                <td>{product.productname}</td>
                                <td>{product.model}</td>
                                <td>
                                    <img src={product.productImage} width="60px" alt="" />
                                </td>
                            </tr>

                        })
                    }
                </tbody>
            </table>


        </div>
    )
}

export default UserCart
