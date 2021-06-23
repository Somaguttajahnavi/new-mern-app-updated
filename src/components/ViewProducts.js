/*import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

export default function Products(){

    let {add,handleSubmit,formState:{errors}}=useForm()
    let history=useHistory();
    let [file,setFile]=useState(null);
    //to get selected
    const onFileSelect=(e)=>{
        //console.log(e.target.files[0])
        setFile(e.target.files[0])
    }


    const onFormSubmit=(productObj)=>{

        //post req
       /* fetch("/user/createuser",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(userObj),
        }
        ).then(res =>{
            return res.json()
        }).then(
            data=>alert(data.message)
        )
        console.log(userObj)*/

        //create  formdata obj
     /*   let formData=new FormData();
        //add files to form data obj
        formData.append('photo',file,file.name)
        //add userObj to formdata object
        formData.append("productObj",JSON.stringify(productObj))
        //post req
        axios.post("/product/createproduct",formData)
        .then(res=>{
            let resObj=res.data;
            alert(resObj.message)

            //navigate to view component
            history.push('/view')
        })
        .catch(err=>{
            console.log(err);
            alert("something went wrong")
        })

    }



    return(
        <div>
            
        
        <form className="w-75 mx-auto mt-1" onSubmit={handleSubmit(onFormSubmit)}>

            <label >Productname</label>
            <input type="text" {...add('productname',{required:true})} className="form-control text-start"/>


            <label >producttype</label>
            <input type="text" {...add('producttype',{required:true})} className="form-control"/>
           
            <label >watt</label>
            <input type="number" {...add('watt',{required:true})} className="form-control"/>

           


            <label >file</label>
            <input type="file" name="photo"  className="form-control mb-3" onChange={(e)=>{onFileSelect(e)} }/>






            <button type="submit" className="btn btn-dark mt-3">Add product</button>
           

        </form>
        </div>
    )
    
}*/

/*import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
//import axios from 'axios'
import { useState } from 'react';
function Products(){
   // let {add}=useForm()
   // let history=useHistory();
   //const onFormSubmit=(productObj=>{
     //  console.log(productObj)
   //})


    return(
        <div>
            
        
        <form className="w-75 mx-auto mt-1" >

            <label >Productname</label>
            <input type="text" {('productname',{required:true})} className="form-control text-start"/>


            <label >producttype</label>
            <input type="text" {('producttype',{required:true})} className="form-control"/>
           
            <label >watt</label>
            <input type="number" {...add('watt',{required:true})} className="form-control"/>

           


           




            <button  className="btn btn-dark mt-3">Add product</button>
           

        </form>
        </div>
       
    )

}
export default Products;*/

//view products
/*import React from 'react'
import {useParams} from 'react-router-dom'
//import axios from 'axios'
import { useEffect,useState } from 'react'

export default function ViewProducts(){
    let [product,setProduct]=useState('');
    //get username from url
    let paramsObj=useParams();//{username:"rahul"}
   // console.log("paramsObj is",paramsObj)
    //fetch userdata from api
    useEffect(()=>{
  //  axios.get(`/user/getuser/${paramsObj.username}`)
   // .then(res=>{
       //get userobj from localstorage 
        let productObj=JSON.parse(localStorage.getItem('product'))
        setProduct({...productObj})
    
   },[paramsObj.productname])
       

   // .catch(err=>{
     //   console.log(err);
      //  alert("something went wrong")
    //})

   

    return(
        <div>
        <h5 className="text-end">Welcome,<span className="text-primary">   {paramsObj.productname}</span></h5>
         <div>
             
             <h5>productname:{product.productname}</h5>
             
             <img src={product.productImage} width="200px" alt=""/>
         </div>
          </div>
    )
}*/

/////
import { useEffect, useState } from 'react'
import axios from 'axios'

function ViewProducts() {

    const [products, setProducts] = useState('')

    useEffect(() => {
        axios.get('/product/viewproducts')
            .then(res => {
                setProducts(res.data.message)
            })
            .catch(err => {
                console.log("err in get products ", err)
                alert("Something went wrong")
            })
    }, [])


    return (
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 ">
            {products &&
                products.map((product, index) => {
                    return (
                        <div class="col" key={index}>
                            <div class="card">
                                <img src={product.productImage} width="200px" height="200px" class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{product.productname}</h5>
                                    <p class="card-text">{product.description}</p>
                                </div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default ViewProducts 

