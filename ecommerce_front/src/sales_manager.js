
import tracker from '../src/api/tracker';
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import Moment from 'moment';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class sales_manager extends Component {
    constructor() {
        super()
        this.state = {
            product: [],
            quantity_product: [],
            orders: [],
            dataPoints:[]
        }
    }
    componentDidMount = async () => {
        try {
            const response = await tracker.get("product/all");
            const arrayproduct = response.data;
            await this.setState({ product: arrayproduct });
            console.log("state", this.state.product);

            var products = [];
            if (this.state.product.length !== 0) {
                var productitem;

                for (var i = 0; i < this.state.product.length; i++) {
                    console.log(this.state.product[i]);
                    const quantity = this.state.product[i].countInStock;
                    const name = this.state.product[i].name;
                    productitem = { label: name, y: quantity };
                    products.push(productitem);

                }
                await this.setState({ quantity_product: products });
               
                const order_response = await tracker.get("order/all");
                const orderarray = order_response.data;
                await this.setState({ orders: orderarray });
                if (this.state.orders.length !== 0) {
                    var invoices = [];

                    console.log(this.state.orders);
                    var item;
                    for (var j = 0; j < this.state.orders.length; j++) {
                        var date = this.state.orders[j].createdAt;
                        const basketid = this.state.orders[j].basket;
                        const res = await tracker.get('/basket/' + basketid);

                        console.log(res);
                        const totalprice = res.data.productList.totalprice;
                    

                        console.log(typeof totalprice);
                        date = date.substring(0, 10);
                        date = Moment(date).format('YYYY-MM-DD');

                        console.log(typeof date);
                        item = { label: date, y: totalprice };
                        console.log(date);
                        console.log(item.label);
                        console.log(item.y);
                        var exists = false;
                        if (invoices.length > 0)
                        {
                            for (var i = 0; i < invoices.length && !exists; i++) {
                                if (invoices[i].label === item.label) {
                                    invoices[i].y = invoices[i].y + item.y;
                                    exists = true;
                                    
                                }
                            }
                            if (!exists) {
                                invoices.push(item);
                            }
                        }
                        else
                        {
                            invoices.push(item);
                        }
                    }
                    console.log("invoices: ", invoices);
                    await this.setState({ dataPoints: invoices });
                    console.log("dataPoints: ", this.state.dataPoints);
                    console.log("quantity_p: ", this.state.quantity_product);
                }
            }
        } catch (e) { }

    }

    render() {
        const option_column = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
                text: "Products and Their Quantities"
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: this.state.quantity_product
                }
            ]
        }


        const option_line = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
                text: "Sales Day by Day"
            },
            axisY: {
                title: "Sales",
                suffix: "$"
            },
            axisX: {
                title: "Dates",
                prefix: "D: ",
            },
            data: [{
                type: "line",
                toolTipContent: "Day {label}: {y}$",
                dataPoints: this.state.dataPoints,
            }]
        }



        return (
            <>
            <div>
                <CanvasJSChart options={option_line}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
<br/>

            <div>
                <CanvasJSChart options={option_column}
                /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>


          
            </>

		);
    }
}
export default sales_manager;