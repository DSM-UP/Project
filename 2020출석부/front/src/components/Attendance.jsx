import React, { PureComponent } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import AttendanceSelect from './AttendanceSelect';
import ClubAttendancePage from './ClubAttendancePage'
import ClassAttendancePage from './ClassAttendancePage'

class Attendance extends PureComponent {
  render() {
    return (
      <>
        <Router>
          <div>
            <Switch>
              <Route exact path="/attendance" render={() => <AttendanceSelect history={this.props.history} />} />
              <Route path="/attendance/club/:floor" render={() => <ClubAttendancePage />} />
              <Route path="/attendance/class/:floor" render={() => <ClassAttendancePage />} />
            </Switch>
          </div>
        </Router>
      </>
    )
  }
}

export default Attendance;