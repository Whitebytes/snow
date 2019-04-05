import React, { Component } from 'react'
import { connect } from "react-redux";
import {loadingStates} from "../redux/states"; 
import gql from "graphql-tag";
import { buo_load, buo_received} from "../redux/actions";
import apiClient from "../modules/ApiClient"

class BuObjects extends Component{
    componentDidMount(){
        const { objectName, query}  = this.props;
        if (!this.props.buObjects[objectName]){
            this.props.buo_load({name:objectName, query:query});
        } else if (this.props.buObjects[objectName].query ==query){
            return;
        }else {
            this.props.buo_load({name:objectName, query:query});
        }
        apiClient
            .query({query: gql(query)}) 
            .then((rest) => {
                let tableName 
                for(tableName in rest.data);
                this.props.buo_received({
                    name: objectName,
                    records: rest.data[tableName]});
            })
        }
    render() {  
        const { children,...props } = this.props;
        return children;
    }
    
}

const mapStateToProps = state => {

    return state => { 
        return {
            buObjects:state.buObjects
        }
    };
};


export default connect(
    mapStateToProps,
    { buo_load, buo_received }
  )(BuObjects);
