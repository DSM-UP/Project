import React from 'react';
import { TVBody, FlexDirection, Flex, InnerFlex, SecCircle, Margin, TableWrap, TableBody, TableHeader, Bar, SubmitButton } from '../styled';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import styled from 'styled-components';

const AttendanceItem = ({floor}) => {
    return (
        <>
            <TVBody>
                <Nav>{floor === "self" ? "자습" : floor}{floor === "self" ? "실":"층"} 출석 페이지</Nav>
                <PaddingContainer>
                    <FlexEnd>4 / 10출석</FlexEnd>
                    <InnerFlex flex="1">
                        <Flex>
                            <CirclesWrap>
                                <Margin top="30px">
                                    <Flex alignItems>
                                        <InnerFlex flex="1">Undefinded</InnerFlex>
                                        <WidthSecCircle color="white" />
                                    </Flex>
                                </Margin>
                                <Margin top="30px">
                                    <Flex alignItems>
                                        <InnerFlex flex="1">QSS</InnerFlex>
                                        <WidthSecCircle color="white" />
                                    </Flex>
                                </Margin>
                            </CirclesWrap>
                            <InnerFlex flex="1">
                                <FlexDirectionHeight>
                                    <InnerFlexHeight flex="1">
                                        <PaddingTableWrap header>
                                            <TableBody>번호</TableBody><Bar/>
                                            <TableBody>이름</TableBody><Bar/>
                                            <TableBody>출석현황</TableBody><Bar/>
                                            <TableHeader>사유</TableHeader>
                                        </PaddingTableWrap>
                                    </InnerFlexHeight> 
                                    <Flex style={{height:"80px"}} justifyContent>
                                        <SubmitButton>저장</SubmitButton>
                                    </Flex>
                                </FlexDirectionHeight>
                            </InnerFlex>
                        </Flex>
                    </InnerFlex>
                </PaddingContainer>
            </TVBody>
            <Footer/>
        </>
    )
}

const FlexDirectionHeight = styled(FlexDirection)`
    height:100%;
`;

const InnerFlexHeight = styled(InnerFlex)`
    height:100%;
    overflow:hidden;
`;

const PaddingTableWrap = styled(TableWrap)`
    box-sizing:border-box;
    padding-left:20px;
`

const WidthSecCircle = styled(SecCircle)`
    width:15px;
    height:15px;
`;

const CirclesWrap = styled(FlexDirection)`
    height:800px;
    width:150px;
    background-color:#1e90ff;
    padding:20px;
    font-size:20px;
    color:white;
    font-weight:bolder;
`;

const FlexEnd = styled.div`
    display:flex;
    justify-content:flex-end;
    margin-right:29px;
`;

const PaddingContainer = styled.div`
    padding-right:40px;
    padding-top:50px;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
`;

export default AttendanceItem;