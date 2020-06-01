import React, { memo } from 'react';
import styled,{css} from 'styled-components';

const TVFooter = () => {
    console.log("FooterInner 랜더링");
    return (
        <TVFooterDiv>
            <FooterInner width="70%">대덕소프트웨어마이스터고등학교</FooterInner>
            <FooterInner width="30%" right>DMI</FooterInner>
        </TVFooterDiv>
    )
}

const TVFooterDiv = styled.div`
  background:#1e90ff;
  height:75px;  
  padding:20px 40px;
  display:flex; 
  color:white;
  font-weight:bolder;
  font-size:25px;
`;

const FooterInner = styled.div`
    width:${props => props.width};
    ${props => props.right && css`justify-content:flex-end;`};
    display:flex;
    align-items:center;
`;  

export default memo(TVFooter);