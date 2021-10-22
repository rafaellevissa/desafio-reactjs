import React, { Component } from "react";
import ApiService from "../../services/service";

export default class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeImei = this.onChangeImei.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeInstallments = this.onChangeInstallments.bind(this);
    this.saveOrder = this.saveOrder.bind(this);
    this.newOrder = this.newOrder.bind(this);

    this.state = {
      id: null,
      model: "",
      imei: "", 
      value: "",
      users: [],
      user_id: "",
      installments: "",
      status: 0,

      submitted: false
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeUser(e) {
    this.setState({
      user_id: e.target.value
    });
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }

  onChangeImei(e) {
    this.setState({
      imei: e.target.value
    });
  }

  onChangeValue(e) {
    this.setState({
      value: e.target.value
    });
  }

  onChangeInstallments(e) {
    this.setState({
      installments: e.target.value
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

  saveOrder() {
    var data = {
      model: this.state.model,
      value: this.state.value,
      imei: this.state.imei,
      installments: this.state.installments,
      user_id: this.state.user_id,
    };
    ApiService.createOrder(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          model: response.data.model,
          imei: response.data.imei,
          value: response.data.value,
          installments: response.data.installments,
          status: response.data.status,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newOrder() {
    this.setState({
      id: null,
      model: "",
      imei: "", 
      value: "",
      user_id: "",
      installments: "",
      users: [],

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newOrder}>
              Add
            </button>
          </div>
        ) : (
          <div>
              <div className="form-group">
                <label htmlFor="name">User</label>
                <select
                  type="text"
                  className="form-control"
                  id="user"
                  required
                  value={this.state.user_id}
                  onChange={this.onChangeUser}
                  name="user_id"
                >
                  <option value=""></option>
                  {this.state.users.map((user, index) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  required
                  value={this.state.model}
                  onChange={this.onChangeModel}
                  name="model"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Imei</label>
                <input
                  type="text"
                  className="form-control"
                  id="imei"
                  required
                  value={this.state.imei}
                  onChange={this.onChangeImei}
                  name="imei"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">Value</label>
                <input
                  type="text"
                  className="form-control"
                  id="value"
                  required
                  value={this.state.value}
                  onChange={this.onChangeValue}
                  name="value"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cpf">Installments</label>
                <input
                  type="text"
                  className="form-control"
                  id="installments"
                  required
                  value={this.state.installments}
                  onChange={this.onChangeInstallments}
                  name="installments"
                />
              </div>

              <button onClick={this.saveOrder} className="btn btn-success">
                Submit
              </button>
          </div>
        )}
      </div>
    );
  }
}
