import React, { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import dateArranger from "../js/dateArranger";
import styleGod, { DEFAULT } from "../js/styleGod";
import Calendar from "./Calendar";
import Management from "./Management";
import Absent from "./Absent";
import Attendance from "./Attendance";
import Stats from "./Stats";

class MainComponent extends PureComponent {
  state = {
    user: null,
  };

  modal;
  modal_overlay;
  messageCloseBtn;
  message_modal;
  message_modal_overlay;
  calendar;

  onDefaultMenuModalRef = (c) => {
    this.modal = c;
  };

  onDefaultModalOverlayRef = (c) => {
    this.modal_overlay = c;
  };

  onMessageCloseBtnRef = (c) => {
    this.messageCloseBtn = c;
  };

  onDefaultMessageModalRef = (c) => {
    this.message_modal = c;
  };

  onDefaultMessageModalOverlayRef = (c) => {
    this.message_modal_overlay = c;
  };

  componentWillMount() {
    Axios.get("http://3.34.125.239/auth/access-check", {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
      .then((res) => {
        this.setState({ user: res.data.user });
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 403) {
          Axios.get("http://3.34.125.239/auth/refresh", {
            headers: { refreshToken: localStorage.getItem("refreshToken") },
          })
            .then((res) => {
              this.setState({ user: res.data.user });
            })
            .catch((err2) => {
              localStorage.clear();
              this.props.history.push("/signin");
            });
        } else {
          localStorage.clear();
          this.props.history.push("/signin");
        }
      });
  }

  componentDidMount() {
    styleGod(document, DEFAULT);
  }

  modalOpen = () => {
    const { modal, modal_overlay } = this;
    modal.classList.remove("default-menu-modal-hide");
    modal.classList.add("default-menu-modal-show");

    modal_overlay.classList.add("default-menu-overlay-show");
    modal_overlay.classList.remove("default-menu-overlay-hide");
  };

  modalClose = () => {
    const { modal, modal_overlay } = this;
    modal.classList.remove("default-menu-modal-show");
    modal.classList.add("default-menu-modal-hide");

    modal_overlay.classList.remove("default-menu-overlay-show");
    modal_overlay.classList.add("default-menu-overlay-hide");
  };

  messageClose = () => {
    const { messageCloseBtn, message_modal, message_modal_overlay } = this;
    messageCloseBtn.classList.add("default-message-close");
    message_modal.classList.add("default-message-close");
    message_modal_overlay.classList.add("default-message-close");
  };

  messageOpen = () => {
    const { messageCloseBtn, message_modal, message_modal_overlay } = this;
    messageCloseBtn.classList.remove("default-message-close");
    message_modal.classList.remove("default-message-close");
    message_modal_overlay.classList.remove("default-message-close");
  };

  onClickLogout = () => {
    localStorage.clear();
    this.props.history.push("/signin");
  };

  render() {
    const { service } = this.props.match.params;
    const { user } = this.state;
    return (
      <>
        {user ? (
          <div id="whole-wrap">
            <header id="default-header">
              <div
                id="default-header-menu-button"
                onClick={this.modalOpen}
              ></div>
              <div id="default-header-text">
                {service === "main"
                  ? "메인 페이지"
                  : service === "management"
                  ? "일정&선생님 교체"
                  : service === "absent"
                  ? "사전 결석 신고"
                  : service === "attendance"
                  ? "출석 페이지"
                  : service === "stats"
                  ? "통계 보기"
                  : "404"}
              </div>
              <div
                onClick={this.messageOpen}
                id="default-header-message-button"
              ></div>
            </header>
            {service === "main" ? (
              <Calendar />
            ) : service === "management" ? (
              <Management user={user} />
            ) : service === "absent" ? (
              <Absent />
            ) : service === "attendance" ? (
              <Attendance history={this.props.history} />
            ) : service === "stats" ? (
              <Stats />
            ) : null}
            <footer id="default-footer">
              <div id="default-footer-left">대덕소프트웨어마이스터고등학교</div>
              <div id="default-footer-right">DMI</div>
            </footer>
            <div
              ref={this.onDefaultMenuModalRef}
              className="default-menu-modal"
            >
              <div id="default-menu-modal-header">
                <p className="teacherName">{user.name} 선생님</p>
                <div onClick={this.modalClose} id="close-modal-button"></div>
              </div>
              <div id="default-menu-modal-section">
                <ul>
                  <li>
                    <Link to="/main">
                      메인 페이지
                      <div
                        className={service === "main" ? "now btn" : "btn"}
                      ></div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/management">일정&선생님 교체</Link>
                    <div
                      className={service === "management" ? "now btn" : "btn"}
                    ></div>
                  </li>
                  <li>
                    <Link to="/absent">사전 결석 신고</Link>
                    <div
                      className={service === "absent" ? "now btn" : "btn"}
                    ></div>
                  </li>
                  <li>
                    <Link to="/stats">통계 보기</Link>
                    <div
                      className={service === "stats" ? "now btn" : "btn"}
                    ></div>
                  </li>
                  <li>
                    <Link to="/attendance">출석 페이지</Link>
                    <div
                      className={service === "attendance" ? "now btn" : "btn"}
                    ></div>
                  </li>
                  <li>
                    <Link to="/">선생님 재선택</Link>
                    <div className="btn"></div>
                  </li>
                  <li onClick={this.onClickLogout}>
                    <Link>로그아웃</Link>
                    <div className="btn"></div>
                  </li>
                </ul>
              </div>
              <div id="default-menu-modal-footer">{dateArranger()}</div>
            </div>
            <div
              onClick={this.modalClose}
              ref={this.onDefaultModalOverlayRef}
              className="default-modal-overlay"
            ></div>
            <div
              ref={this.onDefaultMessageModalRef}
              className="default-message-modal default-message-close"
            >
              <div id="default-message-modal-header">채팅</div>
              <div id="default-message-modal-section"></div>
              <form id="default-message-modal-footer">
                <textarea name="" id="" cols="106" rows="3"></textarea>
                <input type="submit" value="확인" />
              </form>
            </div>
            <div
              onClick={this.messageClose}
              ref={this.onMessageCloseBtnRef}
              id="message-close-button"
              className="default-message-close"
            ></div>
            <div
              onClick={this.messageClose}
              ref={this.onDefaultMessageModalOverlayRef}
              className="default-message-modal-overlay default-message-close"
            ></div>
          </div>
        ) : null}
      </>
    );
  }
}

export default withRouter(MainComponent);
