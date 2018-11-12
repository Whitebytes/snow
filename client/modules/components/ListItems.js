import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

const mainItems =[
    {icon: <DashboardIcon />, title:'Dashboard'},
    {icon: <ShoppingCartIcon />, title:'Orders'},
    {icon: <PeopleIcon />, title:'Customers'},
    {icon: <BarChartIcon />, title:'Reports'},
    {icon: <LayersIcon />, title:'Integrations'},
]
export const mainListItems = (
  <div>
     { mainItems.map((item)=>{
         return (
    <ListItem button>
      <ListItemIcon>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.title}/>
    </ListItem>)
    })}
  </div>
);

const names = ['Current month', 'Last quarter','Year-end sale']
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    {
        names.map((title)=>{
            return( 
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>)
        })
   }
  </div>
);