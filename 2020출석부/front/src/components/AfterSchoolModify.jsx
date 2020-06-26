import React, { PureComponent } from "react";
import { get } from "../js/dateArranger";
import Schedulebox from "./ScheduleBox";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class AfterSchoolModify extends PureComponent {
  state = {
    selected: null,
    now: get(),
  };
  dBM = () => {
    this.setState({ selected: 0 });
  };

  dBT = () => {
    this.setState({ selected: 1 });
  };

  dBE = () => {
    this.setState({ selected: 2 });
  };

  dBC = () => {
    this.setState({ selected: 3 });
  };

  onClick = () => {
    const { selected, now } = this.state;
    if (selected === null) {
      return alert("선택한 후 수정을 눌러주세요.");
    }
    const date = now.split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2];
    const accessToken = localStorage.getItem("accessToken");
    Axios.patch(
      `http://3.34.125.239/activity?year=${year}&month=${month}&day=${day}`,
      { activity: selected },
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

  setNow = (now, callback) => {
    this.setState({ now });
    setTimeout(() => callback(), 0);
  };
  render() {
    const { selected } = this.state;
    return (
      <>
        <Schedulebox version={1} now={this.state.now} setNow={this.setNow} />
        <input
          onClick={this.dBM}
          type="button"
          value="월요일 방과후"
          className={`date-button${selected === 0 ? " select" : ""}`}
          id="date-button-mon"
        />
        <input
          onClick={this.dBT}
          type="button"
          value="화요일 방과후"
          className={`date-button${selected === 1 ? " select" : ""}`}
          id="date-button-tue"
        />
        <input
          onClick={this.dBC}
          type="button"
          value="전공동아리"
          className={`date-button${selected === 3 ? " select" : ""}`}
          id="date-button-club"
        />
        <input
          onClick={this.dBE}
          type="button"
          value="자습(기타)"
          className={`date-button${selected === 2 ? " select" : ""}`}
          id="date-button-etc"
        />
        <input
          onClick={this.onClick}
          type="button"
          value="수정"
          id="schedule-modify-button"
          className="manage-modify-button"
        />
      </>
    );
  }
}

export default withRouter(AfterSchoolModify);
