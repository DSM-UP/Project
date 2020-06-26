import React, { memo, useCallback, useState } from 'react';
import { InnerFlex,DateSetWrap,Flex,Item,Select,Margin,FlexSpaceWrap,FlexDirection,WidthDiv } from '../styled';


const FindInfo = ({type}) => {

    const [studentMode,setStudentMode] = useState(true);

    const changeMode = useCallback(() => {
        setStudentMode(prev => !prev);
    },[]);

    return (
        <InnerFlex flex="1">
            <FlexDirection alignItems>
                <DateSetWrap>
                    <Flex justifyContent alignItems>{studentMode?"학생 인적사항":"날짜"}</Flex>
                    {studentMode?(
                    <>
                        <Flex justifyContent alignItems><Item><Select><option>1학년</option><option>2학년</option><option>3학년</option><option>4학년</option></Select></Item></Flex>
                        <Flex justifyContent alignItems><Item><Select><option>1반</option><option>2반</option><option>3반</option><option>4반</option></Select></Item></Flex>
                    </>):
                    (<>
                        <Flex justifyContent alignItems><input type="date" placeholder="날짜" /></Flex>
                        <Flex justifyContent alignItems><Item><Select>
                            <option>1교시</option>
                            <option>2교시</option>
                            <option>3교시</option>
                            <option>4교시</option>
                            <option>5교시</option>
                            <option>6교시</option>
                            <option>7교시</option>
                            <option>8교시</option>
                            <option>9교시</option>
                            <option>10교시</option></Select></Item>
                        </Flex>
                    </>)
                    }
                    <Flex justifyContent alignItems><Item onClick={changeMode}>{studentMode?"날짜별로 보기":"학생별로 보기"}</Item></Flex>
                </DateSetWrap>
                <WidthDiv Width="80%">
                    <Margin top="10px">
                        <FlexSpaceWrap>
                            {studentMode?["공영길","공영갈","공좆길"].map(now => <Item>{now}</Item>):""}
                        </FlexSpaceWrap>
                    </Margin>
                </WidthDiv>
            </FlexDirection>
        </InnerFlex>
    );
}

export default memo(FindInfo);