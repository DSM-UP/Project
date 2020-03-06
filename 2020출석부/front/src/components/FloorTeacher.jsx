import React, { PureComponent } from 'react'
import Axios from 'axios';

class FloorTeacher extends PureComponent {
  state = {
    changed: false
  };
  onChange = (e) => {
    this.props.setSelected(e.target.value, this.props.floor);
    this.setState({ changed: true });
  }
  
  render() {
    const { floor, teachers, selected } = this.props;
    const { changed } = this.state;
    return (
      <>
        <label htmlFor={floor === 2 ? "second-floor-teacher" : floor === 3 ? "third-floor-teacher" : floor === 4 ? "forth-floor-teacher" : null} id={floor === 2 ? "second-floor-teacher-label" : floor === 3 ? "third-floor-teacher-label" : floor === 4 ? "forth-floor-teacher-label" : null} className={`teacher-select-label${changed ? ' select': ''}`}>{floor}층</label>
        <select value={selected} onChange={this.onChange} name={floor === 2 ? "second-floor-teacher" : floor === 3 ? "third-floor-teacher" : floor === 4 ? "forth-floor-teacher" : null} id={floor === 2 ? "second-floor-teacher" : floor === 3 ? "third-floor-teacher" : floor === 4 ? "forth-floor-teacher" : null} className={`teacher-select${changed ? ' select' : ''}`}>
          {
            teachers.map((v, i) => {
              return (
                <option key={v.name+i} value={v.name}>{v.name}</option>
              )
            })
          }
        </select>
      </>
    )
  }
}

export default FloorTeacher;