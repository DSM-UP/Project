import React, {memo, useState, useCallback} from 'react';
import {InnerFlex, Flex} from '../styled';
import styled,{css} from 'styled-components';
import menuIco from './menu-icon.png';
import messageIcon from './message-icon.png';
import SecretNav from './SecretNav';

const TVNav = ({children,active}) => {
    const [isOpen,setIsOpen] = useState(false);
    const [isLogOut,setIsLogOut] = useState(false);

    const openTab = useCallback(() => {
        setIsOpen(true);
    },[]);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    },[]);

    const openLogOut = useCallback(() => {
        setIsLogOut(true);
    },[]);

    const closeLogOut = useCallback(() => {
        setIsLogOut(false);
    },[]);

    const logOut = useCallback(() => {
        window.localStorage.clear();
        window.location.href = "/";
    },[]);
    console.log("Nav 랜더링");

    return (
        <>
            <TVHeader>
                <HeaderDiv>
                    <HeaderInnerDiv><img onClick={openTab} src={menuIco} /></HeaderInnerDiv>
                    <HeaderInnerDiv>{children}</HeaderInnerDiv>
                </HeaderDiv>
                <HeaderInnerDiv>
                    <img src={messageIcon} /> 
                </HeaderInnerDiv>
            </TVHeader>
            <SecretNav logOutFunc={openLogOut} active={active} closeModal={closeModal} isOpen={isOpen} />
            {isLogOut && (
                <LogOutModal>
                    <Modal>
                        <InnerFlexH flex="1">
                            <ModalText>정말 로그아웃을 하시겠습니까?</ModalText>
                        </InnerFlexH>
                        <InnerFlexH flex="1">
                            <InnerFlexTwo flex="1" onClick={logOut} >로그아웃</InnerFlexTwo>
                            <InnerFlexTwo flex="1" onClick={closeLogOut} active>취소</InnerFlexTwo>
                        </InnerFlexH>
                    </Modal>
                </LogOutModal>
            )}
        </>
    )
}  

export default memo(TVNav);

const InnerFlexH = styled(Flex)`
    width:100%;
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const InnerFlexTwo = styled(InnerFlex)`
    background-color:white;
    color:skyblue;
    border-bottom-right-radius:20px;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;

    ${props => props.active && css`
        background-color:skyblue;
        color:white;
    `}
    &:nth-child(1) {
        border-bottom-left-radius:20px;
    }

`
const ModalText = styled.div`
    color:skyblue;
    font-weight:bold;
`;

const Modal = styled.div`
    border:1px solid skyblue;
    width:50%;
    height:100px;
    background-color:white;
    border-radius:24px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-size:20px;
`;

const LogOutModal = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:100;
`;

const TVFooterDiv = styled.div`
  background:#1e90ff;
  height:75px;  
  padding:20px 40px;
  display:flex; 
  color:white;
  font-weight:bolder;
  font-size:25px;
`;

const HeaderInnerDiv = styled.div`
    display:flex;
    align-items:center;
    &:nth-child(2) {
        margin-left:40px;
    }
`;

const HeaderDiv = styled.div`
    flex:1;
    display:flex;
    vertical-align:middle;
`;

const TVHeader = styled(TVFooterDiv)`
    height:40px;
    display:flex;
`;
