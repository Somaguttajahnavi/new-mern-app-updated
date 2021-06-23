import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';

export default function Register(){

    let {register,handleSubmit,formState:{errors}}=useForm()
    let history=useHistory();
    let [file,setFile]=useState(null);
    //to get selected
    const onFileSelect=(e)=>{
        //console.log(e.target.files[0])
        setFile(e.target.files[0])
    }


    const onFormSubmit=(userObj)=>{

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
        let formData=new FormData();
        //add files to form data obj
        formData.append('photo',file,file.name)
        //add userObj to formdata object
        formData.append("userObj",JSON.stringify(userObj))
        //post req
        axios.post("/user/createuser",formData)
        .then(res=>{
            let resObj=res.data;
            alert(resObj.message)

            //navigate to login component
            history.push('/login')
        })
        .catch(err=>{
            console.log(err);
            alert("something went wrong")
        })

    }



    return(
        <div>
            
        
        <form className="w-75 mx-auto mt-1" onSubmit={handleSubmit(onFormSubmit)}>

            <label htmlFor="un">Username</label>
            <input type="text" {...register('username',{required:true})} className="form-control text-start"/>


            <label htmlFor="pw">Password</label>
            <input type="password" {...register('password',{required:true})} className="form-control"/>
           
            <label htmlFor="db">Dob</label>
            <input type="date" {...register('dob',{required:true})} className="form-control"/>

            <label >mail</label>
            <input type="mail" {...register('mail',{required:true})} className="form-control"/>


            <label >file</label>
            <input type="file" name="photo"  className="form-control mb-3" onChange={(e)=>{onFileSelect(e)} }/>






            <button type="submit" className="btn btn-dark mt-3">Register</button>
           

        </form>
        </div>
    )
    
}