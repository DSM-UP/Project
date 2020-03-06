import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { get } from '../js/dateArranger'
import Axios from 'axios'
import styleGod, { DEFAULT, STATS } from '../js/styleGod'
import StudentStats from './StudentStats'
import DateStats from './DateStats'

class Stats extends PureComponent {
  state = {
    dateMode: false
  };
  componentWillMount() {
    styleGod(document, DEFAULT, STATS);
  }

  setDateMode = (mode) => {
    this.setState({ dateMode: mode });
  }

  render() {
    const { dateMode } = this.state;
    return (
      <>
        {dateMode ? <DateStats setDateMode={this.setDateMode} /> : <StudentStats setDateMode={this.setDateMode} />}
      </>
    )
  }
}

export default withRouter(Stats)