import React, { Component } from 'react';
import { menuQuery, moduleList, subscribe } from './Queries';
import { Query } from 'react-apollo';
import client from "./ApiClient";

const withCTX=(WrappedComponent)=> {
    return class extends Component{
  
    toggleDrawer(){
        let {drawerOpen,...rest} = client.readQuery({query: menuQuery})
        client.writeQuery({ query:menuQuery,data:{drawerOpen:!drawerOpen, ...rest}})   
    }
    render(){
        return  <Query query={menuQuery} >
          {({  data: menuState }) =>  (
            <Query query={moduleList}>
              {({ data, subscribeToMore, refetch, loading }) => {
                if (loading)
                return 'Loading..'
                return <WrappedComponent 
                {...data}
                {...menuState}
                toggleDrawer={this.toggleDrawer}

                subscribeToNewComments={() =>
                  subscribeToMore({
                    document: subscribe,
                    variables:{topic: 'clientConnect', sender: null},
                    updateQuery: (prev, { subscriptionData }) => {
                      refetch();
                    }
                  })
                }
              >{this.props.children}</WrappedComponent>
              }}
              </Query>)
          }
        </Query>
      }
    }
  }
  export default withCTX