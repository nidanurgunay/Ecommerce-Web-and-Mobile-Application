import React, { Component } from 'react';
import './App.css';
import tracker from '../src/api/tracker';
import Table from 'react-bootstrap/Table';
import 'react-pro-sidebar/dist/css/styles.css';
class product_manager_comments extends Component {
    constructor() {

        super();

        this.state = {
            comments: [],
     //       invalidcomments: [],
        }

    }
    componentDidMount = async () => {
        try {
            
            const response = await tracker.get("comment/all");
            console.log("all comments response: ", response);
            await this.setState({ comments: response.data });
            console.log(this.state.comments);

        } catch (e) {
            console.log(e);
        }

    }
    
    Validate = async (product, id, user, rating, text, totalrating, index,i,j) => {
        try {
            console.log("validate");
           console.log("id",id)
           console.log("pro", product)
           console.log("i",i)
           console.log("j", j)
           console.log("comments", this.state.comments)
           const paramid= this.state.comments[i]._id;
           const reqid=this.state.comments[i].comments[j]._id;
           console.log("iparamid",paramid)
           console.log("reqid", reqid)
            const response = await tracker.put("/comment/validate/" + paramid, {
                id:reqid
  
            });
            console.log("val", response);

        } catch (e) {
            console.log(e);
        }
    }
    
    getInvalidComments = () => {
        console.log("getInvalidComments");
        var invalidComments = [];
        var count = -1;
        if (this.state.comments.length !== 0) {
            console.log("comments are not null");
            var comment;
            for (var i = 0; i < this.state.comments.length; i++) {
                console.log(this.state.comments[i]);
                var product = this.state.comments[i]._id;
                var totalrating = this.state.comments[i].totalRate;
                for (var j = 0; j < this.state.comments[i].comments.length; j++) {
                    var isValid = this.state.comments[i].comments[j].isValid;
                    var id=0;
                    var user=0;
                    var rating=0;
                    var text="";
                    const loci=i;
                    const locj=j;
                    if (isValid === false) {
                        id = this.state.comments[i].comments[j]._id;
                        user = this.state.comments[i].comments[j].user;
                        rating = this.state.comments[i].comments[j].rating;
                        text = this.state.comments[i].comments[j].text;
                        count++;
                        comment = (
                            <tr>
                                <td>{product}</td>
                                <td>{id}</td>
                                <td>{user}</td>
                                <td>{rating}</td>
                                <td>{text}</td>
                                <td className='notify' for='cb'><input type="checkbox" onClick={() => this.Validate(product, id, user, rating, text, totalrating, count, loci, locj)} /></td>
                            </tr>

                        );
                        invalidComments.push(comment);
                    }
                }
            }
            return invalidComments;
        }
     
    
    };
    render() {
        return (
            <div>
                   
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <td>Product</td>
                            <td>Id</td>
                            <td>User</td>
                            <td>Rating</td>
                            <td>Text</td>
                            <td>Validate</td>
                        </tr>
                    </thead>
                    <tbody>
                     
                        {this.getInvalidComments()}
                    </tbody>
                        </Table>
            
            </div>

        );
    }

}
export default product_manager_comments;