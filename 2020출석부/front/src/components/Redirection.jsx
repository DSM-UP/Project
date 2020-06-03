import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

class Redirection extends PureComponent {
  componentDidMount() {
    this.props.history.push("/main");
  }
  render() {
    return <h1>redirection...</h1>;
  }
}

export default withRouter(Redirection);
