import React,{memo} from 'react';
import { DateSetWrap,FlexDirection, Flex, Margin,Item, SubmitButton } from '../styled';
import styled from 'styled-components';

const LostWhy = () => {
    return (
        <WhySetWrap>
            <FlexDirection>        
                <Margin left="50px">
                    <Flex alignItems>            
                        <div>목적</div>
                        <Margin left="50px" />
                        <Item2>현체</Item2>
                        <Item2>외출</Item2>
                        <Item2>공결</Item2>
                    </Flex>
                    <Margin top="10px"><Flex>비고(사유)</Flex></Margin>
                    <Margin top="10px"><Flex><Input placeholder="없음" /></Flex></Margin>
                    <Margin top="20px"><SubmitButton>신고</SubmitButton></Margin>
                </Margin>
            </FlexDirection>
        </WhySetWrap>
    );
}
const Input = styled.input`
    width:85%;
    padding:10px;
    border:2px solid skyblue;
    border-radius:6px;
`;
const Item2 = styled(Item)`
    font-size:15px;
    margin:0 5px;
    padding:5px 20px;
`; 

const WhySetWrap = styled(DateSetWrap)`
    height:250px;
    box-sizing:border-box;
    padding:20px;
    font-weight:bold;
`;

export default memo(LostWhy);