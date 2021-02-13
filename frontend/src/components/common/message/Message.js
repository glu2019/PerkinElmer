import React, {Component} from "react";
import {Alert} from "react-bootstrap";

class Message extends Component {
  render() {
    return (this.props.isHidden
      ? null
      : (
        <Alert bsStyle={this.props.status} className={this.props.className}>
          {this.props.children}
        </Alert>
      ));
  }
}

export default Message;
