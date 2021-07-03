
import './App.css';
import React from "react";
import Login from "./components/login/login"
import DisplayTodo from "./components/Todo/DisplayTodo"
import Register from "./components/Register/register"
import 'bootstrap/dist/css/bootstrap.css';
import AddNew  from "./components/Todo/addNew"
import Edit from "./components/Todo/edit"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(){
    super();
    this.state={
      isLogin: false,  
      token : localStorage['token'],
      tasks:[]
    }
    }
      
      async componentWillMount() {
        let res = await fetch( `http://localhost:8000/api/tasks`, {
        method: "GET",
        headers: {
        "Accept": "application/json",
        "Authorization" : `Bearer ${this.state.token}`,
    }
        })
        .then(res => res.json())
        .then(result => {
      
           if(result['message'] == "Unauthenticated."){
            this.setState({
              isLogin: false
          })

           }
           else if(result){
            this.setState({
              isLogin: true ,
              tasks : result
          })
           }

        
       
        
        });
        console.log("tasks",this.state.isLogin)
        
        }
logout = async ()=>{
  localStorage.removeItem('token');
  let res = await fetch( `http://localhost:8000/api/logout`)
  window.location.href="/"
}
  

  render(){
    return (
      <Router className="App">
        {
          this.state.isLogin?(    <button className="btn btn-danger" onClick={this.logout}>
          log out 
        </button>):(<div></div>)
        }
    
          <Switch>
              <Route exact path="/">
              {this.state.isLogin ?  <DisplayTodo tasks={this.state.tasks}/>:<Login/> }
             </Route>
             <Route exact path="/new">
              {this.state.isLogin ? <AddNew/>:<Login/> }
             </Route>
             <Route exact path="/register">
              {!this.state.isLogin ? <Register/>: <DisplayTodo tasks={this.state.tasks}/> }
             </Route>
             <Route exact path="/edit/:id">
              {this.state.isLogin ? props => <Edit {...props}/>:<Login/> }
             </Route>

        </Switch>
      </Router>
    );
  }

}

export default App;
