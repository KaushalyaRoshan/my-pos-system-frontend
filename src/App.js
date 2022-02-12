import "./App.css";
import React from "react";
import Table from "./components/table";
import OrderStatistics from "./components/orderStatistics";
import AddOrder from "./components/addOrder";
//import SideBar from "./components/sideBar";
import {
  getNotShippedYetOrders,
  getorders,
  getRefundedOrders,
  getShippedOrders,
  getTotalSales,
} from "./components/data/orders";
import Footer from "./components/footer";

class App extends React.Component {
  /**
   * Order Status : "Not Shipped Yet","Shipped","Refunded"
   *
   *
   */

  state = {
    orders: [...getorders()],
    totalSales: getTotalSales(),
    shippedOrders: getShippedOrders(),
    notShippedYetOrders: getNotShippedYetOrders(),
    refundedOrders: getRefundedOrders(),
  };

  handleSubmit(order) {
    //const orders = [...this.state.orders];
    const orders = this.state.orders;
    console.log(orders);
    // orders.push(order);
    // this.setState(orders);
  }

  render() {
    return (
      <div className="App">
        <main className="container">
          <OrderStatistics
            data={this.state.orders}
            shippedOrders={this.state.shippedOrders.length}
            notShippedYetOrders={this.state.notShippedYetOrders.length}
            refundedOrders={this.state.refundedOrders.length}
            totalOrders={this.state.orders.length}
            totalSales={this.state.totalSales}
          />
          <Table data={this.state.orders} />

          <AddOrder onSubmit={this.handleSubmit} />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
