import React from 'react';
import LegendComp from './legend';

export default class Selector extends React.Component{
    constructor(props){
        super(props);
        this.state = {loaded:false};
    }
    componentDidMount(){
        this.props.view.then((view)=>{
            this.layers = view.map.layers.items.map(l=>l.title);
            this.setState({loaded:true});
            
        });
        
    }
    getLayers(){
        if (this.state.loaded){
            let titles = this.layers.map((l,i)=>{
                return <li className='list-group-item' key={i}>{l}<input type="checkbox"/></li>;
            });
            return <ul className='list-group'>{titles}</ul>;
        }
        return;
    }


    render(){
        return (
            <div>
                <LegendComp view={this.props.view}/>
                <div className='layer-selector'>{this.getLayers()}</div>
            </div>
            
        )
    }
}