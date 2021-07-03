
import React from "react";
import axios from "axios";
class Register extends React.Component {
 constructor(){
     super();
     this.state={
         email : "",
         password: "",
         name:"",
         password_confirmation:""
     }
 }
 handleChange = (e)=>{
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.email)
    console.log(this.state.password)
 }
 register = async(e)=>{
     e.preventDefault();
     const {email , password , name , password_confirmation} = this.state ;
     axios.post('http://localhost:8000/api/register', {
      email, 
      password,
      name , 
      password_confirmation
    })
    .then(response=> {
      console.log('success', response.data.token);
      localStorage.setItem('token' , response.data.token)
      window.location.href="/"
     
      
    })
    .catch(error=> {
      console.log('error', error);
      
 
    });
      
          
 }
  render(){
    return (
      <div className="container" id="login-container" >
          <form onSubmit={this.register}>
          <div className="form-group ">
    
    <input  name="name" className="form-control" value={this.state.name} 
    aria-describedby="emailHelp" 
    placeholder="Enter Your name"
    onChange={this.handleChange}
    
    />
    
  </div>           
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
  <div className="form-group">
   
   <input type="password" name="password_confirmation" className="form-control" 
   value={this.state.password_confirmation} 
   placeholder="confirm Password"
   onChange={this.handleChange} />
 </div>

  <button type="submit" className="btn btn-primary"
  >sign up</button>
 
</form>
  
      </div>
    );
  }

}

export default Register;