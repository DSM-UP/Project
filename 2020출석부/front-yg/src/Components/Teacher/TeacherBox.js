import React, { memo } from 'react';
import styled from 'styled-components';

const TeacherBox = ({floor,teacherName}) => {
    return (
        <TeacherBoxWrap>
            <div>{floor}층</div>
            <TeacherName>{teacherName}선생님</TeacherName>
        </TeacherBoxWrap>
    );
}

export const TeacherBoxWrap = styled.div`
    text-align:center;
    display: inline-block;
    width: 220px;
    height: 250px;
    background: #87cefa;
    margin: 0 10px;
    border-radius: 55px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
`;

const TeacherName = styled.div`
    margin-top:15px;
    font-size:30px;
`;


export default memo(TeacherBox);