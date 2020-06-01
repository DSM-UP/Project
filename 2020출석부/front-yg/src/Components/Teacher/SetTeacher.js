import React,{memo, useEffect} from 'react';
import { TVBody, FlexDirection } from '../styled';
import styled from 'styled-components';
import TVFooter from '../Footer/Footer';
import TeacherBox from './TeacherBox';
import Constant from '../Constant';
import Axios from 'axios';


const SetTeacher = () => {
    useEffect(async () => {
        try {
            if(window.localStorage.getItem("beforeToken")) {
                const now = new Date();
                const res = await Axios.get(`${Constant.SERVER_IP_ADRESS}/attendance/teachers?year=${now.getFullYear()}&month=${now.getMonth()}&day=${now.getDate()}`,{
                    headers:{
                        beforeToken:window.localStorage.getItem("beforeToken")
                    }
                });
                console.log(res);
            }
        } catch(err) {
            if(err.response.status === 403) alert("다시 시도해 주세요");
            window.history.back();
        }
    },[]);
    return (
        <>
            <TVBody>
                <FlexDirectionHeight justifyContent>
                    <TextWrap>몇 층 담당이신가요?</TextWrap>
                    <AlignCenter>
                        <TeacherBox floor="2" teacherName="김정은"></TeacherBox>
                        <TeacherBox floor="2" teacherName="김정은"></TeacherBox>
                        <TeacherBox floor="2" teacherName="김정은"></TeacherBox>
                    </AlignCenter>
                </FlexDirectionHeight>
            </TVBody>
            <TVFooter />
        </>
    );
}
const FlexDirectionHeight = styled(FlexDirection)`
    height:100%;
`

const AlignCenter = styled.div`
    margin-top:60px;
    justify-content:center;
    display:flex;
    color: white;
    font-size: 38px;
    font-weight: bold;
`;

const TextWrap = styled.div`
    width:100%;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    color: #87cefa;
`;

export default memo(SetTeacher);