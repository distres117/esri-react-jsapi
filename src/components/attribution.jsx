import React from 'react';
import watchUtils from 'esri/core/watchUtils';
import AttributionViewModel from 'esri/widgets/Attribution/AttributionViewModel';

export default class Attribution extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      vm: new AttributionViewModel(),
      attribution: '',
      updating: false
    }
    this.props = {
      view:{}
    }
  }

  componentDidMount() {
    this.props.view.then(view => {
      this.state.vm.view = view;
      watchUtils.watch(this.state.vm, 'attributionText', (attribution) => {
        this.setState({ attribution });
      });
      watchUtils.init(view, 'stationary', (updating) => {
        this.setState({ updating });
      });
    });
  }

  render() {

    let style = this.state.updating ? 'attribution' : 'attribution view-busy';

    return (

      <span className={style} ref='mainNode'>{this.state.attribution}</span>

    );

  }

};