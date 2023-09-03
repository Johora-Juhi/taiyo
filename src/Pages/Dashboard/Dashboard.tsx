import React from 'react';
import LineGraph from './LineGraph/LineGraph';
import CountryMap from './CountryMap/CountryMap';
import useTitle from '../../hooks/useTitle';

const Dashboard = () => {
    useTitle('Charts and Maps');

    return (
        <div>
            <LineGraph></LineGraph>
            <CountryMap></CountryMap>
        </div>
    );
};

export default Dashboard;