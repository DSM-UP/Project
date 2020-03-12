import React, { PureComponent } from 'react'
import makeCalendar from '../js/calendar';
import styleGod, { DEFAULT, MAIN, CALENDAR } from '../js/styleGod';
import { withRouter } from 'react-router-dom'
import Axios from 'axios';

class Calendar extends PureComponent {
  calendar;

  onCalendar = (c) => {
    this.calendar = c;
  }

  componentDidMount() {
    styleGod(document, DEFAULT, MAIN, CALENDAR);
    makeCalendar(this.calendar, (day, date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const d = date.getDate();
      const accessToken = localStorage.getItem('accessToken');
      Axios.get(`http://13.209.68.218/teachers/specific?year=${year}&month=${month}&day=${d}`, { accessToken })
      .then(res => {
        const { f2, f3, f4 } = res.data.teachers;
        day.set_teacher(f2, f3, f4);
      }).catch(err => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push('/signin');
        }
        console.error(err);
      });
      Axios.get(`http://13.209.68.218/activity?year=${year}&month=${month}&day=${d}`, { accessToken })
      .then(res => {
        const { work } = res.data.activity;
        day.set_schedule(work === 0 ? '월요일방과후' : work === 1 ? '화요일방과후' : work === 2 ? '자습' : work === 3 ? '전공동아리' : 'Invalid');
      }).catch(err => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push('/signin');
        }
        console.error(err);
      })
    })
  }

  onClick = () => {
    this.props.history.push('/attendance');
  }

  render() {
    return (
      <>
        <section>
          <div ref={this.onCalendar} className="calendar"></div>
          <input onClick={this.onClick} type="button" value="출석체크" id="checkbutton" />
        </section>
      </>
    )
  }
}

export default withRouter(Calendar);