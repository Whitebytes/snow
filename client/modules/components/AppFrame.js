import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import BreadCrumbs from './BreadCrumbs';
import ProfileMenu from './ProfileMenu';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ModuleMenu from './ModuleMenu';
import Search from './Search';
import withCTX from '../../data/WithCTX';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px 0 0px',
    ...theme.mixins.toolbar,
  },
  drawerIn:{
    flex:5
  },
 
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  removeBorder:{
    padding: 0,
    'padding-top': 64,

  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  popper:{
    padding:10
  }
});

class AppFrame extends React.Component {
  state = {
    anchorEl: null
  }
  onMnuClick= event => {
    let an = this.state.anchorEl==event.currentTarget? null : event.currentTarget;
    this.setState({ anchorEl: an });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, drawerOpen, toggleDrawer, title, popperContent, children } = this.props;
    const { anchorEl } = this.state;
    var hasMenu = Boolean(popperContent);
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, drawerOpen && classes.appBarShift)}
          >
            <Toolbar disableGutters={!drawerOpen} className={classes.toolbar}>
              <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={toggleDrawer}
                  className={classNames(
                    classes.menuButton,
                    drawerOpen && classes.menuButtonHidden,
                  )}
                >
                <MenuIcon />
              </IconButton>

              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                <BreadCrumbs/>
              </Typography>
              <Search />
              <IconButton color="inherit" enabled={hasMenu.toString()}
                onClick={this.onMnuClick}
                >
                  <MoreVertIcon />
                </IconButton>

                <Popper  open={Boolean(anchorEl)} anchorEl={anchorEl} transition  >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper className={classes.popper} >
                        <Typography className={classes.typography}>
                          {popperContent}
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
               <ProfileMenu />
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
            }}
            open={drawerOpen}
          >
            <div className={classes.toolbarIcon}>

              <div className={classes.drawerIn}></div>
              <IconButton onClick={toggleDrawer} >
                <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
              <ModuleMenu />
              </List>
            <Divider />
          
          </Drawer>
          <main className={classNames(classes.content, this.props.noBorder? classes.removeBorder:'')}>
          {this.props.noBorder ? '': <div className={classes.appBarSpacer} />}
              {children}
          </main>
        </div>
      </React.Fragment>
    );
  }
}


export default withCTX(withStyles(styles)(AppFrame))