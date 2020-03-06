import React, { PureComponent } from 'react'
import { get } from '../js/dateArranger';
import Axios from 'axios';
import { encodeDate } from '../js/encodeDate';
import styleGod, { DEFAULT, ABSENT } from '../js/styleGod';
import { withRouter } from 'react-router-dom'

class Abesent extends PureComponent {
  state = {
    startDate: null,
    endDate: null,
    startClass: '1',
    endClass: '1',
    selectedGrade: '1',
    selectedClass: '1',
    selectedStudent: null,
    students: [],
    selectedPurpose: null,
    reason: '',
  }; 

  componentWillMount() {
    const accessToken = localStorage.getItem('accessToken');
    Axios.get(`http://13.209.68.218/student?grade=1&classs=1`, { headers: { accessToken } })
    .then(res => {
      this.setState({ students: res.data.students, selectedStudent: `${res.data.students[0].id} ${res.data.students[0].name}` });
    }).catch(err => {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    });
    styleGod(document, DEFAULT, ABSENT);
  }

  onChangeStart = (e) => { this.setState({ startDate: e.target.value }); }
  onChangeEnd = (e) => { this.setState({ endDate: e.target.value }); }
  onChangeStartClass = (e) => { this.setState({ startClass: e.target.value }); }
  onChangeEndClass = (e) => { this.setState({ endClass: e.target.value }); }
  onChangeGrade = (e) => { 
    this.setState({ selectedGrade: e.target.value });
    const { selectedClass } = this.state;
    const accessToken = localStorage.getItem('accessToken');
    Axios.get(`http://13.209.68.218/student?grade=${e.target.value}&classs=${selectedClass}`, { headers: { accessToken } })
    .then(res => {
      this.setState({ students: res.data.students, selectedStudent: `${res.data.students[0].id} ${res.data.students[0].name}` });
    }).catch(err => {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    })
  }
  onChangeClass = (e) => { 
    this.setState({ selectedClass: e.target.value });
    const { selectedGrade } = this.state;
    const accessToken = localStorage.getItem('accessToken');
    Axios.get(`http://13.209.68.218/student?grade=${selectedGrade}&classs=${e.target.value}`, { headers: { accessToken } })
    .then(res => {
      this.setState({ students: res.data.students, selectedStudent: `${res.data.students[0].id} ${res.data.students[0].name}` });
    }).catch(err => {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    })
  }
  onChangeStudent = (e) => { this.setState({ selectedStudent: e.target.value }); }

  onClick = (e) => {
    this.setState({ selectedPurpose: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { endClass, startClass, selectedStudent, reason, selectedPurpose, startDate, endDate } = this.state;
    const studentId = selectedStudent.split(' ')[0];
    const start = startDate.split('-');
    const end = endDate.split('-');
    console.log(selectedStudent);
    let from = encodeDate(Number(start[0]) - 2000, Number(start[1]), Number(start[2]), Number(startClass));
    let to = encodeDate(Number(end[0]) - 2000, Number(end[1]), Number(end[2]), Number(endClass));
    const purpose = selectedPurpose === '현체' ? 1 : selectedPurpose === '외출' ? 2 : selectedPurpose === '공결' ? 3 : null;
    const accessToken = localStorage.getItem('accessToken');
    Axios.post(`http://13.209.68.218/absence/${studentId}`, { reason, purpose, from, to }, { headers: { accessToken } })
    .then(res => {
      this.props.history.push('/main')
    }).catch(err => {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    });
  }

  onChangeReason = (e) => {
    this.setState({ reason: e.target.value });
  }

  render() {
    const { reason, selectedPurpose, startDate, endDate, startClass, endClass, selectedGrade, selectedClass, selectedStudent, students } = this.state;
    return (
      <>
        <section>
          <div id="start-date">
            <p id="start-date-text">시작 날짜</p>
            <input onChange={this.onChangeStart} type="date" name="" id="" min="2020-02-02" max="2021-02-28" value={startDate} />
            <select onChange={this.onChangeStartClass} value={startClass} name="" id="">
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
          <div id="end-date">
            <p id="end-date-text">도착 날짜</p>
            <input onChange={this.onChangeEnd} type="date" name="" id="" min="2020-02-02" max="2021-02-28" value={endDate} />
            <select onChange={this.onChangeEndClass} value={endClass} name="" id="">
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
          <div id="student-info">
            <p id="student-info-text">학생 인적사항</p>
            <select onChange={this.onChangeGrade} value={selectedGrade} name="" id="">
              <option value="1">1학년</option>
              <option value="2">2학년</option>
              <option value="3">3학년</option>
            </select>
            <select onChange={this.onChangeClass} value={selectedClass} name="" id="">
              <option value="1">1반</option>
              <option value="2">2반</option>
              <option value="3">3반</option>
              <option value="4">4반</option>
            </select>
            <select onChange={this.onChangeStudent} value={selectedStudent} name="" id="">
              {
                students.map((v, i) => {
                  return (
                    <option value={`${v.id} ${v.name}`}>{`${v.number} ${v.name}`}</option>
                  )
                })
              }
            </select>
          </div>
          <form id="absent-form" onSubmit={this.onSubmit}>
            <div id="absent-form-purpose">
              <p id="absent-form-purpose-text">목적</p>
              <input className={selectedPurpose === '현체' ? 'select' : null} onClick={this.onClick} type="button" value="현체" id="experience-button"/>
              <input className={selectedPurpose === '외출' ? 'select' : null} onClick={this.onClick} type="button" value="외출" id="outing-button"/>
              <input className={selectedPurpose === '공결' ? 'select' : null} onClick={this.onClick} type="button" value="공결" id="absent-button"/>
            </div>
            <label htmlFor="absent-form-purpose-reason" id="absent-form-reason-label">비고(사유)</label>
            <input onChange={this.onChangeReason} value={reason} type="text" id="absent-form-purpose-reason" placeholder="없음" />
            <input type="submit" id="absent-submit" value="신고" />
          </form>
        </section>
      </>
    )
  }
}

export default withRouter(Abesent);