import React, { Component } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';


class ModuleIcon extends Component{
   
    constructor(props) {
        super(props);
        
    }
    render(){
        return React.createElement(SvgIcon, this.props, 
            React.createElement(React.Fragment, null, 
                React.createElement("path", {
                    fill: "none",
                    d: "M0 0h24v24H0z"
                }), 
                React.createElement("path", {
                    d: this.props.path
                })
            )
          )
    }
}

 
export default ModuleIcon;
