import React, { Component } from 'react';
import './App.css';
import Reg from './register';
import { Button, Container, Form, Input, Row } from 'reactstrap';
import tracker from '../src/api/tracker'


import { BrowserRouter as Switch, Route, Link } from 'react-router-dom';

class Login extends Component {

    constructor(props) {

        super(props);

        this.state = {

            Email: '',

            Password: '',
            invalidemail: false,
            logedin: false,

        }


        this.Password = this.Password.bind(this);

        this.Email = this.Email.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);


    }


    Email(event) {

        this.setState({ Email: event.target.value })

    }

    Password(event) {

        this.setState({ Password: event.target.value })

    }


    handleSubmit = async () => {
        console.log("içerdeyim")
        try {
            const response1 = await tracker.post('/login', {
                email: this.state.Email,
                password: this.state.Password,

            });
            const token = response1.data.token;
            const email = response1.data.email;
            const userId = response1.data.userid;
            const isProductManager = response1.data.isProductManager;
            const isSalesManager = response1.data.isSalesManager;
            const response = await tracker.get('/user/' + userId);
            console.log(response)

            console.log(response1);
            if (response.data.status === "error" && response.data.error === "Invalid email/password") {
                this.setState({ invalidemail: true })
            }
            else if (response1.data.message === "valid") {
                this.setState({ invalidemail: false })
                console.log("email", email);
                console.log("sales", isSalesManager);
                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('userId', userId);
                localStorage.setItem('isProductManager', isProductManager);
                localStorage.setItem('isSalesManager', isSalesManager);
                if (response.data.adressId) {
                    localStorage.setItem('adressId',response.data.adressId);
                }
                console.log("props:", this.props)
                this.props.history.push({
                    pathname: '/Homepage',
                    state: { loggedin: this.state.loggedIn }
                })
            }
        } catch (e) {
            console.log("error")
        }
    }

    render() {


        return (

            < div className="form" >

                < Container className="form-container" >

                    < Row className="form" >
                        < Form >
                            < div className="login-check" >Login</div >


                            < Input className="mb-4" type="text" onChange={this.Email} placeholder="Enter Email" />

                            < Input className="mb-4" type="password" onChange={this.Password} placeholder="Enter Password" />
                            {this.state.invalidemail ? <div className="row" style={{ color: "#c29fdc", justifyContent: "space-evenly" }}><p>Invalid email or password! Please rewrite your email or password!</p></div> : null}


                            < Button className="b-login" onClick={this.handleSubmit} color="secondary" block > Login</Button >

                            <div className="login-check"> You don't have an account, yet? < Link to={'/register'} className="nav-link2" pathname="Sign Up!" > Register </Link >
                                < Switch >

                                    < Route path='/register' component={Reg} />

                                </Switch >
                            </div>

                        </Form >

                    </Row >

                </Container >

            </div >

        );

    }

}


export default Login;