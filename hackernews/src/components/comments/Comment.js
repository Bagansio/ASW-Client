import React, { Component } from "react";
import APIService from "../../services/APIService";
import Moment from "moment";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.onClickVote = this.onClickVote.bind(this);
    this.onClickUnvote = this.onClickUnvote.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChangeText = this.onChangeText.bind(this);

    this.state = {
      edit: false,
      text: props.comment.text,
      errors: {},
      comment: props.comment,
      on: props.on === undefined ? true : props.on,
      reply: props.reply === undefined ? true : props.reply,
    };
  }

  onClickEdit() {
    this.setState({
      edit: !this.state.edit
    });
  }


  onClickUnvote() {
    APIService.delete('/comments/' + this.state.comment.id + '/votes/').then(
      response => {
          let temp = this.state.comment;
          temp.status = "unvoted";

        this.setState({
          comment: temp
        });
      }
    );
  }

  onClickVote() {
    APIService.post('/comments/' + this.state.comment.id + '/votes/').then(
      response => {
        let temp = this.state.comment;
        temp.status = "voted";

      this.setState({
        comment: temp
      });
      }
    );
  }

  renderStatus(status) {
    const htmlStatus = {
      voted: <div className="titleUser mr-1">&nbsp;&nbsp;&nbsp;&nbsp;</div>,
      unvoted: <div className="title clickable mr-1" onClick={ this.onClickVote }>▲</div>,
      owner: <span className="titleUser">&nbsp;*&nbsp;&nbsp;</span>
    };
    return htmlStatus[status];
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleUpdate(e) {
    e.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      APIService.put('/comments/' + this.state.comment.id + '/', {
        text: this.state.text
      }).then(
        response => {
          this.setState({
            comment: response.data,
            text: response.data.text,
            edit: false
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


  renderParent() {
      if(this.state.comment.parent !== null){
          return(
              <span> | <a className="subtext"   href={"#comment"+ this.state.comment.parent.id }>parent -> {this.state.comment.parent.id} </a></span>
            
          )
      }
  }

  render() {
    const { comment, on, reply, edit, text, errors, } = this.state;
    return(
      <table>
        <tbody>
          <tr>
            <td>
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      { this.renderStatus(comment.status) }
                    </td>
                    <td>
                      <a  id={ "comment" + comment.id } className="yclinks" href={ '/users/' + comment.author.id }>{comment.id}.{ comment.author.username }</a>&nbsp;
                      <span className="subtext">
                        { Moment(comment.created_at).fromNow() + ' ' }
                      </span>
                      <span>
                      { this.renderParent()}
                      </span>
                      { comment.status === 'voted' &&
                        <>
                          <span className="subtext">|</span>
                          &nbsp;
                          <span className="subtext clickable" onClick={ this.onClickUnvote } >unvote</span>
                          &nbsp;
                        </>
                      }
                      { comment.status === 'owner' &&
                        <>
                          <span className = "subtext">|</span>
                          &nbsp;
                          <span className="subtext clickable" onClick={ this.onClickEdit }>edit</span>
                        
                        </>
                      }
                      { on &&
                        <>
                          <span className = "yclinks">| on: </span>
                          <a className="yclinks" href={ '/submission/' + comment.submission.id }>{ comment.submission.title }</a>
                        </>
                      }
                    </td>
                  </tr>
                  <tr>
                      <td colSpan="1"></td>
                      <td className="comment">
                        { edit ? 
                            <Form onSubmit={ this.handleUpdate } ref={ c => { this.form = c; } }>
                              <div className="form-group">
                                <textarea
                                  name="text"
                                  className="form-control"
                                  rows="2"
                                  value={ text }
                                  onChange={ this.onChangeText }
                                />
                                { errors.text &&
                                  <div className="alert alert-danger">{ errors.text }</div>
                                }
                              </div>
                              <button type="submit" className="btn btn-primary-mine">update</button>
                              <CheckButton
                                style={{ display: "none" }}
                                ref={c => {this.checkBtn = c;}}
                              />
                            </Form>
                          :
                            comment.text 
                        }
                      </td>
                  </tr>
                  <tr>
                    <td colSpan="1"></td>
                    <td>
                      { reply &&
                        <a className="subtextB" href={ '/reply/' + comment.id }>reply</a>
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}