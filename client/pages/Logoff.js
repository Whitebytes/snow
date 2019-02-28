import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import LockOpenRounded from '@material-ui/icons/LockOpenRounded'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Router from 'next/router'
import gql from "graphql-tag";
import ApiClient  from '../modules/ApiClient.js';


const logoffMutation =gql`mutation a{logout }`
const client = new ApiClient();

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  smallLink:
            {...theme.typography.body2,
            ...{'color': theme.palette.primary.light,
            float: 'right',
            marginTop: theme.spacing.unit,
            textDecoration:'none'}}
});
 
class Logoff extends Component{
  handleSubmit = event => {
    event.preventDefault()
    client.mutate({
            mutation:logoffMutation
        })
        .then(result => {
            Router.push(`/Login`)
        })
  }
    
    render(){
        const { classes } = this.props;
        var logoutForm = (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOpenRounded/>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign out
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit} >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign out
                  </Button>
                </form>
              </Paper>
            </main>
          </React.Fragment>
        )
      return logoutForm
    }
}

Logoff.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Logoff);