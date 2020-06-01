import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Index from './Components/Index/Index';
import SetTeacher from './Components/Teacher/SetTeacher';
import { createGlobalStyle } from 'styled-components';
import Main from './Components/Main/Main';
import Chagne from './Components/Change/Change';
import Team from './Components/Team/Team';
import Lost from './Components/Lost/Lost';
import ViewLost from './Components/ViewLost/ViewLost';
import Attendance from './Components/Attendance/Attendance';
import AttendanceItem from './Components/Attendance/AttendanceItem';

const Global = createGlobalStyle`
  body {
    margin:0;
    padding:0;
    /* max-height:100vh;
    overflow:hidden; */
  }
  ::-webkit-scrollbar {
    display:none;
  }
`;

const App = () => {
  const [type,setType] = useState(null);
  const [accessToken,setAccessToken] = useState(null);
  const [teacherData,setTeacherData] = useState(null);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setType("TV");
  },[]);

  console.log("App 랜더링");

  return (
    <Router>
      <Global/>
      <Route exact path="/" render={({history}) => <Index type={type} history={history} />} />
      <Route exact path="/teacher" render={() => <SetTeacher />} />
      <Route exact path="/main" render={() => <Main />} />
      <Route exact path="/change" render={() => <Chagne />} />
      <Route exact path="/team" render={() => <Team />} />
      <Route exact path="/lost" render={() => <Lost />} />
      <Route exact path="/viewlost" render={() => <ViewLost />} />
      <Route exact path="/avg" render={() => <ViewLost type="all" />} />
      <Route exact path="/attendance" render={() => <Attendance/>} />
      <Route exact path="/attendance/:floor" render={(props) => <AttendanceItem floor={props.match.params.floor} />} />
    </Router>
  );
}

export default App;
