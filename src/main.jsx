import React from 'react';
import ReactDOM from 'react/react-dom';
import Map from 'esri/Map';
import MapView from 'esri/views/MapView';
import WebMap from 'esri/WebMap';
import Zoom from 'app/components/zoom';
import Navbar from './components/navbar';
import Attribution from 'app/components/attribution';
import Selector from './components/selector';
import BasemapToggle from 'app/components/basemaptoggle';
import 'dojo/domReady!';

const map = new WebMap({
  portalItem: { 
    id: "f2e9b762544945f390ca4ac3671cfa72"
  }
});

const view = new MapView({
  container: document.getElementById('viewDiv'),
  map
});

ReactDOM.render(
  <div>
    <Navbar/>
    <Selector view={view}/>
  </div>,
  document.getElementById('appDiv')
);
