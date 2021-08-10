import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BiCommentEdit, BiShoppingBag, BiMenu } from "react-icons/bi";
import { SidebarContent } from 'react-pro-sidebar';
class product_manager extends Component {
    constructor() {
        super();

    }


    
    render() {
        const viewHeight = window.outerHeight;
        return (
            <div style={{ marginLeft: "-125px", paddingBottom: "2rem" }}>
                <ProSidebar>

                    <SidebarContent>
                        <Menu iconShape="square" icon={<BiMenu />} >
                            <MenuItem icon={<BiCommentEdit />}>Comments<Link to="/product_manager_comments" /></MenuItem>
                           
                            <SubMenu title="Edit Products" icon={<BiShoppingBag />}>
                                <MenuItem>Add Product<Link to="/pm_add_product" /></MenuItem>
                                <MenuItem>Edit/Delete Product<Link to='/pm_delete_product' /></MenuItem>
                               
                            </SubMenu>

                        </Menu>
                    </SidebarContent>


                </ProSidebar>
            </div>
        );
    }
}
export default product_manager;