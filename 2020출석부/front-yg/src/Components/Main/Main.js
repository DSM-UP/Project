import React, { memo, useEffect } from 'react';
import Calander from './calendar';
import { TVBody,SubmitButton,Margin } from '../styled';
import './calendar.css';
import styled from 'styled-components';
import TVNav from '../Nav/Nav';
import TVFooter from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Main = () => {
    console.log("Main 랜더링");

    useEffect(() => {
        Calander(document.getElementById('calander'));
    },[]);

    return (
        <>
            <TVBody>
                <TVNav active={1}>메인 페이지</TVNav>
                <div id="calander"></div>
                <MarginCenter top="20px">
                    <Link to="/attendance"><SubmitButton>출석체크</SubmitButton></Link>
                </MarginCenter>
            </TVBody>
            <TVFooter /> 
        </>
    );
}


const MarginCenter = styled(Margin)`
    text-align:center;
`;

export default memo(Main);