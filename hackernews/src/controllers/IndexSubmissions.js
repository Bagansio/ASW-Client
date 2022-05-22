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
      Votes: []
    };
  }

  componentDidMount() {
    APIService.get('/submissions/' + this.props.query).then(
      response => {
        this.setState({
            Submissions: response.data,
          loading: false
        });
      }
    );
  }

  render() {
    const { loading, Submissions } = this.state;
    return (
      loading ? 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <CircularProgress />
        </div>
      :
        <ListSubmissions submissions={ Submissions } />
    );
  }
}

export default IndexSubmissions;
