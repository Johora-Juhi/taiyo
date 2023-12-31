import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './LineGraph.css'

interface GraphData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

const LineGraph = () => {
  const { data: graphData = {} as GraphData, isLoading, } = useQuery<GraphData>({
    queryKey: ["graphData"],
    queryFn: async () => {
      const res = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`, {
        headers: {},
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <div className=''></div>
  }

  // Extract data for cases, deaths, and recovered
  const dates = Object.keys(graphData.cases);
  const casesData = Object.values(graphData.cases);
  const deathsData = Object.values(graphData.deaths);
  const recoveredData = Object.values(graphData.recovered);

  // Create an array of objects for recharts
  const chartData = dates.map((date, index) => ({
    date, // x-axis
    cases: casesData[index], // y-axis for cases
    deaths: deathsData[index], // y-axis for deaths
    recovered: recoveredData[index], // y-axis for recovered
  }));

  return (
    <div className='flex flex-col justify-center items-center shadow-lg w-full lg:w-3/4 mx-auto my-10 bg-white'>
      <p className='pt-5 pb-14 text-xl fontFamily tracking-wider'>COVID-19 Cases, Deaths, and Recovered</p>
      {window.innerWidth < 600 ? (
        <LineChart width={360} height={400} data={chartData} margin={{
          top: 5,
          right: 5,
          left: 50,
          bottom: 5,
        }}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="rgba(75, 192, 192, 1)" />
          <Line type="monotone" dataKey="deaths" stroke="rgba(255, 0, 0, 1)" />
          <Line type="monotone" dataKey="recovered" stroke="rgba(0, 128, 0, 1)" />
        </LineChart>
      ) :(
      <LineChart width={800} height={500} data={chartData} margin={{
            top: 5,
            right: 30,
            left: 50,
            bottom: 5,
          }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="rgba(75, 192, 192, 1)" />
        <Line type="monotone" dataKey="deaths" stroke="rgba(255, 0, 0, 1)" />
        <Line type="monotone" dataKey="recovered" stroke="rgba(0, 128, 0, 1)" />
        </LineChart>
  )}
    </div>
  );
};

export default LineGraph;

