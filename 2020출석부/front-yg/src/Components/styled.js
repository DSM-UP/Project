import styled, { css } from 'styled-components';
import React,{memo} from 'react';

export const TVBody = styled.div`
    height:1000px;
`;

export const WidthDiv = styled.div`
    width:${props => props.Width};
`;

export const WidthDivCenter = styled(WidthDiv)`
    margin:0 auto;
`;

export const Item = styled.div`
    border:2px solid skyblue;
    padding:8px;
    border-radius:7px;
    font-size:10px;
    margin:0 3px;
`;
export const Flex = styled.div`
    display:flex;
    ${props => props.justifyContent && css`
        justify-content:center;
    `};
    ${props => props.alignItems && css`
        align-items:center;
    `};
`;

export const SubmitButton = styled.button`
    padding:20px 60px;
    color:white;
    font-size:30px;
    background-color:skyblue;
    border:none;
    border-radius:24px;
    font-weight:bold;
`;

export const FlexDirection = styled(Flex)`
    flex-direction:column;
    ${props => props.justifyContent && css`
        justify-content:center;
    `};
    ${props => props.alignItems && css`
        align-items:center;
    `};
`;

export const SecCircle = styled.div`
    width:20px;
    height:20px;
    background:white;
    border-radius:100%;
    background-color:${props => props.color};
    ${props => props.isActive && css`background-color:yellow;`};
`;

export const Margin = styled.div`
    margin:${props => props.Margin};
    margin-left:${props => props.left};
    margin-right:${props => props.right};
    margin-top:${props => props.top};
    margin-bottom:${props => props.bottom};
`;

export const InnerFlex = styled.div`
    flex:${props => props.flex};
`;

export const DateSetWrap = styled.div`
    width:80%;
    height:100px;
    border:2px solid skyblue;
    display:flex;
    margin-top:20px;
    text-align:center;

    & > div {
        flex:1;
    }
    & > div > input {
        background:transparent;
        border:2px solid skyblue;
    }
`;

export const Hr = styled.div`
    border-bottom:5px solid skyblue;
`;

export const HrText = styled(WidthDivCenter)`
    margin-top:30px;
    font-size:30px;
    color:skyblue;
    font-weight:bold;
`;

export const Select = styled.select`
    border:none;
    background:none;
    outline:none;
    transition:1s all;
`;

const TableModel = styled.div`
    flex:1;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    border:2px solid skyblue;
`;

export const Bar = styled.div`
    background:skyblue;
    height:5px;
    width:30px;
`;

export const TableHeader = styled(TableModel)`
    flex:2;
`;
export const TableBody = styled(TableModel)`
    flex:1;
`;
export const TableFooter = styled(TableModel)`
    flex:2;
`;

export const TableWrap = styled.div`
    width:95%;
    display:flex;
    height:30px;
    align-items:center;
    justify-content:center;
    margin-top:35px;

    & > ${TableHeader},${TableBody},${TableFooter} {

        ${props => {
            if(props.type === "all" & props.header)
                return "border:2px solid #C75252;background-color:#C75252;color:white;"
            else if(props.type === "all")
                return "border:2px solid #C75252;";
            else if(props.header)
                return "background:skyblue;color:white;"
        }}
    }

    & > ${Bar} {
        ${props => props.type === "all" ? "background-color:#C75252;":""}
    }
`;




export const InlineItem = styled(Item)`
    display:inline-block;
    margin:5px 5px;
    padding:5px 15px;
`;

export const FlexSpaceWrap = styled(Flex)`
    flex-wrap:wrap;
`;

export const InnerHeight = styled(FlexDirection)`
    height:90%;
    padding:20px;
    box-sizing:border-box;
`;

export const FlexHeight = styled(Flex)`
    height:50%;
`;