import React, { PureComponent } from 'react'

class TeacherSelectDiv extends PureComponent {
  label;
  button;
  onLabel = (c) => { this.label = c; }
  onButton = (c) => { this.button = c; }

  tS2DS = () => {
    this.props.setSelected(this.button.value.split(' ')[0], this.props.floor);
  }

  render() {
    const { version, floor, teacher, selected } = this.props;
    return (
      <>
        {selected !== teacher ? (
          <>
            <label onClick={this.tS2DS} ref={this.onLabel} htmlFor={`teacher-select-${version}-div-second`} id={`teacher-select-${version}-div-second-label`}>{floor}층</label>
            <input onClick={this.tS2DS} ref={this.onButton} type="button" value={`${teacher} 선생님`} id={`teacher-select-${version}-div-second`} /> <br />
          </>
        ) : (
          <>
            <label className="select" onClick={this.tS2DS} ref={this.onLabel} htmlFor={`teacher-select-${version}-div-second`} id={`teacher-select-${version}-div-second-label`}>{floor}층</label>
            <input className="select" onClick={this.tS2DS} ref={this.onButton} type="button" value={`${teacher} 선생님`} id={`teacher-select-${version}-div-second`} /> <br />
          </>
        )}
      </>
    )
  }
}

export default TeacherSelectDiv;