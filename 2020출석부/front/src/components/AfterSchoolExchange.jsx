import React, { PureComponent } from "react";
import { get } from "../js/dateArranger";
import ScheduleBox from "./ScheduleBox";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class AfterSchoolExchange extends PureComponent {
  state = {
    now1: get(),
    now2: get(),
  };

  onClick = () => {
    const { now1, now2 } = this.state;
    const date1 = now1.split("-");
    const date2 = now2.split("-");
    const accessToken = localStorage.getItem("accessToken");
    Axios.patch(
      "http://3.34.125.239/activity-each",
      { date1, date2 },
      { headers: { accessToken } }
    )
      .then((res) => {
        this.props.history.push("/main");
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push("/signin");
        }
        console.error(err);
      });
  };
  setNow1 = (now1, callback) => {
    this.setState({ now1 });
    setTimeout(() => callback(), 0);
  };
  setNow2 = (now2, callback) => {
    this.setState({ now2 });
    setTimeout(() => callback(), 0);
  };
  render() {
    const { now1, now2 } = this.state;
    return (
      <>
        <ScheduleBox version={1} now={now1} setNow={this.setNow1} />
        <ScheduleBox version={2} now={now2} setNow={this.setNow2} />
        <input
          onClick={this.onClick}
          type="button"
          value="교체"
          id="schedule-change-mode"
          className="manage-modify-button showSecondBox"
        />
      </>
    );
  }
}

export default withRouter(AfterSchoolExchange);
