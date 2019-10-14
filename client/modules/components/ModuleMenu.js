import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import ModuleIcon  from './ModuleIcon.js';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from "next/link"; 

import withCTX from '../../data/WithCTX.js';


const styles = theme => ({
    root: {
      width: '100%',  
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    details :{
        padding:0,
        display:'block'
    },
    active:{
      'background-color':theme.palette.action.selected
    }
  });
  


class ModuleMenu extends Component{
  
    moduleClick = (item)=>{
      this.setState({selectedModule: item, outSync:true})
    }
    state ={
      selectedModule: this.props.selectedModule,
      outSync:false
    }
    componentDidMount(){
      // router.events.on('routeChangeComplete', (url) => {
      //   this.setState({outSync: false})
      // })
      this.props.subscribeToNewComments()
    }

    render() {
      const {classes, modules, currMenu, currModule, drawerOpen} =  this.props
      console.log(modules)
      if (!modules)
        return '';
      
      return <div className={classes.root}>{
        modules.map((item)=>{
          let currActive =  (currModule && currModule.name === item.name);
          return  <ExpansionPanel key={item.name} 
              expanded={currActive}
              onChange={ ()=> this.moduleClick(item.name)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemIcon>
                        <ModuleIcon path={item.icon} />
                    </ListItemIcon>
              {drawerOpen  ?
                <Typography className={classes.heading}>{item.name}</Typography> :''}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
                {
                  item.menuItems.map((item) =>{
                      let mnuActive = item.name==this.props.selectedMenu;
                      
                      return<ListItem button key={item.name} className={mnuActive?classes.active :''} >
                          
                      <ListItemIcon>
                          <ModuleIcon path={item.icon} /> 
                      </ListItemIcon>
                      
                      <Link href={item.url}>
                        <ListItemText primary={item.name} />
                        </Link>
                      </ListItem>;
                  })
                }
              
              </ExpansionPanelDetails>
            </ExpansionPanel>
          })
        }
       </div>
      }  
}

export default withCTX(withStyles(styles)(ModuleMenu));