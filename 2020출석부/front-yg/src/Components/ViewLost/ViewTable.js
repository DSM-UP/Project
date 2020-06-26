import React, { memo } from 'react';
import {InnerFlex,FlexDirection,TableWrap,TableBody,TableFooter,Bar,TableHeader} from '../styled';

const ViewTable = ({type}) => {
    console.log(type);
    return (
        <InnerFlex flex="2">
            <FlexDirection alignItems>
                <TableWrap type={type} header>
                    <TableHeader>날짜</TableHeader><Bar/>
                    <TableBody>출석</TableBody><Bar/>
                    <TableFooter>사유</TableFooter>
                </TableWrap>
                <TableWrap type={type}>
                    <TableHeader>2020년 01월 01일 09교시</TableHeader><Bar/>
                    <TableBody>현체</TableBody><Bar/>
                    <TableFooter>배고파서</TableFooter>
                </TableWrap>
            </FlexDirection>
        </InnerFlex>
    );
}

export default memo(ViewTable); 