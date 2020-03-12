import React, { PureComponent } from 'react'
import { get } from '../js/dateArranger';
import TeacherSelect from './TeacherSelect';
import Axios from 'axios';

class ManagerExchange extends PureComponent {
  state = {
    date1: get(),
    selected1: null,
    floor1: null,
    date2: get(),
    selected2: null,
    floor2: null
  };

  setDate1 = (date1) => {
    this.setState({ date1 });
  }

  setDate2 = (date2) => {
    this.setState({ date2 });
  }

  setSelected1 = (selected1, floor1) => {
    this.setState({ selected1, floor1 });
  }

  setSelected2 = (selected2, floor2) => {
    this.setState({ selected2, floor2 });
  }

  onClick = () => {
    const { date1, selected1, floor1, date2, selected2, floor2 } = this.state;
    if (!selected1 || !selected2) {
      return alert('교체할 선생님을 선택해주세요.');
    }
    const _date1 = date1.split('-');
    const _date2 = date2.split('-');
    const accessToken = localStorage.getItem('accessToken');
    Axios.patch('http://13.209.68.218/teacher-each', { date1: _date1, date2: _date2, selected1, selected2, floor1, floor2 }, { headers: { accessToken } })
    .then(res => {
      this.props.location.reload();
    }).catch(err => {
      if (err.status === 403 || err.status === 401) {
        return this.props.history.push('/signin');
      }
      console.error(err);
    })
  }

  render() {
    const { date1, date2, selected1, selected2 } = this.state;
    return (
      <>
        <TeacherSelect version={2} date={date1} setDate={this.setDate1} setSelected={this.setSelected1} selected={selected1} />
        <TeacherSelect version={3} date={date2} setDate={this.setDate2} setSelected={this.setSelected2} selected={selected2} />
        <input onClick={this.onClick} type="button" value="교체" id="teacher-modify-button" className="manage-modify-button modify-button-mode" />
      </>
    )
  }
}

export default ManagerExchange;