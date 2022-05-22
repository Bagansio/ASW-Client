import React, { Component } from "react";
import Comment from "./Comment";

export default class ListComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: props.comments
    };
  }

  render() {
    const { comments } = this.state;
    return(
      <div className="row ml-1">
        <div className="col">
          { comments.map((comment) => {
              return <Comment key={comment.id} comment={comment} />
            })
          }
        </div>
      </div>
    );
  }
}