import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudOff from '@material-ui/icons/CloudOff';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';


import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
    },
    popper:{
        zIndex:10
    },
    primary: {},
    icon: {}
  });

class FileMenu extends React.Component {
    constructor(props){
        super(props)
    }
    menuItemClick(name){
        this.props.menuItemClick(name)
        this.props.toggleMenu()
    }
   
    render(){
        const {classes,menuOpen, anchorEl, toggleMenu} = this.props;
        return <Popper open={menuOpen} anchorEl={anchorEl}
            transition className={classes.popper} disablePortal  placement="bottom-end" >
            {({ TransitionProps, placement }) => (
            <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper>
                <ClickAwayListener onClickAway={toggleMenu}>
                        <MenuList>
                        <MenuItem className={classes.menuItem} onClick={()=>{this.menuItemClick('upload')}}>
                        <ListItemIcon className={classes.icon}>
                        <CloudUpload/>
                        </ListItemIcon>
                        <ListItemText  classes={{ primary: classes.primary }} inset primary="Upload" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem} onClick={()=>{this.menuItemClick('remove')}} >
                        <ListItemIcon className={classes.icon}>
                        <CloudOff/>
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} inset primary="Remove" />
                        </MenuItem>
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
    }
}

export default withStyles(styles)(FileMenu)