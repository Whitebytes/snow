import React from 'react';
import Router from 'next/router'

import {currUser} from '../../data/Queries'
import { Query } from 'react-apollo';

class ServerConnect extends React.Component {
      render() {
          var me=this;
        const isClientSide = typeof(window)=='object'
        const isLogonPage = (isClientSide&& window.location.pathname=='/me/Login')
        if (!isClientSide)
            return this.props.children;
        return <Query query={currUser} errorPolicy="all" >{({data, error})=>{   
            if (!data)
                    return ''
                
                if (error && !isLogonPage){
                    Router.push('/me/Login')
                    return '';
                }
                return this.props.children
            }
        }</Query>
       
    }

}


export default ServerConnect