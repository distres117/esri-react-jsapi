import React from 'react';
import Legend from 'esri/widgets/Legend';

export default class LegendComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.view.then(view=>{
            let legend = new Legend({ view });
            this.refs.lg.appendChild(legend.domNode);
        });
    }

    render() {
        return (
            <div ref='lg' className='legend-pane'></div>
        )
    }
}