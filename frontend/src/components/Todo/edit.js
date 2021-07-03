import React from "react";

import axios from "axios";
class Edit extends React.Component {
 constructor(props){
     super(props);
     console.log( "params" , props.match.params.id)
     this.state={
        name:"",
        status: "",
        description:"",
        token:localStorage['token'],
        id:  props.match.params.id
     }
 }
 async componentWillMount() {
    let res = await fetch( `http://localhost:8000/api/tasks/${this.state.id}`, {
        method: "GET",
        headers: {
        "Accept": "application/json",
        "Authorization" : `Bearer ${this.state.token}`,
    }
        })
        .then(res => res.json())
        .then(result => {
      
           if(result['message'] == "Unauthenticated."){
          
           }
           else if(result){
            this.setState({
                name: result.data.name,
                description: result.data.description,
                status: result.status
            })
           }

        
       
        
        });
        console.log("tasks",this.state.isLogin)

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
axios.put(`http://localhost:8000/api/tasks/${this.state.id}`, {
 name, 
 status,
 description
}, config
    
)
.then(response=> {
alert('updated')
window.location.href="/"

 
})
.catch(error=> {
 console.log('error', error);
 alert(error.message)

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
  >Update</button>
  </div>
</form>
  
      </div>
    );
  }

}

export default Edit;