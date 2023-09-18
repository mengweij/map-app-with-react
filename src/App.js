// eslint-disable-next-line

import React, { useRef, useEffect, useState } from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax


mapboxgl.accessToken =
    "pk.eyJ1Ijoia29yb3R1LWNvbnJveS10cmluaCIsImEiOiJja2pyeTh0cnU2aDViMnFwOTFrZHoxdDU3In0.VEuiNCwqBGL8CidAvTgdjA";

export default function App() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-123.12);
    const [lat, setLat] = useState(49.25);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        // initialize map only once
        if (map.current) return; 
        map.current = new mapboxgl.Map({
            container: mapContainer.current, //tells Mapbox GL JS to render the map inside a specific DOM element. 
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4)); //a Mapbox GL JS method, to get the new longitude and latitude of the point at the center of the map.
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2)); //a Mapbox GL JS method, to determine the zoom level that the map is set to
        });
    });

    return (
        <div>
            <div className='sidebar'>
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className='map-container' />

        </div>
    );

}