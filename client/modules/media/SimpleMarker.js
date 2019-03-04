import React from 'react';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import { withStyles } from '@material-ui/core/styles';
import { Motion } from 'react-motion';
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
  }
});

export const simpleMarker = ({
  classes,
  defaultMotionStyle, motionStyle, url
}) => (
  <Motion
    defaultStyle={defaultMotionStyle}
    style={motionStyle}
  >
  {
    ({ scale }) => {
       return (
      <div
        className={classes.marker}
        style={{
          transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
          backgroundImage:url
        }}
      >
      <img src={url} />
      </div>
    )}
  }
  </Motion>
);

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