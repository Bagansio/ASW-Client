import React, { Component } from "react";
import Submission from "./Submission";

export default class ListSubmissions extends Component {
  constructor(props) {
    super(props);

    this.sort_submissions = this.sort_submissions.bind(this)

    this.state = {
      submissions: props.submissions
    };
  }

  sort_submissions() {
    
    if(! window.location.pathname.includes("newest")){
      let temp = this.state.submissions;
      this.setState({
        submissions: temp.sort((a,b) => b.votes - a.votes),
      })
    }
  }

  render() {    
    let index = 0;
    const { submissions } = this.state;

    return (
      <div className="row ml-1">
        <div className="col">
          { submissions.map((submission) => {
              index++;
              return <Submission sort={this.sort_submissions} key={submission.id} index={index} submission={submission} />
            })
          }
        </div>
      </div>
    );
  }
}