import React from 'react';
import LineGraph from './LineGraph/LineGraph';
import CountryMap from './CountryMap/CountryMap';

const Dashboard = () => {
    return (
        <div>
            <LineGraph></LineGraph>
            <CountryMap></CountryMap>
        </div>
    );
};

export default Dashboard;