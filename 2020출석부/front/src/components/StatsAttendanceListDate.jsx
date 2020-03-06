import React, { memo } from 'react'

const StatsAttendanceListDate = memo(({ v }) => {
  return (
    <li>
      <p className="information-date">{`${v.student.class.grade}${v.student.class.class}${goodFunction(v.student.number)} ${v.student.name}`}</p>
      <p className={`information-attendance${v.status === 4 ? ' awol' : ''}`}>{statusAnalyzer(v.status)}</p>
      <p className="information-reason">{v.reason}</p>
    </li>
  )
})

function goodFunction(input) {
  return Number(input) < 10 ? `0${input}` : input
}

function statusAnalyzer(input) {
  switch (input) {
    case 1:
      return '현체';
    case 2:
      return '외출';
    case 3:
      return '공결';
    case 4:
      return '무단';
    case 5:
      return '지각';
    default:
      return '';
  }
}

export default StatsAttendanceListDate