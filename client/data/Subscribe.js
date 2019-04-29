import React from 'react';
import client from "./ApiClient"
import {currUser} from './Queries'
import { Query } from "react-apollo";
import * as PropTypes from 'prop-types';


class Subscribe extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.client = context.client;
        this.state={};
        this.client.listen(
            this.props.topic, 
            this.props.sender,
            result=>{
                this.setState(result)
            })
    }

    static contextTypes = {
        client: PropTypes.object
    };
    
    render() {
        return  <div>
            <Query query={currUser}>
             {({ data }) => {
                if (data && data.currUser && !this.client.MBconnected){
                    this.client.connectMB();
                }  
                return ''
            }}
            </Query>{this.props.children({ 
                    waiting: !this.state.sender,
                    ...this.state})}
        </div>
       
        }

}

export default Subscribe;
 