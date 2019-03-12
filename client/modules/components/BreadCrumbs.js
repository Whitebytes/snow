import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ModuleIcon from './ModuleIcon';
import { connect } from "react-redux";

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

      const { classes,modules, selectedMenu, selectedModule } = this.props;
      
       let currMod, currMenu
       modules.map((module)=>{
          if (module.name==selectedModule) currMod=module;
          module.menuItems.map((item)=>{
            if (item.name==selectedMenu) currMenu=item;
            if (item.url.split('/').length==2)
              module.mainItem = item
          })
      })
      if (!currMod)
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
          <StyledBreadcrumb
            component="a"
            href={currMod.mainItem.url}
            label={currMod.name}
            avatar={
              <Avatar className={classes.avatar}>
                 <ModuleIcon path={currMod.icon} />
              </Avatar>
            }
          />
      
          { ( currMenu && currMenu != currMod.mainItem) ?  <StyledBreadcrumb
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

MuBreadCrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return { drawerOpen:state.menu.drawerOpen, 
        selectedMenu: state.menu.selectedMenu,
        selectedModule: state.menu.selectedModule,
        modules: state.menu.modules,
     };
  };
  
export default connect(mapStateToProps,null)(
    withStyles(styles)(MuBreadCrumbs)
    );