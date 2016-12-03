import React from 'react';
import ReactDOM from 'react/react-dom';
import MapView from 'esri/views/MapView';

export default class Map extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this.refs.mapView);
    var view = new MapView({
      container: node,
      map: this.props.map,
      center: [-100.33, 25.69],
      zoom: 10,
      ui: {
        components: []
      }
    });
  }

  render() {

    return (
      <div className='mapView' ref='mapView'>
      </div>
    );

  }
};
