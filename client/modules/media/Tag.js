import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Chip from '@material-ui/core/Chip';

const tagsList = ['thumbnailed','stitched', 'rendered', 
'mapoverlay','autocolored', 'sterns found', 'sterns counted','hot storage','cold storage','video','nature','drone image',
'high-res','bird project']
 const maxTags = 5;
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max-1));
  }

  export const RandomTags = () => {
    var count = getRandomInt(Math.min(tagsList.length, maxTags));
    var source = [...tagsList]
    var result = [];
    while (count>=0){
        count--;
        result.push(source.splice(getRandomInt(source.length),1));
    }
    return result.map((tagName)=> <WithStyle tag={tagName} />
    );
}

const styles = theme => ({
  chip:{
          margin:3,
          float: 'left',
          background: theme.palette.secondary.light,
      }
  });
  
const Tag = ({tag, classes}) => <Chip key={tag} label={tag} className={classes.chip} icon={<CheckCircle/>} />

const  WithStyle =withStyles(styles)(Tag); 
export default WithStyle;



