import React, { Component } from "react";
import APIService from "../services/APIService";
import CircularProgress from '@material-ui/core/CircularProgress';

import ListComments from "../components/comments/ListComments";

class UserComments extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      comments: []
    };
  }

  componentDidMount() {
    let id = this.props.id!== undefined ? this.props.id : '1';
    APIService.get('/users/' + id + '/comments').then(
      response => {
        this.setState({
          comments: response.data.sort((a, b) => b.id - a.id),
          loading: false
        });
      }
    );
  }

  render() {
    const { loading, comments } = this.state;
    return (
      loading ? 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <CircularProgress />
        </div>
      :
        <ListComments comments={ comments } />
    );
  }
}

export default UserComments;