import React, { Component } from 'react'

export default class Todo extends Component { 
    constructor(props){
        super(props);
        this.state = {
            tasks : [{id : "1", taskName :"First task"},{id : "2", taskName :"Second task"},{id : "3", taskName :"Third task"}],
            // currtask : ""
        }
    }
    // handleChange = (e) => {
    //     this.setState({
    //         currtask : e.target.value
    //     })
    // }
    handleClick = (task) =>{
        let nta = [...this.state.tasks, { id : this.state.tasks.length + 1, taskName : task}];

        this.setState({
            tasks : nta,
            // currtask : ""
        })
    }
    onDelete = (id) =>{
        let nta = this.state.tasks.filter( (task) =>{
            return task.id != id
        })
        this.setState({
            tasks : nta
        })
    }
    
    render() {
        return (
            <>
            {/* <div className="input-container">
                <input type = "text" onChange = {this.handleChange} value = {this.state.currtask}></input>
                <button onClick = { this.handleClick }>Enter</button>
            </div>
            <div className = "task-container">
                {
                    <ul>
                        {
                            this.state.tasks.map((task) => {
                                return (
                                    <li>
                                        <h1>{task.taskName}</h1>
                                        <button onClick = { () => this.onDelete(task.id)}>Delete</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div> */}
            <InputComponent  handleClick = {this.handleClick}/>

            <TaskComponent tasks = {this.state.tasks} onDelete = {this.onDelete}/>
            </>
        )
    }
}


class InputComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            currTask :""
        }
    }

    handleChange = (e) =>{
        this.setState({
            currTask : e.target.value
        })
    }
    render() {
        return (
            <div className="input-container">
                <input type = "text" onChange = {this.handleChange} value = {this.state.currtask}></input>
                <button onClick = { () => this.props.handleClick(this.state.currTask) }>Enter</button>
            </div>
        )
    }
}


class TaskComponent extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className = "task-container">
                {
                    <ul>
                        {
                            this.props.tasks.map((task) => {
                                return (
                                    <li key = {task.id} >
                                        <h1>{task.taskName}</h1>
                                        <button onClick = { () => this.props.onDelete(task.id)}>Delete</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        )
    }
}
