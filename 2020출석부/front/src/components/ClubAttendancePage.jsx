import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';
import hourCalculator from '../js/hourCalculator'
import AttendanceList from './AttendanceList'
import styleGod, { DEFAULT, ATTENDANCE_PAGE } from '../js/styleGod'

class ClubAttendancePage extends PureComponent {
  state = {
    selectedClub: null,
    clubs: [],
    period: hourCalculator(),
    attendanceList: [],
    unsaved: []
  };

  async componentWillMount() {
    styleGod(document, DEFAULT, ATTENDANCE_PAGE);
    const { floor } = this.props.match.params;
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await Axios.get(`http://13.209.68.218/club/${floor}`, { headers: { accessToken } });
      const { clubs } = res.data;
      await this.setState({ clubs, selectedClub: clubs[0].id });
      const { selectedClub, period } = this.state;
      const res2 = await Axios.get(`http://13.209.68.218/attendance/club/${selectedClub}?period=${period}`, { headers: { accessToken } });
      const { attendances } = res2.data;
      this.setState({ attendanceList: attendances });
    } catch (e) {
      console.error(e);
    }
  }

  onClick = (id) => () => {
    const { period } = this.state;
    const accessToken = localStorage.getItem('accessToken');
    Axios.get(`http://13.209.68.218/attendance/club/${id}?period=${period}`, { headers: { accessToken } })
      .then(res => {
        const { attendances } = res.data;
        this.setState({ attendanceList: attendances, selectedClub: id });
      }).catch(err => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push('/signin');
        }
        console.error(err);
      })
  }

  onClickPeriod = (period) => async () => {
    const { selectedClub } = this.state;
    try {
      const accessToken = localStorage.getItem('accessToken');
      const res = await Axios.get(`http://13.209.68.218/attendance/club/${selectedClub}?period=${period}`, { headers: { accessToken } });
      const { attendances } = res.data;
      this.setState({ attendanceList: attendances, period });
    } catch(err) {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  onNotFriday = () => {
    alert('오늘은 7교시가 없습니다.');
  }

  setUnsavedList = (info) => {
    const { unsaved } = this.state;
    let idx;
    let check = unsaved.filter((v, i) => {
      if (v.id === info.id) {
        idx = i;
        return true;
      }
      return false;
    });
    if (check.length) {
      let copy = unsaved.slice();
      copy[idx].status = info.status;
      copy[idx].reason = info.reason;
      this.setState({ unsaved: copy });
    } else {
      this.setState((prev) => {
        return {
          unsaved: [...prev.unsaved, info]
        }
      });
    }
  }

  removeUnsavedList = (id) => {
    const { unsaved } = this.state;
    let idx;
    unsaved.filter((v, i) => {
      if (v.id === id) {
        idx = i;
        return true;
      }
      return false;
    });
    let newList = unsaved.slice();
    newList.splice(idx, 1);
    this.setState({ unsaved: newList });
  }

  onClickSubmit = async () => {
    const { unsaved } = this.state;
    try {
      const accessToken = localStorage.getItem('accessToken');
      await Axios.patch('http://13.209.68.218/attendance', { unsaved }, { headers: { accessToken } });
    } catch(err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  render() {
    const { selectedClub, clubs, period, attendanceList, unsaved } = this.state;
    const date = new Date();
    const attendances = attendanceList.map((v, i) => <AttendanceList v={v} i={i} setUnsavedList={this.setUnsavedList} removeUnsavedList={this.removeUnsavedList} />);
    return (
      <section>
        <div id="class-select-bar">
          <ul>
            <li><input onClick={date.getDate() !== 5 ? this.onNotFriday : this.onClickPeriod(7)} type="button" value="7교시" id="class-7" className={date.getDay() !== 5 ? 'before-class' : period === 7 ? 'now-class' : ''} /></li>
            <li><input onClick={this.onClickPeriod(8)} type="button" value="8교시" id="class-8" className={period === 8 ? 'now-class' : ''} /></li>
            <li><input onClick={this.onClickPeriod(9)} type="button" value="9교시" id="class-9" className={period === 9 ? 'now-class' : ''} /></li>
            <li><input onClick={this.onClickPeriod(10)} type="button" value="10교시" id="class-10" className={period === 10 ? 'now-class' : ''} /></li>
          </ul>
        </div>
        <div id="left-club-bar">
          <ul>
            {
              clubs.map((v, i) => {
                return (
                  <li onClick={this.onClick(v.id)} className={v.id === selectedClub ? 'club-li-now' : ''}><div className={`${v.id === selectedClub ? 'club-a-now' : ''}`}>{v.name}</div></li>
                )
              })
            }
          </ul>
        </div>
        <div id="club-student-sum">
          <p id="attendance-sum">{attendanceList.filter(v => v.status === 0).length}</p>
          <p>/</p>
          <p id="club-sum">{attendanceList.length}</p>
          <p>출석</p>
        </div>
        <ul id="club-information">
          <li>
            <p className="number">번호</p>
            <p className="name">이름</p>
            <p className="attendance">출석현황</p>
            <p className="reason">사유</p>
          </li>
          {attendances}
        </ul>
        {
          unsaved.length ? <input onClick={this.onClickSubmit} type="submit" value="저장" id="attendance-save-button" /> : null
        }        
      </section>
    )
  }
}

export default withRouter(ClubAttendancePage);