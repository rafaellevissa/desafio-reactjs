import React, { Component } from "react";
import ApiService from "../../services/service";
import { Link } from "react-router-dom";

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrder = this.setActiveOrder.bind(this);

    this.state = {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }

  retrieveOrders() {
    ApiService.getAllOrders()
      .then(response => {
        this.setState({
          orders: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOrders();
    this.setState({
      currentOrder: null,
      currentIndex: -1
    });
  }

  setActiveOrder(order, index) {
    this.setState({
      currentOrder: order,
      currentIndex: index
    });
  }

  render() {
    const { orders, currentOrder, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Orders List</h4>

          <ul className="list-group">
            {orders &&
              orders.map((order, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveOrder(order, index)}
                  key={index}
                >
                  {order.model}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentOrder ? (
            <div>
              <h4>Order</h4>
              <div>
                <label>
                  <strong>Model:</strong>
                </label>{" "}
                {currentOrder.model}
              </div>
              <div>
                <label>
                  <strong>IMEI:</strong>
                </label>{" "}
                {currentOrder.imei}
              </div>
              <div>
                <label>
                  <strong>Value:</strong>
                </label>{" "}
                {currentOrder.value}
              </div>
              <div>
                <label>
                  <strong>Installments:</strong>
                </label>{" "}
                {currentOrder.installments}
              </div>

              <Link
                to={"/order/" + currentOrder.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Order...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
