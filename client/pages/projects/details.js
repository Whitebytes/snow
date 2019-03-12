/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import ProjectDetails from '../../modules/projects/ProjectDetails';
import BuObjects from '../../data/BuObjects';

import { connect } from "react-redux";

const objName = 'singleProject'


class index extends React.Component {
  static getInitialProps({query}) {
    return {...query, ...this.props}
  }

  getItems = ()=>{
    if (!this.props.data)
      return null;
    return this.props.data.slice(0,10).map((item)=>{
      return (<ProjectDetails key={item.id} project={item} url={item.img}></ProjectDetails>);
    })
  }
  render() {
   
    const query = `query{queryProjects(clause:"{\\"id\\":\\"${this.props.id}\\"}"){id,name,description,createdAt,
        mapProps, img, userOwner{firstName, avatar}}}`
    return (
      <AppFrame>
        <BuObjects query={query} objectName={objName}>
         {this.getItems()}
        </BuObjects>
  
      </AppFrame>
    );
  }
}

const mapStateToProps = state => {

  return (state) => { 

      if (state.buObjects[objName])
        return {
          loadState:state.buObjects[objName].state, 
          data:state.buObjects[objName].records
        }
        return {}
  };
};

export default connect(mapStateToProps,
null
)(index);
