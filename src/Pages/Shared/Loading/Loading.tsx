import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className='loaader'>
            <div className="spinner-box">
                <div className="circle-border">
                    <div className="circle-core"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;