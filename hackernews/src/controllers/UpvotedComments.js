import React, { Component } from "react";
import APIService from "../services/APIService";
import CircularProgress from '@material-ui/core/CircularProgress';

import ListComments from "../components/comments/ListComments";

class UpvotedComments extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      comments: []
    };
  }

  componentDidMount() {
    APIService.get('/users/'+ this.props.id + '/voted_comments').then(
      response => {
        this.setState({
          comments: response.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
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

export default UpvotedComments;
