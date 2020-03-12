import React, { PureComponent } from 'react'
import Axios from 'axios'
import StudentList from './StudentList'
import StatsAttendanceList from './StatsAttendanceList'
import StatsInformation from './StatsInformation'
import { withRouter } from 'react-router-dom'

class StudentStats extends PureComponent {
  state = {
    gradeValue: '1',
    classValue: '1',
    studentId: '1',
    students: [],
    page: '0',
    attendances: []
  };

  onChangeGrade = async (e) => {
    const gradeValue = e.target.value;
    const accessToken = localStorage.getItem('accessToken');
    const { classValue } = this.state;
    try {
      const res = await Axios.get(`http://13.209.68.218/student?grade=${gradeValue}&classs=${classValue}`, { headers: { accessToken } });
      const { students } = res.data;
      const res2 = await Axios.get(`http://13.209.68.218/attendance/student/${students[0].id}?page=0`, { headers: { accessToken } });
      const { attendances } = res2.data;
      this.setState({ students, attendances, studentId: students[0].id, gradeValue, page: '0' });
    } catch (err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  onChangeClass = async (e) => {
    const classValue = e.target.value;
    const accessToken = localStorage.getItem('accessToken');
    const { gradeValue } = this.state;
    try {
      const res = await Axios.get(`http://13.209.68.218/student?grade=${gradeValue}&classs=${e.target.value}`, { headers: { accessToken } });
      const { students } = res.data;
      const res2 = await Axios.get(`http://13.209.68.218/attendance/student/${students[0].id}?page=0`, { headers: { accessToken } });
      const { attendances } = res2.data;
      this.setState({ students, attendances, studentId: students[0].id, classValue, page: '0' });
    } catch (err) {
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
    const { studentId, page } = this.state;
    try {
      const res = await Axios.get(`http://13.209.68.218/attendance/student/${studentId}?page=${page + 1}`, { headers: { accessToken } });
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

  onClickUp = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const { page, studentId } = this.state;
    if (Number(page) === 0) return;
    try {
      const res = await Axios.get(`http://13.209.68.218/attendance/student/${studentId}?page=${page - 1}`, { headers: { accessToken } });
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

  onClickButton = () => {
    this.props.setDateMode(true);
  }

  clickStudent = async (id) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await Axios.get(`http://13.209.68.218/attendance/student/${id}?page=0`, { headers: { accessToken } });
      const { attendances } = res.data;
      this.setState({ attendances, studentId: id, page: '0' });
    } catch(err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  async componentWillMount() {
    const { gradeValue, classValue, studentId, page } = this.state;
    const accessToken = localStorage.getItem('accessToken');
    try {
      const res = await Axios.get(`http://13.209.68.218/student?grade=${gradeValue}&classs=${classValue}`, { headers: { accessToken } });
      const { students } = res.data;
      const res2 = await Axios.get(`http://13.209.68.218/attendance/student/${studentId}?page=${page}`, { headers: { accessToken } });
      const { attendances } = res2.data;
      this.setState({ students, attendances });
    } catch(err) {
      if (err.status === 403 || err.status === 401) {
        localStorage.clear();
        return this.props.history.push('/signin');
      }
      console.error(err);
    }
  }

  render() {
    const { gradeValue, classValue, students, studentId, attendances, page } = this.state;
    const studentList = students.map((v, i) => <StudentList clickStudent={this.clickStudent} v={v} studentId={studentId} />)
    let next = false;
    const atts = attendances.filter((v, i) => {
      if (i > 14) {
        next = true;
        return false;
      }
      return true;
    }).slice();
    const attendanceList = atts.map((v, i) => <StatsAttendanceList v={v} />)
    return (
      <section>
        <div id="section-wrap">
          <div id="section-select">
            <div id="section-select-info">
              <div id="student-info" className="select-info">
                <p id="student-info-text">학생 인적사항</p>
                <select value={gradeValue} onChange={this.onChangeGrade}>
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                </select>
                <select value={classValue} onChange={this.onChangeClass}>
                  <option value="1">1반</option>
                  <option value="2">2반</option>
                  <option value="3">3반</option>
                  <option value="4">4반</option>
                </select>
              </div>
              <input onClick={this.onClickButton} type="button" value="날짜별로 보기" id="section-select-button" />
            </div>
          </div>
          <div id="section-student-space">
            {studentList}
          </div>
        </div>
        <StatsInformation atts={atts} mode="date" />
        <ul id="information-chart-student" className="information-chart">
          <li>
            <p className="information-date">날짜</p>
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

export default withRouter(StudentStats)