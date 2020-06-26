import React, { useState, memo, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import SecItem from './SecItem';

const SecretNav = ({closeModal,isOpen,active,logOutFunc}) => {
    
    
    const render1List = [["메인 페이지",'/main'],["일정 선생님 교체","/change"],["사전 결석 신고","/lost"],["통계보기","avg"]]
    const render2List = [["개발사 소개","/team"],["선생님 재선택","/teacher"],["로그 아웃"]];


    const render1 = useCallback(() => {
        return render1List.map((now,index) => <SecItem key={index} link={now[1]} isActive={index === active-1} >{now[0]}</SecItem>)
    },[]);
    const render2 = useCallback(() => {
        return render2List.map((now,index) => <SecItem key={index} link={now[1]} isActive={index === active-5} onClick={index === 2 ? trueLogOut : null}  >{now[0]}</SecItem>)
    },[]);

    const trueLogOut = useCallback((e) => {
        e.preventDefault();
        logOutFunc(true);
    },[]);
    return (
        <>
            <SecDivWrap className={isOpen ? "open" : "close"}>
                <SecTab>
                    <SecHeader>
                        <SecText>김정은 선생님</SecText>
                        <Three onClick={closeModal}/>
                    </SecHeader>
                    <SecBody>
                        <SecBodyInner>
                            {render1()}
                        </SecBodyInner>
                        <SecBodyInner>
                            {render2()}
                        </SecBodyInner>
                    </SecBody>
                    <SecFooter>2020.01.15(수)</SecFooter>
                </SecTab>
            </SecDivWrap>
        </>
    );
};

const SecFooter = styled.div`
    font-size:30px;
    text-align:center;
    color:white;
    flex:1;
`;

const SecBodyInner = styled.div`
    display:flex;
    flex:1;
    flex-direction:column;
`;

const SecText = styled.div`
    flex:1;
    color:skyblue;
    font-size:30px;
`;

const Three = styled.div`
    width:0px;
    height:0px;
    border-right:40px solid skyblue;
    border-top:20px solid transparent;
    border-bottom:20px solid transparent;
`;

const SecHeader = styled.div`
    box-sizing:border-box;
    padding:20px;
    background:white;
    height:100px;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const SecBody = styled.div`
    display:flex;
    flex:6;
    flex-direction:column;
`

const openTab = keyframes`
    0%{
        width:25%;
        opacity:0;
    }
    100% {
        opacity:1;
        width:45%;
    }
`;

const SecDivWrap = styled.div`
    top:0;
    left:0;
    position:fixed;
    width:100vw;
    height:100vh;
    display:none;
    z-index:100;

    &.open {
        background:rgba(0,0,0,0.6);
        display:block;  
        & > div {
            animation:${openTab} 1s forwards;
        }
    }
`;

const SecTab = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;   
    width:0%;
    background:skyblue;
`;

export default memo(SecretNav);