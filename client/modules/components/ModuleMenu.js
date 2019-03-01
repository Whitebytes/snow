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
import { connect } from "react-redux";
import router from 'next/router';

import Link from "next/link"; 

const styles = theme => ({
    root: {
      width: '100%',  
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    details :{
        padding:0,
        display:'block'
    },
    active:{
      'background-color':'#9c27b021'
    }
  });
  
  
class ModuleMenu extends Component{
   
    state = {
      expanded: null,
    };
    
    handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      });
    };
    menuClick = (item)=>{
      router.push('/media/Upload');

    }

    render() {
        const { classes, drawerOpen } = this.props;
        const { expanded } = this.state;

        return  (<div className={classes.root}>
            {this.props.modules.map((item)=>{
              let currActive = expanded === item.name;
          return  <ExpansionPanel key={item.name} 
            expanded={currActive}
              onChange={this.handleChange(item.name)}>
              <ExpansionPanelSummary className={currActive?classes.active :''} expandIcon={<ExpandMoreIcon />}>
              <ListItemIcon>
                        <ModuleIcon path={item.icon} />
                    </ListItemIcon>
              {drawerOpen  ?
                <Typography className={classes.heading}>{item.name}</Typography> :''}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.details}>
              
                    {
                        item.menuItems.map((item) =>{
                            return   <ListItem button key={item.name} >
                            <ListItemIcon>
                                <ModuleIcon path={item.icon} />
                            </ListItemIcon>
                            {item.url.startsWith('http') ? 
                            <a href={item.url} target="_blank">
                              <ListItemText primary={item.name} />
                              </a>
                              :
                              <Link href={item.url}>
                              <ListItemText primary={item.name} />
                              </Link>}
                            </ListItem>;
                        })

                    }
             
              </ExpansionPanelDetails>
            </ExpansionPanel>
            })}
          </div>
            )
      }
  
}
const mapStateToProps = state => {
    return { drawerOpen:state.drawer.open };
};

const toExp = connect(mapStateToProps,null)(withStyles(styles)(ModuleMenu));
export default toExp;