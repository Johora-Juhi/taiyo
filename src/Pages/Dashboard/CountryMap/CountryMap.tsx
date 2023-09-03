import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Country {
    country: string;
    countryInfo: {
        lat: number;
        long: number;
    };
    cases: number;
    recovered: number;
    deaths: number;
}

const CountryMap= () => {
    const { data: countries = [], isLoading } = useQuery<Country[]>({
        queryKey: ["countries"],
        queryFn: async () => {
            const res = await fetch(`https://disease.sh/v3/covid-19/countries`, {
                headers: {},
            });
            const data = await res.json();
            return data;
        },
    });

    if (isLoading) {
        return <div className='my-20 text-3xl fontFamily'>Loading! Please wait...</div>
    }

    return (
        <div className='w-full lg:w-3/4 mx-auto shadow-xl px-2 md:px-10 bg-white  my-10 pb-2 md:pb-10'>
            <p className='pt-5 pb-10 text-xl fontFamily tracking-wider'>COVID-19 Map</p>
            <MapContainer center={[0,0]} zoom={2} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {countries.map((country) => (
                    <Marker
                        key={country.country}
                        position={[country.countryInfo.lat, country.countryInfo.long]}
                    >
                        <Popup>
                            <div>
                                <h3>{country.country}</h3>
                                <p>Total Cases: {country.cases}</p>
                                <p>Total Recovered: {country.recovered}</p>
                                <p>Total Deaths: {country.deaths}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default CountryMap;
