import React, { memo } from 'react';
import { Flex,Item,DateSetWrap, InnerFlex } from '../styled';
import styled from 'styled-components';

const LostSetStudent  = ({children}) => {
    console.log("LostDaySetStudent 랜더링");
    return (
        <DateSetWrap>
            <InnerFlexFlex flex="6 !important">{children}</InnerFlexFlex>
            <InnerFlexFlex flex="4 !important">
                <Flex justifyContent alignItems>
                    <Item>
                        <Select>
                            <option>1학년</option>
                            <option>2학년</option>
                            <option>3학년</option>                    
                        </Select>
                    </Item>
                </Flex>
            </InnerFlexFlex>
            <InnerFlexFlex flex="4 !important">
                <Flex className="item" justifyContent alignItems>
                    <Item>
                        <Select>
                            <option>1반</option>
                            <option>2반</option>
                            <option>3반</option>
                            <option>4반</option>
                        </Select>
                    </Item>
                </Flex>
            </InnerFlexFlex>
            <InnerFlexFlex flex="4 !important">
                <Flex className="item" justifyContent alignItems>
                    <Item>
                        <Select>
                            <option></option>
                        </Select>
                    </Item>
                </Flex>
            </InnerFlexFlex>
        </DateSetWrap>
    );
}

const Select = styled.select`
    border:none;
    background:none;
    outline:none;
`;

const InnerFlexFlex = styled(InnerFlex)`
    display:flex;
    justify-content:center;
    align-items:center;
`;

export default memo(LostSetStudent);