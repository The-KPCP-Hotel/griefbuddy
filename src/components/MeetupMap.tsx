import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
import { ChakraProvider, Container } from '@chakra-ui/react';
// import mapboxgl from 'mapbox-gl';
// import axios from 'axios';

function MeetupMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-90.0389);
  const [lat, setLat] = useState(29.9923);
  // eslint fix: setZoom wasn't called so just hard coded 10 for now
  // const [zoom, setZoom] = useState(10);

  useEffect(() => {
    import('mapbox-gl').then(({ default: mapboxgl }) => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        accessToken: 'pk.eyJ1Ijoia3ljb2RlZSIsImEiOiJjbHJxcjd0ZXAwNmFzMmpvZDV1d2x3MjBwIn0.MbKRBF8mWxCmRX0P0qIIsA',
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/navigation-night-v1',
        center: [lng, lat],
        // zoom: zoom,
        zoom: 10,
      });
      map.current.on('click', (e: any) => {
        setLat(e.lngLat.lat);
        setLng(e.lngLat.lng);
      });
    });
  }, [lat, lng]);

  // eslint fix - mapClick was declared after its usage, moved func block to use effect
  // function mapClick() {
  //   console.log(`lng: ${lng} lat: ${lat}`);
  // }

  useEffect(() => {
    // mapClick();
    console.log(`lng: ${lng} lat: ${lat}`);
    // eslint fix - added lng to dependencies
  }, [lat, lng]);

  return (
    <ChakraProvider>
      <Container maxW="7xl">
        <div ref={mapContainer} className="map-container" style={{ height: '600px' }} />
        <h1>Map</h1>
        <p>{`lng: ${lng}, lat: ${lat}`}</p>
      </Container>
    </ChakraProvider>
  );
}
export default MeetupMap;
