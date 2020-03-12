import React, { PureComponent } from 'react';
import Axios from 'axios';

class ScheduleBox extends PureComponent {
  state = {
    activity: null
  };

  componentWillMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const accessToken = localStorage.getItem('accessToken');
    Axios.get(`http://13.209.68.218/activity?year=${year}&month=${month}&day=${day}`, { headers: { accessToken } })
      .then(res => {
        const { work } = res.data.activity;
        this.setState({ activity: work });
      }).catch(err => {
        if (err.status === 403 || err.status === 401) {
          return this.props.history.push('/signin');
        }
        console.error(err);
      })
  }

  onChange = (e) => {
    this.props.setNow(e.target.value, () => {
        const now = this.props.now.split('-');
        const year = now[0];
        const month = now[1];
        const day = now[2];
        const accessToken = localStorage.getItem('accessToken');
        Axios.get(`http://13.209.68.218/activity?year=${year}&month=${month}&day=${day}`, { headers: { accessToken } })
          .then(res => {
            const { work } = res.data.activity;
            this.setState({ activity: work });
          }).catch(err => {
            if (err.status === 403 || err.status === 401) {
              return this.props.history.push('/signin');
            }
            console.error(err);
          })
    });
  }

  render() {
    const { activity } = this.state;
    const { now, version } = this.props;
    return (
      <div id={version === 1 ? "schedule-box" : "schedule-box-2"}>
        <p id={version === 1 ? "schedule-text" : "schedule-text-2"}>날짜</p>
        <input onChange={this.onChange} type="date" id={version === 1 ? "schedule-date" : "schedule-date-2"} min="2020-01-01" max="2021-02-28" value={now} />
        <p id={version === 1 ? "schedule-event" : "schedule-event-2"}>{activity === 0 ? '월방' : activity === 1 ? '화방' : activity === 2 ? '자습' : activity === 3 ? '전공동아리' : ''}</p>
      </div>
    )
  }
}

export default ScheduleBox;