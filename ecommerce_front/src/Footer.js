import React from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css';
import Logo from './mylogo.png';
import about_us from "./about_us";

function PageFooter() {
    return (
        <div className="footer">
            <Footer className='foot'
                columns={
                    [
                        {
                            icon: (
                                <img src={Logo} />
                            ),
                            title: 'FRIENDYOL',
                            items: [{
                                title: "Home",
                                url: 'http://localhost:3000/Homepage/',
                            }],
                            url: 'http://localhost:3000/Homepage/',
                            description: '',
                            openExternal: true,
                        },
                        {

                            title: 'ABOUT US',
                            items: [{
                                title:"Our Aim",
                                url: 'http://localhost:3000/about_us/',
                            }],

                            description: '',
                            openExternal: true,
                        },
                        {

                            title: 'CONTACT',
                            url: '',
                            items: [{
                                title:"Email: info@friendyol.com"

                            },
                                {
                                    title:"Phone: 0(212) 550 00 80"
                                }],
                            description: '',
                            openExternal: true,
                        }
                    ]}


                bottom="Made with ❤️ by CS308Killers"
            />,

        </div >
    );
}
export default PageFooter;