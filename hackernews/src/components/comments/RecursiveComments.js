import React, { Component } from "react";
import Comment from "../comments/Comment";

export default class RecursiveComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: props.comments
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.comments !== prevProps.comments) {
      this.setState({
        comments: this.props.comments
      }); 
    }
  } 




  renderComments(comments, margin = 'ml-3') {
    return (
        
      comments.reverse().map((comment) => {
        return (
            <div key={ comment.id } className={ 'row ml-3' }>
                <div > <Comment comment={ comment } on={false} /></div>
            </div>
        
        );
      })
    );
  }

  render() {
    const { comments } = this.state;
    return this.renderComments(comments, '');
  }
}