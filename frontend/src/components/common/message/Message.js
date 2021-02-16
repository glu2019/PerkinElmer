import React, {Component} from "react";
import Alert from 'react-bootstrap/Alert';

class Message extends Component {
  render() {
    return (this.props.isHidden
      ? null
      : (
        <Alert variant={this.props.status} className={this.props.className}>
          {this.props.children}
        </Alert>
      ));
  }
}

export default Message;
