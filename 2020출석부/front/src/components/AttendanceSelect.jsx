import React, { PureComponent } from "react";
import Axios from "axios";
import styleGod, { DEFAULT, ATTENDANCE_SELECT } from "../js/styleGod";
import { Link, withRouter } from "react-router-dom";

class AttendanceSelect extends PureComponent {
  state = {
    f2: "",
    f3: "",
    f4: "",
    activity: "",
  };
  async componentWillMount() {
    styleGod(document, DEFAULT, ATTENDANCE_SELECT);
    const date = new Date();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await Axios.get(
        `http://3.34.125.239/teachers/specific?year=${date.getFullYear()}&month=${
          date.getMonth() + 1
        }&day=${date.getDate() + 1}`,
        { headers: { accessToken } }
      );
      const { f2, f3, f4 } = res.data.teachers;
      const res2 = await Axios.get(
        `http://3.34.125.239/activity?year=${date.getFullYear()}&month=${
          date.getMonth() + 1
        }&day=${date.getDate() + 1}`,
        {
          headers: { accessToken },
        }
      );
      const { work } = res2.data.activity;
      this.setState({
        f2,
        f3,
        f4,
        activity: work === 2 ? "class" : work === 3 ? "club" : "club",
      });
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push("/signin");
      }
      console.error(err);
    }
  }

  render() {
    const { f2, f3, f4, activity } = this.state;
    return (
      <>
        <section>
          <Link to={`/attendance/${activity}/1`}>
            <div>
              <p>자습실</p>
            </div>
          </Link>
          <Link to={`/attendance/${activity}/2`}>
            <div>
              <p>2층</p>
              <p className="second">{f2}</p>
            </div>
          </Link>
          <Link to={`/attendance/${activity}/3`}>
            <div>
              <p>3층</p>
              <p className="third">{f3}</p>
            </div>
          </Link>
          <Link to={`/attendance/${activity}/4`}>
            <div>
              <p>4층</p>
              <p className="forth">{f4}</p>
            </div>
          </Link>
        </section>
      </>
    );
  }
}

export default withRouter(AttendanceSelect);
