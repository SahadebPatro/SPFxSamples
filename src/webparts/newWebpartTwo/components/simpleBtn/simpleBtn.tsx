import * as React from 'react';

import "./Test.css";

export interface ISimpleBtnProps {
}

export function SimpleBtn(props: ISimpleBtnProps) {

    const TestMethod = () => {
        console.log('Hello');
    };

    return (
        <>
            <input type="button" value="Bootstrap button" className='btn btn-success' onClick={TestMethod} />
        </>
    );
}
