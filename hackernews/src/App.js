import logo from './logo.svg';
import './App.css';
import APIService from "./services/APIService";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Navigate , Route, Routes, BrowserRouter, useParams} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

import IndexSubmissions from "./controllers/IndexSubmissions";
import User from "./controllers/User";
import UserSubmissions from "./controllers/UserSubmissions";
import UpvotedSubmissions from "./controllers/UpvotedSubmissions";
import SubmitSubmission from './components/submissions/SubmitSubmission';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {},
    };
  }

  componentDidMount() {
    APIService.get('/users/1').then(
      response => {
        this.setState({
          user: response.data,
          loading: false,
        });
      }
    );
  }

  render() {
    const { loading, user } = this.state;
    return (
      loading ?
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
          <CircularProgress />
      </div>
      :
      <>
        <div style={{ height: '10px' }}></div>
          <div className="col-md">
            <div className="container">
              <nav className="mb-1 nav navbar-expand-lg navbar-light bg-hacker-news">
                <ul className="navbar-nav ml-2">
                  <li className="nav-item"><a className="navbar-brand" style={{fontWeight: 'bold'}} href="/">Hacker News</a></li>
                  <li className="nav-item"><a className="nav-link" href="/newest">News</a></li>
                  <li className="nav-item"><a className="nav-link" href="/comments/threads">Threads</a></li>
                  <li className="nav-item"><a className="nav-link" href="/ask">Ask</a></li>
                  <li className="nav-item"><a className="nav-link" href="/submit">Submit</a></li>
                </ul>
                <ul className="navbar-nav ml-auto nav-flex-icons">
                  <li className="nav-item">
                    <a className="nav-link" href="/users/1">
                      { user.user.username } ({ user.karma })
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <BrowserRouter>
              <Routes>
                  <Route exact path="*" element={<IndexSubmissions query={"?ordering=-votes"}/>} />
                  <Route exact path="/newest" element={<IndexSubmissions query={"?ordering=-created_at"}/>} />
                  <Route exact path="/ask" element={<IndexSubmissions query={"asks"}/>} />
                  <Route exact path="/submit" element={<SubmitSubmission />} />
                  <Route exact path="/users/:id" element={<User/>} />
                  <Route exact path="/users/:id/submissions" element={<UserSubmissions/>} />
                  <Route exact path="/submitted/:id/" element={<UserSubmissions />} />
                  <Route exact path="/upvoted/submissions" element={<UpvotedSubmissions id={this.state.user.user.id} />} />
                  <Route element={() => <h3 className="mt-4" align="center">404 Not Found</h3>} />
                </Routes>
            </BrowserRouter>
          </div>
      </>
    );
    
  }
}


export default App;
