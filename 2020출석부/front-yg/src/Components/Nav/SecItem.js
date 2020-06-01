import React,{memo} from 'react';
import styled,{css} from 'styled-components';
import {SecCircle} from '../styled';
import { Link } from 'react-router-dom';

const SecItem = ({children,isActive,link,onClick}) => {
    console.log("SecItem 랜더링");
    return (
        <>
            <SecItemWrap onClick={onClick}>
                <SecText to={link}>{children}</SecText>
                <SecCircle isActive={isActive}></SecCircle>
            </SecItemWrap>
        </>
    );
}

const SecItemWrap = styled.div`
    display:flex;
    padding:20px;
`

const SecText = styled(Link)`
    flex:1;
    color:white;
    font-size:25px;
    text-decoration:none;
`;  



export default memo(SecItem);