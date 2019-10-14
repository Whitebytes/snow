import React from 'react';
import Router from 'next/router'
import {moduleList, menuQuery} from "../../data/Queries";
import client from "../../data/ApiClient";

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
                let {currMenu,currModule, ...rest} = client.readQuery({query: menuQuery})
                
                let isRootItem = (urlParts.lenght==2);
    
                modules.map((module)=>{
                    module.menuItems.map((item)=>{
                        if (item.url.split('/').lenght==2){
                            module.mainItem = item;
                            if (isRootItem){ 
                                currMenu = item
                                currModule=module
                            }
                        }
                        if (item.url===url){
                           currMenu = item; 
                           currModule = module;
                        }
                    })
                })
                console.log(currMenu)
                client.writeQuery({query:menuQuery, data:{ currMenu,currModule, ...rest}})
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