import React, { memo } from 'react';
import { Flex,Item,DateSetWrap } from '../styled';

const DateSet  = () => {
    console.log("DateSet 랜더링");
    return (
        <DateSetWrap>
            <Flex justifyContent alignItems>날짜</Flex>
            <Flex justifyContent alignItems><input placeholder="날짜" type="date" /></Flex>
            <Flex className="item" justifyContent alignItems><Item>월요일 방과후</Item></Flex>
            <Flex className="item" justifyContent alignItems><Item>화요일 방과후</Item></Flex>
            <Flex className="item" justifyContent alignItems><Item>전공동아리</Item></Flex>
            <Flex className="item" justifyContent alignItems><Item>자습(기타)</Item></Flex>
        </DateSetWrap>
    );
}

export default memo(DateSet);