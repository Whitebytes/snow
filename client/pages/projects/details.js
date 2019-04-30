/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import ProjectDetails from '../../modules/projects/ProjectDetails';
import {projects} from '../../data/Queries'
import {Query} from 'react-apollo'


class index extends React.Component {
  static getInitialProps({query}) {
    return {...query, ...this.props}
  }

  render() {

    return (
      <AppFrame>
        <Query query={projects} >{({data, loading})=>{
          
            if (loading) return "loading...";
              return data.queryProjects.map((project)=>  <ProjectDetails key={project.id} project={project} ></ProjectDetails>)
     
        }
      }
      </Query>
  
      </AppFrame>
    );
  }
}


export default index