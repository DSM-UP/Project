import React,{memo, useState, useCallback, useEffect} from 'react';
import {TVBody} from '../styled';
import Constant from '../Constant';
import Axios from 'axios';
import styled from 'styled-components';
import img from './icon.PNG';
import TVFooter from '../Footer/Footer';
import Nav from '../Nav/Nav';


const IndexTV = ({history}) => {

    useEffect(() => {
        
    },[]);

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const changeUsername = useCallback(e => {
        setUsername(e.target.value);
    },[]);

    const changePassword = useCallback(e => {
        setPassword(e.target.value);
    },[]);

    const onSubmit = useCallback(async e => {
        e.preventDefault();
        try {
            const res = await Axios.post(`${Constant.SERVER_IP_ADRESS}/auth/signin`,{
                username,
                password
            });
            if(res.status === 200) {
                window.localStorage.setItem("beforeToken",res.data.beforeToken);
                alert("로그인에 성공하였습니다");
                history.push("/teacher");   
            }
        } catch(err) {
            if(err.response.status === 400) alert("아이디 또는 비밀번호가 맞지 않습니다");
        }
    },[username,password]);

    console.log("인덱스 랜더링");
    return (
        <>
            <IndexBody>
                <BodyInner>
                    <form onSubmit={onSubmit} >
                        <img width="100%" src={img} />
                            <Input type="text"  value={username} onChange={changeUsername} />
                            <Input type="password" value={password} onChange={changePassword} />
                            <PWWrap><SavePW /><Label>아이디 기억하기</Label></PWWrap>
                        <LoginBtn>로그인</LoginBtn>
                    </form>
                </BodyInner>
            </IndexBody>
            <TVFooter/>
        </>
    );
}

const LoginBtn = styled.button`
    margin-top:25px;
    width: 100%;
    height: 100px;
    background: #87cefa;
    border: none;
    color: white;
    font-size: 38px;
    font-weight: bold;
`;

const Label = styled.label`
    flex:1;
    margin-left:15px;
`;

const PWWrap = styled.div`
    display:flex;
`;

const SavePW = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #87cefa;
    cursor: pointer;
`;
const Input = styled.input`
    box-sizing:border-box;
    height: 100px;
    width: 100%;
    margin-bottom: 15px;
    font-size: 30px;
    padding-left: 15px;
    border: 1px solid #87cefa;
    margin-top:20px;
`;

const BodyInner = styled.div`
    width:400px;
    margin:0 auto;
`;

const IndexBody = styled(TVBody)`
    display:flex;
    align-items:center;
`;

export default memo(IndexTV);