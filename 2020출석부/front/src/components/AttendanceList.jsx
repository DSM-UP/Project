import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class AttendanceList extends Component {
  state = {
    beforeValue: this.props.v.status,
    afterValue: this.props.v.status,
    beforeReason: this.props.v.reason ? this.props.v.reason : '',
    afterReason: this.props.v.reason ? this.props.v.reason : ''
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.v.id !== this.props.v.id || this.state.afterReason !== nextState.afterReason || this.state.afterValue !== nextState.afterValue) {
      return true;
    }
    return false;
  }

  li;
  onLi = (c) => { this.li = c; }

  componentDidUpdate(oldProps) {
    if (oldProps.v.id !== this.props.v.id) {
      const { status, reason } = this.props.v;
      this.setState({
        beforeReason: reason ? reason : '',
        beforeValue: status,
        afterReason: reason ? reason : '',
        afterValue: status
      });
    }
  }

  onChange = async (e) => {
    const { id } = this.props.v;
    await this.setState({ afterValue: e.target.value });
    if (this.li.classList.contains('unsaved')) {
      this.props.setUnsavedList({
        id,
        reason: this.state.afterReason,
        status: this.state.afterValue
      });
    } else {
      this.props.removeUnsavedList(id);
    }
  }

  onChangeReason = async (e) => {
    const { id } = this.props.v;
    await this.setState({ afterReason: e.target.value });
    if (this.li.classList.contains('unsaved')) {
      this.props.setUnsavedList({
        id,
        reason: this.state.afterReason,
        status: this.state.afterValue
      });
    } else {
      this.props.removeUnsavedList(id);
    }
  }

  render() {
    const { v, i } = this.props;
    const { afterValue, beforeValue, afterReason, beforeReason } = this.state;
    return (
      <>
        <li ref={this.onLi} className={beforeReason != afterReason || afterValue != beforeValue ? 'unsaved' : ''}>
          <p className="number">{i + 1 < 10 ? `0${i + 1}` : i + 1}</p>
          <p className="name">{v.student.name}</p>
          <select onChange={this.onChange} className={`attendance${Number(afterValue) === 4 ? ' awol' : Number(afterValue) !== 0 ? ' no-attendance' : ''}`} value={afterValue}>
            <option value="0">출석</option>
            <option value="4">무단</option>
            <option value="1">현체</option>
            <option value="2">외출</option>
            <option value="5">지각</option>
            <option value="3">공결</option>
          </select>
          <input onChange={this.onChangeReason} value={afterReason} className="reason" />
        </li>
      </>
    )
  }
}

export default AttendanceList;