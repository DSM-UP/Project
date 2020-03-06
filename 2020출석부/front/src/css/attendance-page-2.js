export default `section {
  height: 100%;
}
#left-club-bar {
  width: 350px;
  height: 80%;
  margin-top: 10%;
  background: #1e90ff;
  display: inline-block;
}

#left-club-bar > ul > li {
  width: 100%;
  height: 80px;
  padding: 29px 0px 10px 20px;
  position: relative;
}

#left-club-bar > ul > li > a{
  width: 100%;
  height: 100%;
  color: white;
  font-size: 42px;
  font-weight: bold;
  display: inline-block;
  position: relative;
}

.club-btn {
  border: 12px solid white;
  width: 0;
  height: 0;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  right: 40px;
  margin-top: 15px;
}

.club-li-now {
  background: white !important;
}

.club-a-now {
  color: black !important;
}

.btn-now {
  border: 12px solid black !important;
}

#club-information {
  display: inline-block;
  width: 65%;
  left: 30%;
  top: 13%;
  position: absolute;
}

#club-information > li {
  height: 60px;
  position: relative;
}

#club-information > li > p:nth-child(1) {
  width: 90px;
}

#club-information > li > p:nth-child(2) {
  width: 150px;
}

#club-information > li > p:nth-child(3) {
  width: 142px;
}

#club-information > li > select {
  width: 150px;
  height: 51px;
  display: inline-block;
  padding-left: 30px;
}

#club-information > li > select > option {
  color: black;
}

#club-information > li > p:nth-child(4), #club-information > li > input:nth-child(4) {
  width: 300px;
  margin: none;
}

#club-information > li > input:nth-child(4) {
  padding: 4px 0;
}

#club-information > li > p:nth-child(1)::after, #club-information > li > p:nth-child(2)::after, #club-information > li > p:nth-child(3)::after {
  display: inline-block;
  position: absolute;
  content: '';
  background: #87cefa;
  width: 20px;
  height: 4px;
  top: 20px;
  right: -20px;
} 

#club-information > li:nth-child(1) > p {
  background: #87cefa;
  color: white;
  
}

#club-information > li > p, #club-information > li > select, #club-information > li > input{
  border: 4px solid #87cefa;
  font-size: 32px;
  display: inline-block;
  background: white;
  text-align: center;
  margin-right: 10px;
  position: relative;
  font-weight: bold;
}

.unsaved::after {
  display: inline-block;
  content: '*';
  font-size: 40px;
  position: absolute;
  font-weight: bold;
}

.no-reason {
  color: #d9d9d9;
}

.no-attendance {
  color: blue;
}

.awol {
  color: red;
}

#attendance-save-button {
  width: 300px;
  height: 100px;
  background: #87cefa;
  color: white;
  font-size: 48px;
  font-weight: bold;
  border-radius: 15px;
  border: 4px solid #87cefa;
  position: absolute;
  bottom: 150px;
  right: 300px;
}

#club-student-sum {
  position: absolute;
  font-size: 42px;
  font-weight: bold;
  top: 9%;
  right: 10%;
}

#club-student-sum > p {
  display: inline-block;
}

#class-select-bar {
  position: absolute;
  /* width: 200px; */
  font-size: 0;
  margin-top: 20px;
  margin-left: 20px;
}

#class-select-bar > ul > li {
  display: inline-block;
}

#class-select-bar > ul > li > input {
  width: 160px;
  height: 80px;
  font-size: 42px;
  font-weight: bold;
  color: black;
  background: #87cefa;
  border: 2px solid #1e90ff;
}

#class-7 {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

#class-10 {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.now-class {
  background: rgb(255, 174, 0) !important;
  border: 2px solid rgb(170, 116, 0) !important;
}

.before-class {
  background: rgb(133, 133, 133) !important;
  border: 2px solid rgb(65, 65, 65) !important;
}`