import React, { Component } from "react";
import APIService from "../services/APIService";
import EditUsers from "../components/users/EditUsers";
import ShowUsers from "../components/users/ShowUsers";
import CircularProgress from '@material-ui/core/CircularProgress';

class User extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: {},
      loading: true
    };
  }

  componentDidMount() {
    APIService.get('/users/' +  window.location.href.split('/')[4]).then(
      response => {
        this.setState({
          user: response.data,
          loading: false
        });
      }
    );
  }

  renderUser(user) {
    return (
      user.user.id === 1 ?
        <EditUsers user={user}/>
      :
        <ShowUsers user={user}/>
    )
  }

  render() {
    const { loading, user } = this.state;
    return (
      loading ? 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <CircularProgress />
        </div>
      :
        this.renderUser(user)
    );
  }
}

export default User;
