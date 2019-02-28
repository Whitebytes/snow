import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import AssignmentIcon from '@material-ui/icons/Assignment';


const names = ['Current month', 'Last quarter','Year-end sale']
export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    {
        names.map((title)=>{
            return( 
            <ListItem button key={title} >
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
            </ListItem>)
        })
   }
  </div>
);