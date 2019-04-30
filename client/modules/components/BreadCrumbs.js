import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ModuleIcon from './ModuleIcon';
import withCTX from '../../data/WithCTX'


const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
  chip: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
  avatar: {
    background: 'none',
    marginRight: -theme.spacing.unit * 1.5,
  },
});


function CustomBreadcrumb(props) {
  const { classes, ...rest } = props;
  return <Chip className={classes.chip} {...rest} />;
}

CustomBreadcrumb.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledBreadcrumb = withStyles(styles)(CustomBreadcrumb);

class MuBreadCrumbs extends React.Component {
  render(){
    const {classes, modules, currMenu, currModule} =  this.props
    if (!modules || !currModule)
      return '';
     
    return (
      
        <Breadcrumbs arial-label="Breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="/"
            label="Home"
            avatar={
              <Avatar className={classes.avatar}>
                <HomeIcon />
              </Avatar>
            }
          />
          {currModule.mainItem ? <StyledBreadcrumb
            component="a"
            href={currModule.mainItem.url}
            label={currModule.name}
            avatar={
              <Avatar className={classes.avatar}>
                 <ModuleIcon path={currModule.icon} />
              </Avatar>
            }
          /> :''}
      
          { ( currMenu && currMenu != currModule.mainItem) ?  <StyledBreadcrumb
            label={currMenu.name}
            href={currMenu.icon}
            avatar={
              <Avatar className={classes.avatar}>
                <ModuleIcon path={currMenu.icon} />
              </Avatar>
            }
          /> :''}
        </Breadcrumbs>

    );
  }
}


export default  withCTX(withStyles(styles)(MuBreadCrumbs))