import React, {memo} from 'react';
import { FlexAlignCenter, TVBody, SecCircle, Flex, Margin, InnerFlex } from '../styled';
import Nav from '../Nav/Nav';
import styled from 'styled-components';
import GYG from './공영길.jpg';
import GDO from './김대웅.jpg';
import SJO from './손정우.jpg';
import YYJ from './안영준.PNG';
import YSO from './유시온.jpg';
import YJH from './이진혁.jpg';
import TVFooter from '../Footer/Footer';

const Team = () => {
    console.log("Team 랜더링");
    return (
        <>
            <TVBody>
                <Nav>개발자 소개</Nav>
                <TextIntroduce>
                    <p>Team. DMI</p>
                    <span>선생님들의 간편한 출석체크를 위한 출석부 플랫폼</span>
                </TextIntroduce>
                <ImgIntroduce>
                    <Flex alignItems>
                        <SecCircle color="skyblue" />
                        <Margin left="10px">팀소개</Margin>
                    </Flex>  
                    <ImgsWrap flex="1">
                        <Flex>
                            <TeamImg src={YJH} name="이진혁" job="Design"/>
                            <TeamImg src={GDO} name="김대웅" job="Back-End"/>
                            <TeamImg src={GYG} name="공영길" job="Front-End"/>
                        </Flex>
                        <Flex>
                            <TeamImg src={SJO} name="손정우" job="PM"/>
                            <TeamImg src={YSO} name="유시온" job="Front-End"/>
                            <TeamImg src={YYJ} name="안영준" job="Design"/>
                        </Flex>
                    </ImgsWrap>
                </ImgIntroduce>
            </TVBody>
            <TVFooter/>
        </>
    );
}

const TeamImg = ({src,name,job}) => {
    console.log("Team Img 랜더링");
    return (
        <TeamImgWrap>
            <img src={src} />
            <Margin top="10px">
                <span>{name}</span>
                <Margin top="10px">{job}</Margin>
            </Margin>
        </TeamImgWrap>
    );
}

const ImgsWrap = styled(InnerFlex)`
    margin-top:15px;
    display:flex;
    flex-direction:column;
`; 

const TeamImgWrap = styled.div`
    text-align:center;
    display:inline-flex;
    margin:5px 6px;
    width:33%;
    height:285px;
    font-weight:bold;
    border-radius:20px;
    background-color:skyblue;
    justify-content:center; 
    align-items:center;
    flex-direction:column;
    color:white;

    & img {
        width:100px;
        height:100px;
    }
`;

const ImgIntroduce = styled.div`
    display:flex;
    flex-direction:column;
    padding:50px;
    height:40%;
    color:skyblue;
    font-size:25px;
`;

const TextIntroduce = styled.div`
    padding:50px;
    color:white;
    background:skyblue;
    margin-top:20px;
    font-size:25px;
    font-weight:bold;
    box-sizing:border-box;
`;

export default memo(Team);