import React, { Component } from 'react';
import { currMenu, moduleList, subscribe } from './Queries';
import { Query } from 'react-apollo';
import client from "./ApiClient";

const withCTX=(WrappedComponent)=> {
    return class extends Component{
  
    toggleDrawer(){
        let {drawerOpen,...rest} = client.readQuery({query: currMenu})
        client.writeQuery({ query:currMenu,data:{drawerOpen:!drawerOpen, ...rest}})   
    }
    render(){
        return  <Query query={currMenu} >
          {({  data: menuState }) =>  (
            <Query query={moduleList}>
              {({ data, subscribeToMore, refetch }) => 
               <WrappedComponent 
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
              }
              </Query>)
          }
        </Query>
      }
    }
  }
  export default withCTX