import React, { Component } from "react";
import APIService from "../services/APIService";
import CircularProgress from '@material-ui/core/CircularProgress';

import ListSubmissions from "../components/submissions/ListSubmissions";

class UserSubmissions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      submissions: []
    };
  }

  componentDidMount() {
    APIService.get('/users/' + this.props.match.params.id + '/submissions').then(
      response => {
        this.setState({
            submissions: response.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
          loading: false
        });
      }
    );
  }

  render() {
    const { loading, submissions } = this.state;
    return (
      loading ? 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <CircularProgress />
        </div>
      :
        <ListSubmissions submissions={ submissions } />
    );
  }
}

export default UserSubmissions;