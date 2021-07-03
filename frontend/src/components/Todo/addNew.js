import React from "react";

import axios from "axios";
class AddNew extends React.Component {
 constructor(){
     super();
     this.state={
        name:"",
        status: "",
        description:"",
        token:localStorage['token']
     }
 }
 handleChange = (e)=>{
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.name)
    console.log(this.state.description)
 }
 handleRadio =(e)=>{
    this.setState({ status: e.target.value });
  
 }
 add = async (e)=>{
     e.preventDefault();

const {name , status , description} = this.state ;
let config = {
    headers: {
        "Accept": "application/json",
        "Authorization" : `Bearer ${this.state.token}`,
    }
  } 
axios.post('http://localhost:8000/api/tasks', {
 name, 
 status,
 description
}, config
    
)
.then(response=> {
window.location.href="/"

 
})
.catch(error=> {


});
    
       
 }
  render(){
    return (
      <div className="container" id="login-container" >
          <form onSubmit={this.add}>
  <div className="form-group ">
    
    <input  name="name" className="form-control" value={this.state.name} 
    aria-describedby="emailHelp" 
    placeholder="name"
    onChange={this.handleChange}
    
    />
    
  </div>
  <div className="form-group">
   
    <textarea name="description" className="form-control" 
    value={this.state.description} 
    placeholder="Description"
    onChange={this.handleChange} />
  </div>

  <input type="radio" id="normal" name="fav_language" value="normal" onChange={this.handleRadio}/>
  <label for="normal">Normal</label><br/>
  <input type="radio" id="urgany" name="fav_language" value="urgant" onChange={this.handleRadio}/>
  <label for="urgant">Urgant</label>
<div>
  <button type="submit" className="btn btn-primary"
  >Submit</button>
  </div>
</form>
  
      </div>
    );
  }

}

export default AddNew;