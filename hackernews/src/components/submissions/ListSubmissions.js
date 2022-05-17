import React, { Component } from "react";
import Submission from "./Submission";

export default class ListSubmissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submissions: props.submissions
    };
  }

  render() {    
    let index = 0;
    const { submissions } = this.state;

    return (
      <div className="row ml-1">
        <div className="col">
          { submissions.map((submission) => {
              index++;
              return <Submission key={submission.id} index={index} submission={submission} />
            })
          }
        </div>
      </div>
    );
  }
}