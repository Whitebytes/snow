/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import ProjectCard from '../../modules/projects/ProjectCard';
import {projects} from '../../data/Queries'
import {Query} from 'react-apollo'

class index extends React.Component {
  static getInitialProps({query}) {
    return {query, ...this.props}
  }
 
  render() {
    return (
      <AppFrame>
        <Query query={projects} >{({data, loading})=>{
           if (loading) return "loading...";
           if (this.props.query.url)
            return <ProjectCard  url={this.props.query.url}></ProjectCard>
          return data.queryProjects.slice(0,10).map((item)=>{
            return (<ProjectCard key={item.id} project={item} url={item.img}></ProjectCard>);
          })
        }
      }
      </Query>
  
      </AppFrame>
    );
  }
}

export default index
