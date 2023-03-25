import React from 'react';
import '../css/Map.css';
import HoverArea from './HoverArea';

function Map() {
  return (
      <div className="Map">
          <div className="background-image">
              <HoverArea text="White Glacier Nunatak" left="43.9375rem" top="7.125rem" />
              <HoverArea text="White Glacier Melt Zone" left="51.1875rem" top="21.0625rem" />
              <HoverArea text="White Glacier Moraine" left="52.625rem" top="24.2375rem" />
              <HoverArea text="Colour Lake" left="48.9375rem" top="26.4375rem" />
              <HoverArea text="Crusoe Glacier (No live-data)" left="41.375rem" top="30.875rem" />
              <HoverArea text="Erratics Island (No live-data)" left="33.8125rem" top="35.4375rem" />
          </div>
      </div>
  );
}

export default Map;