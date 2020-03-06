import React, { PureComponent } from 'react'
import TeacherSelectDiv from './TeacherSelectDiv';
import Axios from 'axios';
import { withRouter } from 'react-router-dom'

class TeacherSelect extends PureComponent {
  state = {
    f2: null,
    f3: null,
    f4: null
  };
  onChange = (e) => {
    this.props.setDate(e.target.value);
    const date = e.target.value.split('-');
    const year = date[0]
    const month = date[1]
    const day = date[2];
    const accessToken = localStorage.getItem('accessToken');
    Axios.get(`http://13.209.68.218/teachers/specific?year=${year}&month=${month}&day=${day}`, { headers: { accessToken } })
    .then(res => {
      const { f2, f3, f4 } = res.data.teachers;
      this.setState({ f2, f3, f4 });
    }).catch(err => {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    })
  }

  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    Axios.get(`http://13.209.68.218/teachers/specific?year=${year}&month=${month}&day=${day}`, { headers: { accessToken } })
    .then(res => {
      const { f2, f3, f4 } = res.data.teachers;
      this.setState({ f2, f3, f4 });
    }).catch(err => {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    })
  }

  render() {
    const { version, date, setSelected, selected } = this.props;
    const { f2, f3, f4 } = this.state;
    return (
      <>
        {f2 && f3 && f4 ? 
        <div id={`teacher-select-${version}`}>
          <p id={`teacher-text-${version}`}>날짜</p>
          <input onChange={this.onChange} type="date" name="" id={`teacher-date-${version}`} min="2020-01-01" max="2021-02-28" value={date} />
          <div id={`teacher-select-${version}-div`}>
            <TeacherSelectDiv version={version} floor={2} setSelected={setSelected} teacher={f2} selected={selected} />
            <TeacherSelectDiv version={version} floor={3} setSelected={setSelected} teacher={f3} selected={selected} />
            <TeacherSelectDiv version={version} floor={4} setSelected={setSelected} teacher={f4} selected={selected} />
          </div>
        </div> : null}
        
      </>
    )
  }
}

export default withRouter(TeacherSelect);