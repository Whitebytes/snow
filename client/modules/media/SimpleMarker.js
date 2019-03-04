import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import { withStyles } from '@material-ui/core/styles';
import Link  from 'next/link';
import { clusterMarkerHOC } from './ClusterMarker.js';


const styles = theme => ({
  marker: {
   'position': 'absolute',
   'cursor': 'pointer',
   'width': 50,
   'top': '-25px',
   'left': '-20px',
   'transform-origin': '24px 64px',
   'margin': 0,
   'padding': 0
  },
  image:{
    'max-width': 50,
    'max-height': 100
  }
});

export const simpleMarker = ({
  classes, url
}) =>(
    <div
      className={classes.marker}
    >
    <Link href={'/media?url='+encodeURIComponent(url)}>
      <img src={url} className={classes.image} /></Link>
    </div>
)

export const simpleMarkerHOC = compose(
  defaultProps({
    initialScale: 0.3,
    defaultScale: 0.6,
    hoveredScale: 0.7,
  }),
  // resuse HOC
  clusterMarkerHOC
);

export default withStyles(styles)(simpleMarkerHOC(simpleMarker));