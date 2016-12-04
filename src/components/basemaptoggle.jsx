import React from 'react';
import watchUtils from 'esri/core/watchUtils';
import BasemapToggleViewModel from 'esri/widgets/BasemapToggle/BasemapToggleViewModel';

function bgImage(url) {
  return {
    backgroundImage: `url(${url})`
  };
}

export default class BasemapToggle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      vm: new BasemapToggleViewModel(),
      nextBasemapThumbnailUrl: '',
      activeBasemapThumbnailUrl:''
    };
  }
  static defaultProps = {
      view: {},
      nextBasemapThumbnailUrl: '',
      aciveBasemapThumbnailUrl: '',
      updating: false
  };
  updateThumbnails = (secondary, current)=> {
    let secInfo = this.state.vm.getBasemapInfo(secondary);
    let curInfo = this.state.vm.getBasemapInfo(current);
    this.setState({
      nextBasemapThumbnailUrl: secInfo.thumbnailUrl,
      activeBasemapThumbnailUrl: curInfo.thumbnailUrl
    });
  }

  toggle = ()=> {
    this.state.vm.toggle();
  } 
  
  componentDidMount() {
    this.props.view.then(view => {

      this.state.vm.view = view;
      this.state.vm.nextBasemap = this.props.secondaryBasemap;

      let { nextBasemap, activeBasemap } = this.state.vm;

      let info = this.state.vm.getBasemapInfo(this.props.secondaryBasemap || 'topo');

      this.setState({
        nextBasemapThumbnailUrl: info.thumbnailUrl,
        aciveBasemapThumbnailUrl: this.state.vm.activeBasemap.thumbnailUrl
      });

      watchUtils.watch(this.state.vm, 'nextBasemap', this.updateThumbnails);
      watchUtils.init(view, 'stationary', (updating) => {
        this.setState({ updating });
      });

    });
  }

  render() {

    let active = bgImage(this.state.activeBasemapThumbnailUrl);

    let next = bgImage(this.state.nextBasemapThumbnailUrl);

    let style = this.state.updating ? 'basemap-container' : 'basemap-container view-busy';

    return (

      <div className={style}>
        <div className='basemap-item basemap-item-secondary' onClick={this.toggle} style={next}></div>
        <div className='basemap-item basemap-item-current' style={active}></div>
      </div>

    );

  }

};
