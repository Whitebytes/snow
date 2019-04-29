import React from 'react';
import Router from 'next/router'
import {moduleList, currMenu} from "../../data/Queries";
import client from "../../data/ApiClient";
import { Query } from 'react-apollo';


class MenuRouter extends React.Component {
    selectMenu(){
        if (typeof(window)=='undefined')
            return;
        client
            .query({
                query: moduleList
            }).then(({data}) =>{
                let modules = data.modules;
                const url = window.location.pathname
                const urlParts = url.split('/');
                const moduleName = '/'+ urlParts[1];
                let curr = client.readQuery({query: currMenu})
                modules.map((module)=>{
                    module.menuItems.map((item)=>{
                        if (item.url===url){
                            client.writeQuery({query:currMenu, data:{...curr, currModule:module, currMenu: item}})
                        }else if(item.url.startsWith(moduleName)){
                            client.writeQuery({ query:currMenu,data:{...curr,currModule: module, currMenu:null}})   
                        }
                    })
                })
            })
    }
    
    componentDidMount(){
        Router.events.on('routeChangeComplete', () => {
            this.selectMenu()
        })
        this.selectMenu()
    }

    render() {
        return this.props.children
    }
}

export default MenuRouter;