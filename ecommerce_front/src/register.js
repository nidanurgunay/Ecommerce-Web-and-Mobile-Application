import React, { Component } from 'react';
import Login from './Login';
import './SelectOpt';
import './Checkbox';
import { Button, Container, Form, Input, Modal, Row } from 'reactstrap';
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom';

import Indeterminate from './Checkbox';
import tracker from '../src/api/tracker'

class Reg extends Component {
    constructor() {
        super();
        
        this.state = {
            Email: '',
            Password: '',
            Gender: '',
            status: '',
            message: '',
            isopen: false,
            invalidemail: false,
            sandbox: false,
            invalidpassword: false,
            invalid:false,
            isemailexist:false,
        }

        this.Email = this.Email.bind(this);
        this.Password = this.Password.bind(this);
        this.Gender = this.Gender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    Email(event) {
        this.setState({ Email: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    Gender(event) {
        this.setState({ Gender: event.target.value })
    }
    handleSubmit = async () => {

        try {
          
            const response = await tracker.post('/register', {
                email: this.state.Email,
                password: this.state.Password,
                gender: this.state.Gender,
            });
            console.log("handlesubmit")
            const token = response.data.token;
            let passcode = response.data.passcode;
            console.log(response)
            const msg = response.data.message;
            if (response.data.message === "'to' parameter is not a valid address. please check documentation" && response.data.error !== "Password too small. Should be atleast 7 characters") {
                this.setState({ invalidemail: true, sandbox: false, invalidpassword: false ,isemailexist:false})

            }
            if (response.data.message === "'to' parameter is not a valid address. please check documentation" && response.data.error === "Password too small. Should be atleast 7 characters") {
                this.setState({ invalidemail: true, sandbox: false, invalidpassword: true ,isemailexist:false})

            }
            if (response.data.message === "Sandbox subdomains are for test purposes only. Please add your own domain or add the address to authorized recipients in Account Settings." && response.data.error !== "Password too small. Should be atleast 7 characters") {
                this.setState({ invalidemail: false, sandbox: true, invalidpassword: false,isemailexist:false})

            }
            if (response.data.message === "Sandbox subdomains are for test purposes only. Please add your own domain or add the address to authorized recipients in Account Settings." && response.data.error === "Password too small. Should be atleast 7 characters") {
                this.setState({ invalidemail: false, sandbox: true, invalidpassword: true ,isemailexist:false})

            }
            if (response.data.status === "error" && response.data.error === "Password too small. Should be atleast 7 characters") {
                console.log("doğdnsk")
                this.setState({ invalidpassword: true })
            }
            if(response.data.status==="error" && response.data.error==="Email already exists"){
                this.setState({isemailexist:true, invalidemail:false, sandbox:false})
            }
            if (response.data.message === "Email has been send") {
                console.log(msg);
                console.log("token", token);
                console.log("passcode", passcode);
                this.setState({isemailexist:false,invalid:true, status: response.status, message: msg, isopen: true, invalidemail: false, invalidpassword: false, sandbox: false })
                localStorage.setItem('token', token);
                localStorage.setItem('passcode', passcode);
                this.props.history.push("/auth");
                console.log(response.status)
            }


        } catch (e) {
            
        }

    }
    closeModal() {
        this.setState({ isopen: false })
    }

    render() {


        return (

            < div className="form" >

                < Container className="form-container" >

                    < Row className="form" >
                        < Form>
                            < div class="row" className="mb-2 pageheading" >
                                < div className="login-check" > Sign Up</div >
                            </div >

                            < Input className="mb-2" type="text" style={{ justifyContent: "space-evenly", textAlign: "center" }} onChange={this.Email} placeholder="Enter Email" />
                            {this.state.invalidemail ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Invalid email! Please rewrite your email</p></div> : null}
                            {this.state.sandbox ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Email is not in the domain. Please enter an email in the domain</p></div> : null}
                            {this.state.isemailexist ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Email is already registered. Please enter an another email</p></div> : null}

                            < Input className="mb-4" type="password" onChange={this.Password} placeholder="Enter Password" />
                            {this.state.invalidpassword ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Password need to be at least 7 character</p></div> : null}

                            <div className='Selectopt'>
                                <select value={this.state.Gender} onChange={this.Gender} className='Selectopt'>
                                    <option>Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>


                            <div className="row" style={{ justifyContent: "center" }}>
                                < Button style={{ width: "auto" }} className="b-login"
                                    onClick={this.handleSubmit} color="secondary" block >Create Account {this.state.invalid}</Button >
                            </div>

                            <div className="login-check">Already registered? < Link to={'/Login'} className="nav-link2" pathname="Login!" > Login </Link >
                                < Switch >
                                    < Route path='/Login' component={Login} />
                                </Switch >
                            </div>

                        </Form >
                    </Row >
                </Container >

            </div >

        );

    }
}

export default Reg;