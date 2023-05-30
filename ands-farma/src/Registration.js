import { Layout, Menu, Breadcrumb, Button, Modal, Form, Input, Select, Table, List } from 'antd';
import React, { Fragment, useState, Component } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { variables } from './Variables';
import axios from "axios";

export class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regis: [],
      modalTitle: "",
      id: 0,
      FirstName: "",
      Email: "",
      Password: ""
    };
  }

  refreshList() {
    fetch(variables.API_URL + 'authentication/registration')
      .then(response => response.json())
      .then(data => {
        this.setState({ regis: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeRegName = (e) => {
    this.setState({ FirstName: e.target.value });
  }

  changeRegEmail = (e) => {
    const email = e.target.value;
    const isValidEmail = this.validateEmail(email);
    this.setState({ Email: email, isValidEmail });
  }

  changeRegPassword = (e) => {
    this.setState({ Password: e.target.value });
  }

  validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      return true;
    } else {
      console.log('Please enter a valid email');
      return false;
    }
  };

  addClick() {
    this.setState({
      modalTitle: "Add user",
      id: 0,
      FirstName: "",
      Email: "",
      Password: ""
    });
  }

  createClick() {
    fetch(variables.API_URL + 'authentication/registration', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        FirstName: this.state.FirstName,
        Email: this.state.Email,
        Password: this.state.Password,
      })
    })
      .then(res => res.json())
      .then((result) => {
        alert(result);
        this.refreshList();
      }, (error) => {
        alert('Failed');
      })
  }

  render() {
    const {
      regis,
      id,
      FirstName,
      Email,
      Password,
      modalTitle,
      isValidEmail
    } = this.state;

    const isButtonDisabled = !isValidEmail;

    return (
      <div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
              </div>

              <form className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Registration Form</h5>
                </div>

                <div className="modal-body">
                  <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 w-50 bd-highlight">
                      <div className="input-group mb-3">
                        <span className="input-group-text">First Name</span>
                        <input
                          type="text"
                          className="form-control"
                          value={FirstName}
                          onChange={this.changeRegName}
                        />
                      </div>
                      <div className="input-group mb-3">
        <span className="input-group-text">Email</span>
        <input
          type="text"
          className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
          value={Email}
          onChange={this.changeRegEmail}
        />
        {!isValidEmail && (
          <div className="invalid-feedback">Please enter a valid email</div>
        )}
      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text">Password</span>
                        <input
                          type="password"
                          className="form-control"
                          value={Password}
                          onChange={this.changeRegPassword}
                        />
                      </div>
                    </div>
                  </div>
                  {id == 0 && (
                        <button
                        type="button"
                        className="btn btn-primary float-start"
                        onClick={() => this.createClick()}
                        disabled={isButtonDisabled}
                        >
                        <Link to="/" style={{pointerEvents: isButtonDisabled === false ? true : 'none'}}>Register</Link>
                        </button>
                    )}
                </div>
              </form>


            </div>
          </div>
        </div>
      </div>
    )
  }
}