import React, { memo } from 'react';
import {TVBody, FlexHeight, InnerFlex} from '../styled';
import TVNav from '../Nav/Nav';
import TVFooter from '../Footer/Footer';
import TeacherBox from '../Teacher/TeacherBox';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Attendance = () => {
    return (
        <>
            <TVBody>
                <TVNav active={1}>출석 페이지</TVNav>
                <FlexHeight justifyContent alignItems>
                    <FlexSpaceWrap justifyContent alignItems>
                            <RoomBox to="/attendance/self">
                                <div>자습실</div>
                            </RoomBox>
                            <RoomBox to="/attendance/2">
                                <div>N층</div>                            
                                <div>***선생님</div>
                            </RoomBox>
                            <RoomBox to="/attendance/3">
                                <div>N층</div>                            
                                <div>***선생님</div>
                            </RoomBox>
                            <RoomBox to="/attendance/4">
                                <div>N층</div>                            
                                <div>***선생님</div>
                            </RoomBox>
                    </FlexSpaceWrap>
                </FlexHeight>
            </TVBody>
            <TVFooter /> 
        </>
    );
}

const FlexSpaceWrap = styled(FlexHeight)`
    flex-wrap:wrap;
    height:50%;
`;

const RoomBox = styled(Link)`
    color:white;
    font-size:35px;
    font-weight:bold;
    width:250px;
    height:300px;
    background-color:skyblue;
    border-radius:30px;
    margin:10px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-decoration:none;
`;

export default memo(Attendance);