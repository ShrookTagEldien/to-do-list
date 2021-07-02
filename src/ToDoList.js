import { Component } from "react";
import React from 'react';
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import axios from 'axios';



const contentStyle = {
    // maxWidth: "600px",
    // width: "90%"
    borderRadius: '10px 10px',
    border: '4px solid #F8A488',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.7)',
    padding: '2rem',
    width: '25rem',
    maxHeight: '30rem',
    overflowY: 'scroll'
};
class ToDoList extends Component{
    constructor(props){
        super(props);
        this.state={
            tasks:[]
        }
    }
    async componentDidMount(){
        let res = await axios.get("http://localhost:8000/api/list");
        console.log(res);
        this.setState({tasks:res.data});
    }
    render(){
        return(<div className='container mt-4'>
            <div className='d-flex justify-content-end'>
                <AddTask />
            </div>
            <div className='container'>
                <div className="col-6 card shadow pt-4" style={{display:'inline-block',height:'100%'}}>
                    <h3 style={{textAlign:'center'}}>Tasks You need to do</h3>
                {this.state.tasks.filter((task)=>task.status=='notFinished').map((task)=>{
                    return <Task task={task} key={task.id} settasks={()=>window.location.reload()}/>
                })}
                </div>
                <div className="col-6 card shadow pt-4 " style={{display:'inline-block',height:'100%'}}>
                    <h3 style={{textAlign:'center'}}>Tasks You already done</h3>
                {this.state.tasks.filter((task)=>task.status=='Finished').map((task)=>{
                    return <Task task={task} key={task.id} settasks={()=>window.location.reload()}/>
                })}
                </div>
                

            </div>
        </div>)
    }
}
class Task extends Component{
    constructor(props){
        super(props);
        
    }
    taskIsDone=async(id)=>{
        let data ={
            id:id,

        }
        let res = await axios.post("http://localhost:8000/api/setStatus", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",

            }
        });
        console.log(res);
        this.props.settasks();

    }
    taskDelete=async(id)=>{
        let data ={
            id:id,

        }
        let res = await axios.post("http://localhost:8000/api/deleteTask", data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT",
                "Access-Control-Allow-Headers": "Content-Type",

            }
        });
        console.log(res);
        this.props.settasks();

    }
    
    render(){
        return(<div className='card m-3 p-2 shadow'>
            <div className='d-flex justify-content-between'>
            <h3 style={{display:'inline-block'}}>{this.props.task.title}</h3> 
            <div style={{display:'inline-block'}}>
                {this.props.task.status=="notFinished" && <i className="bi bi-check-square ml-2" onClick={()=>this.taskIsDone(this.props.task.id)}></i>} {this.props.task.status=="notFinished" && <EditTask task={this.props.task}/>  }<i className="bi bi-x-circle ml-2" onClick={()=>this.taskDelete(this.props.task.id)}></i>
                </div>
            </div>
           
            <p>{this.props.task.description}</p>
            </div>)
    }

}

class EditTask extends Component{
    constructor(props){
        super(props);
        this.state={
            title:this.props.task.title,
            description:this.props.task.description,
            errors:[]
        }
    }
    editTask=async()=>{
        console.log("hereeeeeeee");
        if (this.validation() === null){
            console.log("no error");
            let data ={
                id:this.props.task.id,
                title:this.state.title,
                description:this.state. description

            }
            let res = await axios.post("http://localhost:8000/api/editTask", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",

                }
            });
            console.log(res);
            window.location.reload()
            
        }
        else
        {
            console.log("errors");
        }

    }
    validation=()=>{
        const errors = {};
        if(this.state.title.trim() == "")
        {
            errors.title="Title is required"
        }
        if(this.state.description.trim() == "")
        {
            errors.description="Description is required"
        }
        console.log("inside ")
        console.log(Object.keys(errors).length);
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;


    }

    render(){
        return(
        <Popup trigger={<i class="bi bi-pencil-square ml-2"></i>}
        modal
        contentStyle={contentStyle} >
            <div>
                <h3>Edit Task</h3>
                <div>
                    <label className="formLabel mr-5 pr-5" style={{ display: 'inline-block', width: '20%' }} htmlFor='title'>Title</label>
                    <input type="text" className="formControl p-1" style={{ borderRadius: '4px', display: 'inline-block' }} placeholder="Task title .." id='title' value={this.state.title} onChange={(e)=>this.setState({ title: e.currentTarget.value })} />
                    {this.state.errors.title && (<div className="alert alert-danger" role="alert">{this.state.errors.title}</div>)}
                    <br />
                    {/* <input type="hidden" name="shortStory" value={this.props.shortStory} /> */}
                    <div className='d-flex justify-content-between mt-2'>
                        <label className="formLabel" style={{ display: 'inline-block' }} htmlFor='description' >Description</label>
                        <textarea className="formControl" rows="4" style={{ borderRadius: '4px', width: "80%", display: 'inline-block' }} id='description' value={this.state.description} onChange={(e)=>this.setState({ description: e.currentTarget.value })}/>
                        {this.state.errors.description && (<div className="alert alert-danger" role="alert">{this.state.errors.description}</div>)}
                    </div>
                    <div className='d-flex justify-content-end'>
                    <button className="p-1 btn" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} onClick={this.editTask}>Edit</button>
                    </div>
                </div>
            </div>
        </Popup>)
    }

}
class AddTask extends Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            errors:[]
        }
    }
    addTask=async()=>{
        console.log("hereeeeeeee");
        if (this.validation() === null){
            console.log("no error");
            let data ={
                title:this.state.title,
                description:this.state. description

            }
            let res = await axios.post("http://localhost:8000/api/createTask", data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT",
                    "Access-Control-Allow-Headers": "Content-Type",

                }
            });
            console.log(res);
            window.location.reload()
            
        }
        else
        {
            console.log("errors");
        }

    }
    validation=()=>{
        const errors = {};
        if(this.state.title.trim() == "")
        {
            errors.title="Title is required"
        }
        if(this.state.description.trim() == "")
        {
            errors.description="Description is required"
        }
        console.log("inside ")
        console.log(Object.keys(errors).length);
        this.setState({ errors });
        return Object.keys(errors).length === 0 ? null : errors;


    }

    render(){
        return(
        <Popup trigger={<button className="py-2 px-5  my-3 ml-3 btn btn-lg" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} ><i className="bi bi-plus-circle mr-4" style={{ color: 'black', border: 'none' }}></i> Add New Task</button>}
        modal
        contentStyle={contentStyle} >
            <div>
                <h3>Add New Task</h3>
                <div>
                    <label className="formLabel mr-5 pr-5" style={{ display: 'inline-block', width: '20%' }} htmlFor='title'>Title</label>
                    <input type="text" className="formControl p-1" style={{ borderRadius: '4px', display: 'inline-block' }} placeholder="Task title .." id='title' value={this.state.title} onChange={(e)=>this.setState({ title: e.currentTarget.value })} />
                    {this.state.errors.title && (<div className="alert alert-danger" role="alert">{this.state.errors.title}</div>)}
                    <br />
                    {/* <input type="hidden" name="shortStory" value={this.props.shortStory} /> */}
                    <div className='d-flex justify-content-between mt-2'>
                        <label className="formLabel" style={{ display: 'inline-block' }} htmlFor='description' >Description</label>
                        <textarea className="formControl" rows="4" style={{ borderRadius: '4px', width: "80%", display: 'inline-block' }} id='description' value={this.state.description} onChange={(e)=>this.setState({ description: e.currentTarget.value })}/>
                        {this.state.errors.description && (<div className="alert alert-danger" role="alert">{this.state.errors.description}</div>)}
                    </div>
                    <div className='d-flex justify-content-end'>
                    <button className="p-1 btn" style={{ backgroundColor: '#F8A488', borderColor: '#F8A488' }} onClick={this.addTask}>Add</button>
                    </div>
                </div>
            </div>
        </Popup>)
    }

}

export default ToDoList;