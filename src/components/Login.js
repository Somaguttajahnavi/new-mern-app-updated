import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
import axios from 'axios'


export default function Login(props){
    let {register,handleSubmit,formState:{errors}}=useForm()
    let history=useHistory();
     const onFormSubmit=(credentials)=>{
        //make post req
       axios.post(`/${credentials.type}/login`,credentials)
        .then(res=>{
            //get response object
            let resObj=res.data;
            if(resObj.message==='login-success'){
                //save token in local storage
                localStorage.setItem("token",resObj.token)
                localStorage.setItem("username",resObj.username)
                localStorage.setItem("user",JSON.stringify(resObj.userObj))


                //update userloginstate
                props.setUserLoginStatus(true)

                if(credentials.type==='user'){
                //navigate to user profile
                history.push(`/userprofile/${resObj.username}`)
            }
               if(credentials.type==='admin'){
                history.push(`/adminprofile/${resObj.username}`)  
               }
            }  
            else{
                alert(resObj.message)
            }
        })
        .catch(err=>{
            console.log(err)
          alert("somethink wrong in login")
        })
   //console.log(credentials)        
    }
return(
    <form className="w-75 mx-auto" onSubmit={ handleSubmit(onFormSubmit)}>

        <div class="form-check">
            <input class="form-check-input" type="radio" id="admin" {...register("type")} value="admin" />
            <label class="form-check-label" for="admin">Admin</label>

        </div>

        <div class="form-check">
            <input class="form-check-input" type="radio" id="user" {...register("type")} value="user" />
            <label class="form-check-label" for="user">User</label>

        </div>



        <label htmlFor="un">Username</label>
        <input type="text" {...register('username',{required:true})} className="form-control"/>
        {errors.username && <p className="rext-danger">*Username is required</p>}

        <label htmlFor="pw">Password</label>
        <input type="password" {...register('password',{required:true})} className="form-control"/>
        {errors.password && <p className="text-danger">*password is required</p>}



        <button type="submit" className="btn btn-success mt-4">Login</button>



    </form>

)
}

