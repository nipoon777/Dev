import React, { Component } from 'react'

class ToDo extends Component {
    constructor(){
        super();
        this.state = {
            tasks : [{
                task : "Create Reminder",
                id : 1
            },
            {
                task : "Solve DSA",
                id : 2
            },
            {
                task : "Uninstall Instagram",
                id : 3
            }
            ],
            currTask : ""

        }
    }
    handleChange =  (e) =>{
        console.log(e.target.value);
        this.setState({
            currTask : e.target.value
        })
    }
    handleSubmit = () =>{

        this.setState({
            tasks : [...this.state.tasks, {task : this.state.currTask, id : this.state.tasks.length + 1}],
            currTask : "",
        })
    }

    handleDelete = (id) =>{
        let narr = this.state.tasks.filter( (taskObj) =>{
            return taskObj.id !== id
        } )
        this.setState({
            tasks : [...narr]
        })
    }
    render() {
        return (
            <>
            <div>
               <input type = "text" onChange={this.handleChange} value = { this.state.currTask }/>
               <button onClick = { this.handleSubmit }>Add</button> 
            </div>
            <ul>
                { 
                this.state.tasks.map( (taskObj) =>(
                   <li key ={taskObj.id}> 
                        <p> {taskObj.task}</p>
                        <button onClick = {()=> this.handleDelete(taskObj.id)}>Delete</button>
                    </li>
                ))
                } 
    
            </ul>
            </>
        )
    }
}

export default ToDo;