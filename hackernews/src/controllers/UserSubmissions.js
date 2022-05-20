import React, { Component } from "react";
import APIService from "../services/APIService";
import CircularProgress from '@material-ui/core/CircularProgress';

import ListSubmissions from "../components/submissions/ListSubmissions";

class IndexSubmissions extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: true,
      Submissions: [],
      Votes: [],
      error: false,
    };
  }

  componentDidMount() {

    APIService.get('/users/'  + window.location.href.split('/')[4] + '/submissions').then(
      response => {
          this.setState({
              Submissions: response.data,
            loading: false,
          });
      }
    ).catch( error => {
      
      this.setState({
        loading: false,
        error: true
    })});
  
}

  render_return(){

    if (this.state.loading === true){
        return <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
                <CircularProgress />
              </div>
    }
    else if (this.state.error === true){
      return <span> User does not exists </span>
    }
    else {
      return <ListSubmissions submissions={ this.state.Submissions } />
    }
  }

  render() {
    const { loading, Submissions, error } = this.state;
    return (this.render_return())
  }
}

export default IndexSubmissions;