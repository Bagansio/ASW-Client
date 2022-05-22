import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import APIService from "../../services/APIService";
import RecursiveComments from "../comments/RecursiveComments";
import Submission from "../submissions/Submission";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class SubmissionComments extends Component {
  constructor(props) {
    super(props);
    this.handleComment = this.handleComment.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.state = {
      loading: true,
      submission: {},
      comments: [],
      text: '',
      errors: {}
    };
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  componentDidMount() { 
    let id =  window.location.href.split('/')[4];

    Promise.all([
      APIService.get('/submissions/' + id),
      APIService.get('/submissions/' + id + '/comments')
    ]).then(
      responses => {
        this.setState({
          submission: responses[0].data,
          comments: responses[1].data,
          loading: false,
        });
      }
    );
  }

  handleComment(e) {
    e.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      APIService.post('/submissions/' + this.state.submission.id +'/comments/', {
        text: this.state.text
      }).then(
        response => {
          this.componentDidMount();
          this.setState({
            text: ''
          });
        },
        error => {
          this.setState({
            errors: error.response.data.errors
          });
        }
      )
    }
  }

  renderStatus(status) {
    const htmlStatus = {
      voted: <span className="titleUser">&nbsp;&nbsp;</span>,
      unvoted: <div className="title clickable mr-1" onClick={ this.onClickVote }>▲</div>,
      owner: <span className="titleUser ml-1 mr-1">*</span>
    };
    return htmlStatus[status];
  }

  render() {
    const { submission, text, errors, comments, loading } = this.state;

    return (
      !loading ?
          <div className="row ml-1 mt-2">
            <div className="col-12">
              <Submission submission={ submission } deleteButton={false} />
              <div className="row ml-1">
                { submission.type === 'ask' &&
                  <p className="title">
                    { submission.text }
                  </p>
                }
              </div>
              <div className="row mt-1 mb-4">
                <div className="col-6">
                  <Form onSubmit={ this.handleComment } ref={ c => { this.form = c; } }>
                    <div className="form-group">
                      <textarea
                        name="text"
                        className="form-control"
                        rows="4"
                        value={ text }
                        onChange={this.onChangeText}
                      />
                      { errors['text'] && 
                        <div className="alert alert-danger">{ errors['text'] }</div>
                      }
                    </div>
                    <button type="submit" className="btn btn-primary-mine">add comment</button>
                    <CheckButton
                      style={{ display: "none" }}
                      ref={c => {this.checkBtn = c;}}
                    />
                  </Form>
                </div>
              </div>
              <RecursiveComments comments={comments}/>
            </div>
          </div>
        :
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px' }}>
            <CircularProgress />
          </div>
    );
  }
}

