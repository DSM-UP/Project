import React, { memo } from 'react'

const StudentList = memo(({ v, studentId, clickStudent }) => {
  const onClickStudent = (id) => async () => {
    clickStudent(id);
  }

  return (
    <input onClick={onClickStudent(v.id)} type="button" value={v.name} className={`std1-1${Number(studentId) === v.id ? ' select' : ''}`}></input>
  )
})

export default StudentList