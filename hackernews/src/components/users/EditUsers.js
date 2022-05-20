import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import Moment from 'moment';
import APIService from "../../services/APIService";

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeAbout = this.onChangeAbout.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.state = {
      user: props.user,
      errors: {},
      message: ''
    };
  }

  onChangeAbout(e) {
    this.setState({
      about: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  handleUpdate(e) {
    e.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      APIService.put('/users/' + this.state.user.id, this.state.user).then(
        response => {
          this.setState({
            user: response.data,
            errors: {},
            message: 'Updated!'
          });
        }, error => {
          this.setState({
            errors: error.response.data.errors,
            message: ''
          });
        }
      );
    }
  }

  render() {
    const{ user, errors, message } = this.state;
    return (
      <div className="col-6 mt-2">
        <Form onSubmit={ this.handleUpdate } ref={ c => { this.form = c; } }>
          <table cellPadding="0" cellSpacing="0">
            <tbody className="default">
              <tr className="default">
                <td valign="top">user: </td>
                <td>
                  <Input 
                    type="text"
                    className="form-control"
                    name="username"
                    size="60"
                    placeholder="Username"
                    value={ user.username }
                    onChange={ this.onChangeUsername }
                  />
                  { errors['username'] && 
                    <div className="alert alert-danger">{ errors['username'] }</div>
                  }
                </td>
              </tr>
              <tr className="default">
                <td valign="top">created: </td>
                <td>
                  <div className="default">
                    { Moment(user.created_at).fromNow() }
                  </div>
                </td>
              </tr>
              <tr className="default">
                <td valign="top">karma: </td>
                <td>{ user.karma }</td>
              </tr>
              <tr>
                <td valign="top">about: </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    name="about"
                    size="256"
                    placeholder="About"
                    value={ user.about }
                    onChange={ this.onChangeAbout }
                  />
                  { errors['about'] && 
                    <div className="alert alert-danger">{ errors['about'] }</div>
                  }
                </td>
              </tr>
              <tr id="pagespace" ></tr>
              <tr>
                <td valign="top">email: </td>
                <td>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    size="60"
                    placeholder="Email"
                    value={ user.email }
                    onChange={ this.onChangeEmail }
                  />
                  { errors['email'] && 
                    <div className="alert alert-danger">{ errors['email'] }</div>
                  }
                </td>
              </tr>
              <tr style={{ height: '20px' }}></tr>
              <tr>
                  <td></td>
                  <td>
                    <a className="pagetop" href={ '/users/' + user.id + '/submissions' }>
                      <u>submissions</u>
                    </a>
                  </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a className="pagetop" href={ '/users/' + user.id + '/comments' }>
                    <u>comments</u>
                  </a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a className="pagetop" href={ '/users/' + user.id + '/voted_submissions' }>
                    <u>upvoted submissions</u>
                  </a>
                  { ' / ' }
                  <a className="pagetop" href={ '/users/' + user.id + '/voted_comments' }>
                    <u>comments</u>
                  </a>
                  { ' (private)' }
                </td>
              </tr>
              <tr style={{ height: '20px' }}></tr>
              <tr>
                <td></td>
                <td>
                  <button type="submit" className="btn btn-primary-mine">update</button>
                  <div className="m-2 p-0 alert">{ message }</div>
                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {this.checkBtn = c;}}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
    );
  }
}