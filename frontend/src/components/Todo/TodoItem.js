import React from "react";

class TodoItem extends React.Component{
    constructor(props){
        super();
        this.state = {
            index : props.index
        }
    }
render(){
    return (
        <div style={{display: "flex" , justifyContent:"space-between"}}>
           
  <li class="list-group-item">
{this.props.task.name}
<div>
Description : {this.props.task.description} 
</div> 
<div style={{marginRight: "100px"}}>
<button className="btn btn-danger" onClick={()=>this.props.delete(this.props.task.id)}>
    Delete
</button>
<a href={`/edit/${this.props.task.id}`} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
Edit
</a>
</div>
</li>



        </div>
    )
}

}
export default TodoItem;