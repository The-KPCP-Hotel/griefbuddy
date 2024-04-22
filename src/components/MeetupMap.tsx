import React = require("react");
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import axios from "axios";
import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = 'pk.eyJ1Ijoia3ljb2RlZSIsImEiOiJjbHJxcjd0ZXAwNmFzMmpvZDV1d2x3MjBwIn0.MbKRBF8mWxCmRX0P0qIIsA';
function MeetupMap() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-90.0389);
    const [lat, setLat] = useState(29.9923);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/navigation-night-v1',
          center: [lng, lat],
          zoom: zoom
        });
        map.current.on('click', (e: any) => {
            setLat(e.lngLat.lat)
            setLng(e.lngLat.lng)
        })
    });
    
    useEffect(() => {
        mapClick()
    }, [lat])

    function mapClick() {
        console.log(`lng: ${lng} lat: ${lat}`)
        
    }  

      return (
        <ChakraProvider>
          <Container maxW="7xl">
            <div ref={mapContainer} className="map-container" style={{height: "600px"}}/>
            <h1>Map</h1>
            <p>{`lng: ${lng}, lat: ${lat}`}</p>
          </Container>  
        </ChakraProvider>
      );

}
export default MeetupMap
