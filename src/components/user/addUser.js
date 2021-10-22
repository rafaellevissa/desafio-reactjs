import React, { Component } from "react";
import ApiService from "../../services/service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      name: "",
      cpf: "", 
      email: "",

      submitted: false,
      message: "",
      status: 0,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value
    });
  }

  saveUser() {
    var data = {
      name: this.state.name,
      email: this.state.email,
      cpf: this.state.cpf,
    };
    if(this.state.name != "" && this.state.email != "" && this.state.cpf != ""){
      ApiService.createUser(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          cpf: response.data.cpf,
          status: response.data.status,
          submitted: true
        });
        if(response.data.status === 406){
          this.setState({
            message: response.data.error,
          })
        }
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      this.setState({
        message: "Fill in all fields!"
      })
    }
  }

  newUser() {
    this.setState({
      id: null,
      name: "",
      cpf: "", 
      email: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted && this.state.status === 200 ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  id="cpf"
                  required
                  value={this.state.cpf}
                  onChange={this.onChangeCpf}
                  name="cpf"
                />
              </div>

              <button onClick={this.saveUser} className="btn btn-success">
                Submit
              </button>
              <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  }
}
