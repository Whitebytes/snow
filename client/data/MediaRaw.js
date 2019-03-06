import React, { Component } from 'react'
import { connect } from "react-redux";
import {loadingStates} from "../redux/states"; 

import gql from "graphql-tag";
import { gql_load, gql_received} from "../redux/actions";
import { type } from 'os';
const mediaList = gql`query{queryMediaRaw(clause:"{}"){id,name,blobRef,props}}`


class MediaRaw extends Component{
    componentDidMount(){
        const {apiClient}  = this.props;
        if (this.props.loadState==loadingStates.UNLOADED){
            this.props.gql_load();
            
            apiClient
                .query({query: mediaList}) 
                .then((rest) => {
        
                    this.props.gql_received(rest.data.queryMediaRaw);
            })
        } 
    }

    render() {  
        const { children,...props } = this.props;
        return children;
    }
    
}

const mapStateToProps = state => {
    return { 
        loadState:state.mediaRaw.loadState, 
        data:state.mediaRaw.records
    };
};
  
export default connect(
    mapStateToProps,
    {  gql_load, gql_received }
  )(MediaRaw);
