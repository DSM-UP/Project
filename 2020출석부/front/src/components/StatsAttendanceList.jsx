import React, { memo } from 'react'

const StatsAttendanceList = memo(({ v }) => {
  return (
    <li>
      <p className="information-date">{v.year}년 {goodFunction(v.month)}월 {goodFunction(v.day)}일 {goodFunction(v.period)}교시</p>
      <p className={`information-attendance${v.status === 4 ? ' awol' : ''}`}>{statusAnalyzer(Number(v.status))}</p>
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

export default StatsAttendanceList