/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import ProjectCard from '../../modules/projects/ProjectCard';
import BuObjects from '../../data/BuObjects';

import { connect } from "react-redux";
const query = `query{queryProjects(clause:"{}"){id,name,description,createdAt,
  mapProps, img, userOwner{firstName, avatar}}}`



class index extends React.Component {
  static getInitialProps({query}) {
    return {query, ...this.props}
  }

  getItems = ()=>{
    if (this.props.query.url)
      return <ProjectCard  url={this.props.query.url}></ProjectCard>
    if (!this.props.data)
      return null;
    return this.props.data.slice(0,10).map((item)=>{
      return (<ProjectCard key={item.id} project={item} url={item.img}></ProjectCard>);
    })
  }
  render() {
    return (
      <AppFrame>
        <BuObjects query={query} objectName="queryProjects">
         {this.getItems()}
        </BuObjects>
  
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
)(index);
