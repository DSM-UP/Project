import React, { PureComponent } from "react";
import RealSignIn from "./RealSignIn";
import FloorDecision from "./FloorDecision";
import Axios from "axios";

class SignIn extends PureComponent {
  state = {
    state: false,
  };

  setStateTrue = () => {
    this.setState({ state: true });
  };

  setStateFalse = () => {
    this.setState({ state: false });
  };

  render() {
    const { state } = this.state;
    return (
      <>
        {!state ? (
          <RealSignIn setStateTrue={this.setStateTrue} />
        ) : (
          <FloorDecision setStateFalse={this.setStateFalse} />
        )}
      </>
    );
  }
}

export default SignIn;
