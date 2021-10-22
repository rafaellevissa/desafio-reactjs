import React, { Component } from "react";
import ApiService from "../../services/service";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.getUser= this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        name: "",
        cpf: "",
        email: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name,
        }
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        email: email,
      }
    }));
  }

  onChangeCpf(e) {
    const cpf = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        cpf: cpf,
      }
    }));
  }

  getUser(id) {
    ApiService.getUser(id)
      .then(response => {
        this.setState({
          currentUser: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    ApiService.updateUser(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The user was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteUser() {    
    ApiService.deleteUser(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  value={currentUser.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="Email"
                  value={currentUser.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Cpf</label>
                <input
                  type="text"
                  className="form-control"
                  id="Cpf"
                  value={currentUser.cpf}
                  onChange={this.onChangeCpf}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}
