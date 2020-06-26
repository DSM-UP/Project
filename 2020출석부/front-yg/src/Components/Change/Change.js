import React,{memo} from 'react';
import { Hr,HrText, SubmitButton, Flex,TVBody,Margin, FlexDirection, InnerFlex, WidthDivCenter } from '../styled';
import Nav from '../Nav/Nav';
import styled from 'styled-components';
import TVFooter from '../Footer/Footer';
import DateSetTeacher from './DateSetTeacher';
import DateSet from './DateSet';

const Change = () => {
    
    console.log("Change 랜더링");

    return (
        <>
            <TVBody>
                <Nav active={2}>일정&선생님 교체</Nav>
                <FlexDirection>
                    <InnerFlex flex="1">
                        <HrText Width="70%">일정</HrText>
                        <Hr />
                        <Margin top="30px">
                            <FlexDirection justifyContent alignItems>
                                <DateSet />
                                <DateSet />
                                <Margin top="30px">
                                    <SubmitButton>교체</SubmitButton>
                                </Margin>
                            </FlexDirection>
                        </Margin>
                    </InnerFlex>
                    <InnerFlex flex="1">
                        <HrText Width="70%">선생님</HrText>
                        <Hr />
                        <Margin top="10px">
                            <FlexDirection justifyContent alignItems>
                                <DateSetTeacher></DateSetTeacher>
                                <DateSetTeacher></DateSetTeacher>
                                <Margin top="30px">
                                    <SubmitButton>교체</SubmitButton>
                                </Margin>
                            </FlexDirection>
                        </Margin>
                    </InnerFlex>
                </FlexDirection>
            </TVBody>
            <TVFooter/>
        </>
    );
}

export default memo(Change);