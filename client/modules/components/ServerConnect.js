import React from 'react';
import { connect } from "react-redux";
import { logon, loggedon, connected, logoff, loggedoff} from "../../redux/actions";
import { logonStates } from "../../redux/states";
import client from "../../data/ApiClient"
import gql from "graphql-tag";
import Router from 'next/router'
import {subscribe} from '../../data/Queries'

const userQ='query{currUser{firstName, lastName, avatar}}'


class ServerConnect extends React.Component {
    constructor(props) {
        super(props);
        this.state = { attempt:'none' };
      }
 
    handleCurrState =()=>{
        const {logonState, currUser} = this.props;
        if (logonState==logonStates.LOGGEDOFF){
            if (this.state.attempt=='none'){
                this.logon();
                this.setState({attempt: 'first'})
            }
            else {
                this.setState({attempt: 'fail'})
            }
        } 
        if (logonState==logonStates.LOGGEDON){
            this.connect()
            this.setState({attempt: 'connecting'})
        }
    }
    logon = ()=>{
        const {logon, loggedon} = this.props
        logon();
        client.query({
            query: gql(userQ),
            fetchPolicy: 'no-cache'
        }).then(({data, errors}) => {
            if (errors || data.currUser==null){
                this.setState({attempt: 'fail'})
            }
             this.props.loggedon(data.currUser);
        }).catch((error)=>{
            this.setState({attempt: 'fail'})
            // Router.push('/me/Login')
        })
    }
    connect = ()=>{
        const {connected} = this.props
        client.subscribe({
            query: subscribe,
            variables: {}
            }).subscribe({
                next ({data}) {
                    if (data.actionRequest){
                        //dispatch(data.actionRequest);
                    }
                },
                error(err) { console.error('err', err); },
            })
            connected()
            
    }
  
    render() {
        const isClientSide = typeof(window)=='object'
        const isLogonPage = (isClientSide&& window.location.pathname=='/me/Login')

        if (this.state.attempt=='fail' && !isLogonPage){
            Router.push('/me/Login')
            return '';
        }
        if (this.props.logonState==logonStates.LOGGEDOFF 
            &&  isClientSide && !isLogonPage ){
                setTimeout(()=>{this.handleCurrState()})
        }
        else if(this.props.logonState==logonStates.LOGGEDON){
            setTimeout(()=>{this.handleCurrState()})
        }else if(
            isClientSide && isLogonPage && 
            this.props.logonState==logonStates.LOGGEDON ){
                setTimeout(()=>{this.handleCurrState()})
        }
        return this.props.children;
    }

}
const mapStateToProps = state => {
    return { 
      logonState: state.logon.logonState,
      currUser: state.logon.currUser
    };
};


export default connect(
    mapStateToProps,
    {logon, loggedon, connected, logoff, loggedoff}
)(ServerConnect);
 