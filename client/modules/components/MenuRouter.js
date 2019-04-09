import React from 'react';
import { connect } from "react-redux";
import Router from 'next/router'
import { menuSelect, moduleSelect, menu_load, menu_loaded, menuChanged } from "../../redux/actions";
import { loadingStates } from "../../redux/states";
import apiClient from "../ApiClient"
import store from "../../redux/store";
import gql from "graphql-tag";
const moduleList = gql`query {modules{id,name,icon,menuItems{name, icon, url}}}`

export const loadMenu = ()=>{
    store.dispatch(menuChanged());
    apiClient
        .query({
          query: moduleList,
          fetchPolicy: 'no-cache'
        }) 
        .then(({data}) => {
          store.dispatch(menu_loaded(data.modules))
    }) 
}
class MenuRouter extends React.Component {
    selectMenu(){
        const {modules} = this.props;
        if (typeof(window)=='undefined')
            return;
        const url = window.location.pathname
        const urlParts = url.split('/');
        const moduleName = '/'+ urlParts[1];
        const isModuleIndexPage=urlParts.length==2;
        let currMod=null;
        let found=false
        modules.map((module)=>{
            module.menuItems.map((item)=>{
                if(item.url.startsWith(moduleName))
                    currMod = module;

                if (item.url===url){
                    found=true;
                    this.props.moduleSelect(module.name);
                    this.props.menuSelect(item.name);
                }
            })
        })
        if (!found && currMod)
        this.props.moduleSelect(currMod.name);
    }
    
    componentDidMount(){
        const {menuState, apiClient,  menu_load, menu_loaded} = this.props;
        
        Router.events.on('routeChangeComplete', () => {
            this.selectMenu()
        })
 
        if (menuState==loadingStates.UNLOADED){
            loadMenu();
        } 
    }
    render() {
        return this.props.children;
    }
}
const mapStateToProps = state => {
    return { 
      selectedMenu: state.menu.selectedMenu,
      selectedModule: state.menu.selectedModule,
      menuState: state.menu.menuState,
      modules:state.menu.modules
    };
};

const withApiClient = props => <MenuRouter apiClient={apiClient} {...props}/>

export default connect(
    mapStateToProps,
    {menuSelect, moduleSelect, menu_load, menu_loaded}
    )(withApiClient);
 