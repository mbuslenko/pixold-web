import './App.css';
import React from 'react';
import Globe from 'react-globe.gl'
import * as json from './test.json';

const { useState, useEffect } = React;

  const World = () => {
    const [countries, setCountries] = useState({ features: []});

    useEffect(() => {
      // load data
      setCountries(json.features)
    }, []);

    return <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      showAtmosphere={false}

      hexPolygonsData={countries}
      hexPolygonResolution={3}
      hexPolygonMargin={0.3}
      hexPolygonColor={({ properties: d }) => {
        return d.color || '#242526' }}
      //hexPolygonColor={() => `#242526`}
      hexPolygonLabel={({ properties: d }) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Population: <i>${d.POP_EST}</i>
      `}
    />;
  };

export default World