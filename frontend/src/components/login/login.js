
import React from "react";
import "./login.css"
import axios from "axios";
import { config } from "@fortawesome/fontawesome-svg-core";
class Login extends React.Component {
 constructor(){
     super();
     this.state={
         email : "",
         password: "",
     }
 }
 handleChange = (e)=>{
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.email)
    console.log(this.state.password)
 }
 login = async(e)=>{
     e.preventDefault();
     
     const {email , password} = this.state ;
     axios.post('http://localhost:8000/api/login', {
      email, 
      password
    })
    .then(response=> {
      console.log('success', response.data.token);
      localStorage.setItem('token' , response.data.token)
      window.location.reload()
     
      
    })
    .catch(error=> {
      alert('wrong email or password')
 
    });
 
      
          
 }
  render(){
    return (
      <div className="container" id="login-container" >
          <form onSubmit={this.login}>
  <div className="form-group ">
    
    <input type="email" name="email" className="form-control" value={this.state.email} 
    aria-describedby="emailHelp" 
    placeholder="Enter email"
    onChange={this.handleChange}
    
    />
    
  </div>
  <div className="form-group">
   
    <input type="password" name="password" className="form-control" 
    value={this.state.password} 
    placeholder="Password"
    onChange={this.handleChange} />
  </div>

  <button type="submit" className="btn btn-primary"
  >login</button>
    <a href="/register"
  >Register </a>
</form>
  
      </div>
    );
  }

}

export default Login;