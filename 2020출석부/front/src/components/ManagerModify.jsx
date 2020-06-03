import React, { PureComponent } from "react";
import { get } from "../js/dateArranger";
import Axios from "axios";
import FloorTeacher from "./FloorTeacher";
import { withRouter } from "react-router-dom";

class ManagerModify extends PureComponent {
  state = {
    now: get(),
    f2: null,
    f3: null,
    f4: null,
    teachers: [],
  };

  onChange = (e) => {
    this.setState({ now: e.target.value });
    const accessToken = localStorage.getItem("accessToken");
    const _date = e.target.value;
    const date = _date.split("-");
    Axios.get(
      `http://3.34.125.239/teachers/specific?year=${date[0]}&month=${
        date[1]
      }&day=${Number(date[2]) + 1}`,
      { headers: { accessToken } }
    )
      .then((res) => {
        const { f2, f3, f4 } = res.data.teachers;
        this.setState({ f2, f3, f4 });
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push("/signin");
        }
        console.error(err);
      });
  };

  componentWillMount() {
    const accessToken = localStorage.getItem("accessToken");
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    Axios.get("http://3.34.125.239/teachers", { headers: { accessToken } })
      .then((res) => {
        this.setState({ teachers: res.data.teachers });
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push("/signin");
        }
        console.error(err);
      });
    Axios.get(
      `http://3.34.125.239/teachers/specific?year=${year}&month=${month}&day=${
        day + 1
      }`,
      { headers: { accessToken } }
    )
      .then((res) => {
        const { f2, f3, f4 } = res.data.teachers;
        this.setState({ f2, f3, f4 });
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push("/signin");
        }
        console.error(err);
      });
  }

  setSelected = (selected, floor) => {
    if (floor === 2) {
      this.setState({ f2: selected });
    } else if (floor === 3) {
      this.setState({ f3: selected });
    } else if (floor === 4) {
      this.setState({ f4: selected });
    }
  };

  onClick = () => {
    const { now, f2, f3, f4 } = this.state;
    const date = now.split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2];
    const accessToken = localStorage.getItem("accessToken");
    Axios.patch(
      `http://3.34.125.239/teachers?year=${year}&month=${month}&day=${day}`,
      { f2, f3, f4 },
      { headers: { accessToken } }
    )
      .then((res) => {
        this.props.location.reload();
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push("/signin");
        }
        console.error(err);
      });
  };

  render() {
    const { now, f2, f3, f4, teachers } = this.state;
    return (
      <>
        <div id="teacher-box">
          <p id="teacher-text">날짜</p>
          <input
            onChange={this.onChange}
            type="date"
            id="teacher-date"
            min="2020-01-01"
            max="2021-02-28"
            value={now}
          />
        </div>
        <div id="teacher-select">
          <FloorTeacher
            floor={2}
            selected={f2}
            teachers={teachers}
            setSelected={this.setSelected}
          />
          <FloorTeacher
            floor={3}
            selected={f3}
            teachers={teachers}
            setSelected={this.setSelected}
          />
          <FloorTeacher
            floor={4}
            selected={f4}
            teachers={teachers}
            setSelected={this.setSelected}
          />
        </div>
        <input
          onClick={this.onClick}
          type="button"
          value="수정"
          id="teacher-modify-button"
          className="manage-modify-button"
        />
      </>
    );
  }
}

export default withRouter(ManagerModify);
