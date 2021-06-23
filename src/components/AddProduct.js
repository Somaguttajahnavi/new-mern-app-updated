import { useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

function AddProduct(){
    const {register,handleSubmit}=useForm();
    const [file,setFile]=useState(null)
    const history=useHistory();

    const onFormSubmit=(productObj)=>{

        //create FormData obj
        let formData=new FormData();
        //add file(s) to formdata obj
        formData.append("photo",file,file.name)
        //add userObj to formData Obj
        formData.append("productObj",JSON.stringify(productObj))

        //post req using axios
        axios.post("/product/createproduct",formData)
        .then(res=>{
            let resObj=res.data;
            alert(resObj.message)
            //navigate to view component
            history.push('/view-products')
        })
        .catch(err=>{
            console.log(err);
            alert("something went wrong")
        })

    }


    //to get selected data
    const onFileSelect=(e)=>{
        setFile(e.target.files[0])      
    }


   
    return(
        <form className="w-50 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
            {/* productname */}
            {/* <label htmlFor="un">Productname</label> */}
            <input type="text" id="pn" {...register('productname')} className="form-control mb-3" placeholder="productname"/>

            <input type="number" id="m" {...register('model')} className="form-control mb-3" placeholder="model"/>

            <input type="number" id="n" {...register('price')} className="form-control mb-3" placeholder="price"/>

            <input type="text" id="d" {...register('description')} className="form-control mb-3" placeholder="description"/>

            {/* photo i.e., file */}
            <input type="file" name="photo" className="form-control mt-3" onChange={(e)=>{onFileSelect(e)}} />

            <button type="submit" className="btn btn-success mt-3">Add Product</button>
        </form>
    )
}

export default AddProduct;