import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import styleGod, { DEFAULT, SELECT_PAGE } from "../js/styleGod";

class FloorDecision extends PureComponent {
  state = {
    f2: "",
    f3: "",
    f4: "",
  };

  componentWillMount() {}

  componentDidMount() {
    styleGod(document, DEFAULT, SELECT_PAGE);
    const date = new Date();
    const beforeToken = localStorage.getItem("beforeToken");
    console.log(`hello ${beforeToken}`);
    Axios.get(
      `http://3.34.125.239/attendance/teachers?year=${date.getFullYear()}&month=${
        date.getMonth() + 1
      }&day=${date.getDate() + 1}`,
      { headers: { beforeToken } }
    )
      .then((res) => {
        console.log(res);
        const { f2, f3, f4 } = res.data.teachers;
        return this.setState({ f2, f3, f4 });
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        this.props.setStateFalse();
      });
  }

  onClick2 = () => {
    const { f2 } = this.state;
    const beforeToken = localStorage.getItem("beforeToken");
    Axios.post(
      "http://3.34.125.239/auth/floor-decision",
      { floor: 2, name: f2 },
      { headers: { beforeToken } }
    )
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        localStorage.removeItem("beforeToken");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        this.props.history.push("/main");
      })
      .catch((err) => {
        localStorage.clear();
        this.props.setStateFalse();
      });
  };

  onClick3 = () => {
    const { f3 } = this.state;
    const beforeToken = localStorage.getItem("beforeToken");
    Axios.post(
      "http://3.34.125.239/auth/floor-decision",
      { floor: 3, name: f3 },
      { headers: { beforeToken } }
    )
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        localStorage.removeItem("beforeToken");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        this.props.history.push("/main");
      })
      .catch((err) => {
        localStorage.clear();
        this.props.setStateFalse();
      });
  };

  onClick4 = () => {
    const { f4 } = this.state;
    const beforeToken = localStorage.getItem("beforeToken");
    Axios.post(
      "http://3.34.125.239/auth/floor-decision",
      { floor: 4, name: f4 },
      { headers: { beforeToken } }
    )
      .then((res) => {
        const { accessToken, refreshToken } = res.data;
        localStorage.removeItem("beforeToken");
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        this.props.history.push("/main");
      })
      .catch((err) => {
        localStorage.clear();
        this.props.setStateFalse();
      });
  };

  render() {
    const { f2, f3, f4 } = this.state;
    return (
      <>
        <div id="whole-wrap">
          <header>몇 층 담당이신가요?</header>
          <section>
            <div onClick={this.onClick2}>
              <p>2층</p>
              <p className="second">{f2}</p>
            </div>
            <div onClick={this.onClick3}>
              <p>3층</p>
              <p className="third">{f3}</p>
            </div>
            <div onClick={this.onClick4}>
              <p>4층</p>
              <p className="forth">{f4}</p>
            </div>
          </section>
          <footer id="default-footer">
            <div id="default-footer-left">대덕소프트웨어마이스터고등학교</div>
            <div id="default-footer-right">DMI</div>
          </footer>
        </div>
      </>
    );
  }
}

export default withRouter(FloorDecision);
