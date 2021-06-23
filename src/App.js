//react connect to backend
import styles from './App.css'
import {BrowserRouter,Switch,Link,Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminProfile from './components/AdminProfile';
import UserProfile from './components/UserProfile';
import Test from './components/Test'
import {useState} from 'react'



function App(){

  let [userLoginStatus,setUserLoginStatus]=useState('');

  const logOutUser=()=>{
    localStorage.clear();
    setUserLoginStatus(false)
  }
  
  return(
    <BrowserRouter>
    <div className={styles.main}>

      <ul className="nav bg-light">
        <li className="nav-item">
          <Link to ="/home" className="nav-link">Home</Link>
        </li>
        
        {
          userLoginStatus ?
        <li className="nav-item">
        <Link to ="/login" className="nav-link" onClick={()=>logOutUser()} >Logout</Link>
        </li> :

          <li className="nav-item">
          <Link to ="/login" className="nav-link">Login</Link>
          </li>
         }

        
        <li className="nav-item">
        <Link to ="/register" className="nav-link">Register</Link>
        </li>

        <li className="nav-item">
        <Link to ="/test" className="nav-link">Test</Link>
        </li>

       
       

      </ul>
     {/*switches for components*/}
   <Switch>
    {/*route for home component*/}
     <Route path="/home"><Home/>
       </Route>
       <Route path="/login">
         <Login setUserLoginStatus={setUserLoginStatus}/>
       </Route>
       <Route path="/register"><Register/>
       </Route>
       <Route path="/test"><Test/>
       </Route>
       <Route path="/adminprofile/:username"><AdminProfile/>
       </Route> 

       
       <Route path="/userprofile/:username"><UserProfile/>
       </Route>


      
      </Switch> 

    </div>
    </BrowserRouter>
 )
}

export default App;






