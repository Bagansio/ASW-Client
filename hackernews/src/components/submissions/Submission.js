import React, { Component } from "react";
import Moment from "moment";
import APIService from "../../services/APIService";

class Submission extends Component {
  constructor(props) {
    super(props);
    this.onClickVote = this.onClickVote.bind(this);
    this.onClickUnvote = this.onClickUnvote.bind(this);

    this.state = {
      submission: props.submission,
      index: props.index === undefined ? false : props.index,
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.submission !== prevProps.submission) {
      this.setState({
        submission: this.props.submission
      }); 
    }
  } 

  onClickUnvote() {
    APIService.delete('/submissions/' + this.state.submission.id + '/votes').then(
      response => {
          if (response.status === 200){
            let sub = this.state.submission;
            sub.status = "unvoted"
            sub.votes -= 1
            this.setState({
                submission: sub
              });
            
            this.props.sort() 
          }
      }
    );
  }

  onClickVote() {
    APIService.post('/submissions/' + this.state.submission.id + '/votes/', {}).then(
      response => {
        if (response.status === 200){
            let sub = this.state.submission;
            sub.status = "voted"
            sub.votes += 1
            this.setState({
                submission: sub
              }); 
            this.props.sort() 
        }
      }
    );
  }

 renderAsk(){
   if(this.state.submission.url === null){
     return "ASK HN:" 
   }
   return null
 }

  renderStatus(status) {
    const htmlStatus = {
      voted: <span className="titleUser mr-1">&nbsp;&nbsp;&nbsp;&nbsp;</span>,
      unvoted: <div className="title clickable mr-1" onClick={ this.onClickVote }>▲</div>,
      author: <span className="titleUser">&nbsp;*&nbsp;&nbsp;</span>
    };
    return htmlStatus[status];
  }

  render() {    
    const { index, submission} = this.state;
    return  (
      <table>
        <tbody>
          <tr>
            { index ?
                <td className="title">{ index }.</td>
              :
                <td></td>
            }
            <td>
              { this.renderStatus(submission.status) }
            </td>
            <td className="title">
              <a 
              className="link"
              href={ 
                submission.url !== null ? 
                submission.url
                : 
                  '/submission/' + submission.id
              }>
                { this.renderAsk() }
                { submission.title }
              </a>
              &nbsp;
              { submission.url !== null &&
                <span className="yclinks">
                  ({new URL(submission.url).hostname})
                </span>
              }
            </td>
          </tr>
          <tr>
            <td colSpan="2"></td>
            <td className="subtext">
              <span className="subtext">
                { submission.votes + ' points by ' }
              </span>
              <a className="subtext" href={ '/users/' + submission.author.id } >
                { submission.author.username }
              </a>
              &nbsp;
              <a className="subtext" href={ '/comment/' + submission.id }>
                { Moment(submission.created_at).fromNow() }
              </a>
              &nbsp;
              { submission.status === 'voted' &&
                <>
                  <span className = "subtext">|</span>
                  &nbsp;
                  <span className="subtext clickable" onClick={ this.onClickUnvote }>unvote</span>
                  &nbsp;
                </>
              }
              <span className = "subtext">|</span>&nbsp;
              <a className="subtext" href={ '/submission/' + submission.id }>
                { submission.comments + ' comments' }
              </a>
            </td>
          </tr>
          <tr id="pagespace" style={{height: '10px'}}></tr>
        </tbody>
      </table>
    );
  }
}

export default Submission;