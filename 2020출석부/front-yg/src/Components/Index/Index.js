import React, { useEffect, memo } from 'react';
import IndexTV from './IndexTV';

const Index = ({type,history}) => {
    if(type === "TV") return <IndexTV history={history} />
    else return "dassd";
}

export default memo(Index);