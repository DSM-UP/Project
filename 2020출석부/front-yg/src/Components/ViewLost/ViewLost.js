import React,{memo} from 'react';
import Footer from '../Footer/Footer';
import {TVBody, InnerHeight} from '../styled';
import Nav from '../Nav/Nav';
import FindInfo from './FindInfo';
import ViewTable from './ViewTable';

const ViewLost = ({type}) => {
    return (
        <>
            <TVBody>
                <Nav>{type === "all" ? "통계":"사전 결석 리스트 보기"}</Nav>
                    <InnerHeight justifyContent >
                        <FindInfo type={type} />
                        <ViewTable type={type} />
                    </InnerHeight>
            </TVBody>
            <Footer/>
        </>
    );
}




export default memo(ViewLost);