import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import APIService from "../../services/APIService";

export default class SubmitSubmission extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.state = {
      title: null,
      url: null,
      text: null,
      errors: {}
    };
  }
  
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    });
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      APIService.post('/submissions/',{
        title: this.state.title,
        url: this.state.url,
        text: this.state.text
      }).then(
        response => {
            window.location.href = "submission/" + response.data.id;
        },
        error => {
            if(error.response.data.url_to !== null){
                window.location.href = "submission/" + error.response.data.url_to.split('/')[5];

            }
            console.log(error.response.data.url_to)
          this.setState({
            errors: error.response.data.errors
          });
        }
      )
    }
  }

  render() {
    const { title, url, text, errors } = this.state;

    return (
      <div className="col-8">
        <Form onSubmit={ this.handleSubmit } ref={ c => { this.form = c; } } >
          <div className="form-group">
              <strong>Title</strong>
              <Input
                type="text"
                name="title"
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
                required
              />
              { errors['title'] && (
                <div className="alert alert-danger">{ errors['title'] }</div>
              )}
          </div>
          <div className="form-group">
              <strong>Url</strong>
              <Input
                type="url"
                name="url"
                className="form-control"
                placeholder="Url"
                value={url}
                onChange={this.onChangeUrl}
              />
              { errors['url'] && (
                <div className="alert alert-danger">{ errors['url'] }</div>
              )}
          </div>
          <div className="form-group">
              <strong>Text</strong>
              <textarea
                name="text"
                className="form-control"
                placeholder="Text"
                value={text}
                rows="4"
                onChange={this.onChangeText}
              />
              { errors['text'] && (
                <div className="alert alert-danger">{ errors['text'] }</div>
              )}
          </div>
              
          <button type="submit" className="btn btn-primary-mine">Submit</button>

          <CheckButton
            style={{ display: "none" }}
            ref={c => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    );
  }
}