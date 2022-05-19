import React, { Component } from "react";
import Moment from "moment";
import APIService from "../../services/APIService";

export default class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: props.user
    };
  }

  render() {
    const{ user } = this.state;
      return (
        <div className="col-4">
          <table cellPadding="0" cellSpacing="0">
            <tbody className="default">
              <tr className="default">
                <td valign="top">user:</td>
                <td>
                  <a className="default" href={ '/users/' + user.id }>
                    { user.username }
                  </a>
                </td>
              </tr>
              <tr className="default">
                <td valign="top">created:</td>
                <td>
                  <div className="default">{ Moment(user.created_at).fromNow() }</div>
                </td>
              </tr>
              <tr className="default">
                <td valign="top">karma:</td>
                <td>{ user.karma }</td>
              </tr>
              <tr className="default">
                <td valign="top">about:</td>
                <td>
                  <a className="default" href={ '/users/' + user.about }>
                    { user.username }
                  </a>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <a className="pagetop" href={ '/users/' + user.id + '/submissions'  }>
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
            </tbody>
        </table>
      </div>
    );
  }
}
