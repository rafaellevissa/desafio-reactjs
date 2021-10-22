import React, { Component } from "react";
import ApiService from "../../services/service";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeImei = this.onChangeImei.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeInstallments = this.onChangeInstallments.bind(this);
    this.getOrder= this.getOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);

    this.state = {
      currentOrder: {
        id: null,
        model: "",
        imei: "",
        value: "",
        installments: "",
        user_id: "",
      },
      users: [],
      message: ""
    };
  }

  componentDidMount() {
    this.getOrder(this.props.match.params.id);
    this.retrieveUsers();
  }

  onChangeModel(e) {
    const model = e.target.value;

    this.setState(function(prevState) {
      return {
        currentOrder: {
          ...prevState.currentOrder,
          model: model,
        }
      };
    });
  }

  onChangeImei(e) {
    const imei = e.target.value;
    
    this.setState(prevState => ({
      currentOrder: {
        ...prevState.currentOrder,
        imei: imei,
      }
    }));
  }

  onChangeValue(e) {
    const value = e.target.value;
    this.setState(prevState => ({
      currentOrder: {
        ...prevState.currentOrder,
        value: value,
      }
    }));
  }

  onChangeInstallments(e) {
    const installments = e.target.value;
    this.setState(prevState => ({
      currentOrder: {
        ...prevState.currentOrder,
        installments: installments,
      }
    }));
  }

  onChangeUser(e) {
    const user_id = e.target.value;
    console.log(e.target.value);
    this.setState(prevState => ({
      currentOrder: {
        ...prevState.currentOrder,
        user_id: user_id,
      }
    }));
  }

  getOrder(id) {
    ApiService.getOrder(id)
      .then(response => {
        this.setState({
          currentOrder: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveUsers() {
    ApiService.getAllUsers()
      .then(response => {
        this.setState({
          users: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateOrder() {
    if(this.state.currentOrder.model != "" && this.state.currentOrder.imei != "" && this.state.currentOrder.value != "" && this.state.currentOrder.user_id != "" && this.state.installments != "")
    {
      ApiService.updateOrder(
        this.state.currentOrder.id,
        this.state.currentOrder
      )
        .then(response => {
          console.log(response.data);
          this.setState({
            message: "The order was updated successfully!"
          });
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.setState({
        message: "Preencha todos os campos!"
      });
    }
  }

  deleteOrder() {    
    ApiService.deleteOrder(this.state.currentOrder.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentOrder } = this.state;

    return (
      <div>
        {currentOrder ? (
          <div className="edit-form">
            <h4>Order</h4>
            <form>
            <div className="form-group">
                <label htmlFor="name">User</label>
                <select
                  type="text"
                  className="form-control"
                  id="user"
                  required
                  value={currentOrder.user_id}
                  onChange={this.onChangeUser}
                  name="user"
                >
                  {this.state.users.map((user, index) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="Model"
                  value={currentOrder.model}
                  onChange={this.onChangeModel}
                />
              </div>
              <div className="form-group">
                <label htmlFor="imei">IMEI</label>
                <input
                  type="text"
                  className="form-control"
                  id="Imei"
                  value={currentOrder.imei}
                  onChange={this.onChangeImei}
                />
              </div>
              <div className="form-group">
                <label htmlFor="value">Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="value"
                  value={currentOrder.value}
                  onChange={this.onChangeValue}
                />
              </div>
              <div className="form-group">
                <label htmlFor="value">Installments</label>
                <input
                  type="number"
                  className="form-control"
                  id="installments"
                  value={currentOrder.installments}
                  onChange={this.onChangeInstallments}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteOrder}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateOrder}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Order...</p>
          </div>
        )}
      </div>
    );
  }
}
