import { Modal, Form, Input, Button, message } from 'antd';
import React, { Fragment, useState,Component } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { variables } from './Variables';
import axios from "axios";
import { connect } from 'react-redux';
import styles from './Login.module.css';
import { login } from './redux/actions/authActions';


export class Login extends Component{
    constructor(props){
        super(props);

        this.state={
            logins: [],
            modalTitle:"",
            id: 0,
            FirstName: "",
            Email: "",
            Password: ""
        }
    }

    changeRegEmail =(e)=>{
        this.setState({Email:e.target.value});
    }
    changeRegName =(e)=>{
        this.setState({FirstName:e.target.value});
    }
    changeRegPassword =(e)=>{
        this.setState({Password:e.target.value});
    }
    editClick(login1) {
        this.setState({
            modalTitle: "Login",
            id: 0,
            Password: login1.Password,
            FirstName: login1.FirstName,
            Email: "string"
        });
    }
    
    updateClick() {
        fetch(variables.API_URL+'authentication/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id:0,
                FirstName:"string",
                Password:this.state.Password,
                Email:this.state.Email
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            if(result=="You logined")
            {
                alert("You login succesfuly");
                this.props.login();
            }
            else
            {
                alert('Something wrong 2');
            }
        },(error)=>{
            alert('Something wrong');
        })
    }
    render(){
        const {
            regis,
            id,
            Email,
            Password, 
            FirstName,
            modalTitle
        }=this.state;

        return(
<div>
<div className={`${styles.modal} fade`} id="exampleModal" tabIndex="-1" aria-hidden="true">
  <div className={`${styles['modal-dialog']} modal-lg modal-dialog-centered`}>
    <div className={`${styles['modal-content']}`}>
      <div className={`${styles['modal-header']}`}>
        <h5 className={`${styles['modal-title']}`}>{modalTitle}</h5>
      </div>

      <div className={`${styles['modal-body']}`}>
        <div className="d-flex flex-row bd-highlight mb-3">
          <div className={`${styles['p-2']} ${styles['w-50']} bd-highlight`}>
            <div className={`${styles['input-group']} mb-3`}>
              <span className={`${styles['input-group-text']}`}>Email</span>
              <input
                type="text"
                className={`${styles['form-control']}`}
                value={Email}
                onChange={this.changeRegEmail}
              />
            </div>
            <div className={`${styles['input-group']} mb-3`}>
              <span className={`${styles['input-group-text']}`}>Password</span>
              <input
                type="text"
                className={`${styles['form-control']}`}
                value={Password}
                onChange={this.changeRegPassword}
              />
            </div>
          </div>
        </div>

    {id==0?
        <button type="button"
        className={`${styles['btn']} ${styles['btn-primary']} ${styles['float-start']}`}
        onClick={()=>this.updateClick()}
        >
        <Link to="/">Login</Link></button>
        :null}
   </div>
   </div>
</div> 
</div>


</div>
        )
    }
}
export default connect(null, { login })(Login);