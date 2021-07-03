import React from "react";
import TodoItem from "./TodoItem"
import  { Redirect } from 'react-router-dom'

class DisplayTodo extends React.Component{
    constructor(props){
        super();
        this.state = {
            Tasks : props.tasks, 
            token : localStorage['token']
        }
    }

  
       delete=async  (id)=>{
            let res = await fetch( `http://localhost:8000/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                "Accept": "application/json",
                "Authorization" : `Bearer ${this.state.token}`,
            }
            
                })
                .then(res => res.json())
                .then(result => {
                  if(result.error){
                      alert(result.error)
                  }
                  else{
                    alert(result.message)
                    window.location.reload();
                  }
                
                
                })
            
           

        }
    render(){
        return (

            <div>
               {
                   this.state.Tasks.map((task , index)=>{
                       return(<div>
                            <ul class="list-group">
                               
                           <TodoItem task={task} delete={this.delete} index={index}/>
                           </ul>


                       </div>);
                   })
               }
               <a href="/new" type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
ADD New
</a>
            </div>
        );
    }
}
export default DisplayTodo;