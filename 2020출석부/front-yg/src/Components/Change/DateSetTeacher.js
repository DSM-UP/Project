import React, { memo } from 'react';
import { Flex, Item, DateSetWrap } from '../styled';

const DateSetTeacher  = () => {
    console.log("DateSetTeacher 랜더링");
    return (
        <DateSetWrap>
            <Flex justifyContent alignItems>날짜</Flex>
            <Flex justifyContent alignItems><input placeholder="날짜" type="date" /></Flex>
            <Flex className="item" justifyContent alignItems><Item>2층 김정은 선생님</Item></Flex>
            <Flex className="item" justifyContent alignItems><Item>3층 김정은 선생님</Item></Flex>
            <Flex className="item" justifyContent alignItems><Item>4층 김정은 선생님</Item></Flex>
        </DateSetWrap>
    );
}

export default memo(DateSetTeacher);