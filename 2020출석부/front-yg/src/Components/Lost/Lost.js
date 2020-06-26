import React,{memo} from 'react';
import { TVBody, FlexDirection, Flex,WidthDiv, InnerFlex,SubmitButton } from '../styled';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import styled from 'styled-components';
import LostDaySet from './LostDaySet';
import LostSetStudent from './LostSetStudent';
import LostWhy from './LostWhy';
import { Link } from 'react-router-dom';

const Lost = () => {
    console.log("Lost 랜더링");
    return (
        <>
            <TVBody>
                <Nav active={3}>사전 결석 신고</Nav>
                <Height alignItems justifyContent>
                    <InnerFlexWidth>
                        <FlexDirection alignItems justifyContent>
                            <LostDaySet>시작 날짜</LostDaySet>
                            <LostDaySet>도착 날짜</LostDaySet>
                            <LostSetStudent>학생 인적사항</LostSetStudent>
                            <LostWhy></LostWhy>
                            <WidthDiv Width="80%">
                                <FlexEnd>
                                    <Link to="/viewlost">
                                        <LostViewBtn>사전 결석 리스트 보기</LostViewBtn>
                                    </Link>
                                </FlexEnd>
                            </WidthDiv>
                        </FlexDirection>
                    </InnerFlexWidth>
                </Height>
            </TVBody>
            <Footer/>
        </>
    )
}

const LostViewBtn = styled(SubmitButton)`
    margin-top:15px;
    font-size:15px;
    padding:9px 20px;
    border-radius:8px;
`

const Height = styled(FlexDirection)`
    height:90%;
`

const InnerFlexWidth = styled(InnerFlex)`
    width:100%;
    height:100%;
`;

const FlexEnd = styled(Flex)`
    justify-content:flex-end;
`;

export default memo(Lost);