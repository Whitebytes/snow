/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import ProjectCard from '../../modules/projects/ProjectCard';
import BuObjects from '../../data/BuObjects';
import FileList from '../../modules/components/FileList';

import { connect } from "react-redux";

class client extends React.Component {
  static getInitialProps({query}) {
    return {...query, ...this.props}
  }

  render() {
    
    return (
      <AppFrame>
        <FileList token={this.props.id}></FileList>
      </AppFrame>
    );
  }
}

const mapStateToProps = state => {
 return (state) => { 
      if (state.buObjects.queryProjects)
        return {
          loadState:state.buObjects.queryProjects.state, 
          data:state.buObjects.queryProjects.records
        }
        return {}
  };
};

export default connect(mapStateToProps,
null
)(client);
