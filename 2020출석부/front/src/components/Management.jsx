import React, { PureComponent } from 'react'
import Axios from 'axios';
import styleGod, { DEFAULT, MANAGEMENT } from '../js/styleGod';
import dateArranger, { get } from '../js/dateArranger';
import AfterSchoolExchange from './AfterSchoolExchange';
import AfterSchoolModify from './AfterSchoolModify';
import ManagerModify from './ManagerModify';
import ManagerExchange from './ManagerExchange';

class Management extends PureComponent {
  state = {
    afterSchoolModify: true,
    managerModify: true
  };
  
  componentDidMount() {
    styleGod(document, DEFAULT, MANAGEMENT);
  }

  sCB_Click = () => {
    this.setState((prev) => {
      return {
        afterSchoolModify: !prev.afterSchoolModify
      }
    });
  }

  tCB_Click = () => {
    this.setState((prev) => {
      return {
        managerModify: !prev.managerModify
      }
    });
  }

  render() {
    const { afterSchoolModify, managerModify } = this.state;
    return (
      <>
        <section>
          <div id="schedule">
            <div id="schedule-header">일정</div>
            <hr id="schedule-hr" />
            <input onClick={this.sCB_Click} type="button" value={afterSchoolModify ? '교체모드' : '수정모드'} id="schedule-change-mode" className={`manage-change-button`} />
            {afterSchoolModify ? <AfterSchoolModify /> : <AfterSchoolExchange />}
          </div>
          <div id="teacher">
            <div id="teacher-header">선생님</div>
            <hr id="teacher-hr" />
            <input onClick={this.tCB_Click} type="button" value="교체모드" id="teacher-change-mode" className="manage-change-button" />
            {managerModify ? <ManagerModify /> : <ManagerExchange />}
          </div>
        </section>
      </>
    )
  }
}

export default Management;