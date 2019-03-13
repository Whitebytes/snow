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

  render() {
   
    const query = `query{queryProjects(clause:"{\\"id\\":\\"${this.props.id}\\"}"){id,name,description,createdAt,
        mapProps, img, userOwner{firstName, avatar}}}`
    return (
      <AppFrame>
        <BuObjects query={query} objectName={objName}>
         {this.props.data.map((project)=><ProjectDetails key={project.id} project={project} ></ProjectDetails>)}
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
        return {data:[]}
  };
};

export default connect(mapStateToProps,
null
)(index);
