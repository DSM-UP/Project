import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { get } from '../js/dateArranger'
import StatsInformation from './StatsInformation'
import Axios from 'axios'
import StatsAttendanceListDate from './StatsAttendanceListDate'

class DateStats extends PureComponent {
  state = {
    dateValue: get(),
    period: '1',
    page: '0',
    attendances: []
  };

  async componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const { dateValue, period, page } = this.state;
    try {
      const date = dateValue.split('-');
      const res = await Axios.get(`http://13.209.68.218/attendance/date?year=${date[0]}&month=${date[1]}&day=${date[2]}period=${period}&page=${page}`, { headers: { accessToken } });
      const { attendances } = res.data;
      this.setState({ attendances });
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  onChangePeriod = async (e) => {
    const period = e.target.value;
    const accessToken = localStorage.getItem('accessToken');
    const { dateValue } = this.state;
    try {
      const date = dateValue.split('-');
      const res = await Axios.get(`http://13.209.68.218/attendance/date?year=${date[0]}&month=${date[1]}&day=${date[2]}&period=${e.target.value}&page=0`, { headers: { accessToken } });
      const { attendances } = res.data;
      this.setState({ attendances, page: '0', period });
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  onChangeDate = async (e) => {
    const dateValue = e.target.value;
    const accessToken = localStorage.getItem('accessToken');
    const { period } = this.state;
    try {
      const date = e.target.value.split('-');
      const res = await Axios.get(`http://13.209.68.218/attendance/date?year=${date[0]}&month=${date[1]}&day=${date[2]}&period=${period}&page=0`, { headers: { accessToken } });
      const { attendances } = res.data;
      this.setState({ attendances, page: '0', dateValue });
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  onClickUp = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const { page, dateValue, period } = this.state;
    if (Number(page) === 0) return;
    try {
      const date = dateValue.split('-');
      const res = await Axios.get(`http://13.209.68.218/attendance/date?year=${date[0]}&month=${date[1]}&day=${date[2]}&period=${period}&page=${page - 1}`, { headers: { accessToken } });
      const { attendances } = res.data;
      this.setState((prev) => {
        return {
          attendances,
          page: prev.page - 1
        }
      });
    } catch(err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  onClickDown = (next) => async () => {
    if (!next) return;
    const accessToken = localStorage.getItem('accessToken');
    const { page, dateValue, period } = this.state;
    try {
      const date = dateValue.split('-');
      const res = await Axios.get(`http://13.209.68.218/attendance/date?year=${date[0]}&month=${date[1]}&day=${date[2]}&period=${period}&page=${page + 1}`, { headers: { accessToken } });
      const { attendances } = res.data;
      this.setState((prev) => {
        return {
          attendances,
          page: prev.page + 1
        }
      });
    } catch(err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  onClick = () => {
    this.props.setDateMode(false);
  }

  render() {
    const { dateValue, period, page, attendances } = this.state;
    let next = false;
    const atts = attendances.filter((v, i) => {
      if (i > 14) {
        next = true;
        return false;
      }
      return true;
    }).slice();
    const attendanceList = atts.map((v, i) => <StatsAttendanceListDate v={v} />)
    return (
      <section>
        <div id="section-wrap">
          <div id="section-select">
            <div id="section-select-info">
              <div id="date-info" className="select-info">
                <p id="start-date-text">날짜</p>
                <input type="date" min="2020-02-02" max="2021-02-28" value={dateValue} onChange={this.onChangeDate} />
                <select value={period} onChange={this.onChangePeriod}>
                  <option value="1">1교시</option>
                  <option value="2">2교시</option>
                  <option value="3">3교시</option>
                  <option value="4">4교시</option>
                  <option value="5">5교시</option>
                  <option value="6">6교시</option>
                  <option value="7">7교시</option>
                  <option value="8">8교시</option>
                  <option value="9">9교시</option>
                  <option value="10">10교시</option>
                </select>
              </div>
              <input onClick={this.onClick} type="button" value="학생별로 보기" id="section-select-button" />
            </div>
          </div>
        </div>
        <StatsInformation atts={atts} mode="student" />
        <ul id="information-chart-date" className="information-chart">
          <li>
            <p className="information-date">학생 정보</p>
            <p className="information-attendance">출석</p>
            <p className="information-reason">사유</p>
          </li>
          {attendanceList}
        </ul>
        <input onClick={this.onClickUp} type="button" id="information-up" className={Number(page) !== 0 ? 'info-up-button-able' : ''} />
        <input onClick={this.onClickDown(next)} type="button" id="information-down" className={next ? 'info-down-button-able' : ''} />
      </section>
    )
  }
}

export default withRouter(DateStats)