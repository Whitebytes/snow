import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Cookies from 'universal-cookie';
const uuid = require('uuid/v4'); // ES5

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";
import fetch from 'node-fetch';

//var resolveUrl = require("resolve-url")
const path = require('path');

const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: 'http://localhost:3001/graphql',
      fetch,
    }),
    cache: new InMemoryCache(),
});

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
});
 
class SignIn extends Component{
    static async getInitialProps({ req }) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
        return { userAgent }
      }

    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: ""
        };
      }
      handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
      }
      validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }
      handleSubmit = event => {
        event.preventDefault();
        const cookies = new Cookies();
        var cookie = cookies.get('ClientId') || uuid()
        cookies.set('ClientId', cookie, {expires: new Date(2050,1,1)})
        console.log(this.props.userAgent)
        client.query({
                query: gql`
                query{
                    allUsers{
                      firstName
                    }
                  }                  
                `
            })
            .then(result => console.log(result));
      }
    render(){
        const { classes } = this.props;
        var result = (
          <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit} >
                  <TextField
                    id="email"
                    label="Email"
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                    required fullWidth
                    />
                    <TextField
                    id="password"
                    label="Password"
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                    required fullWidth
                    
                    />
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!this.validateForm()}
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{console.log(this.state)}}
                  >
                    Sign in
                  </Button>
                </form>
              </Paper>
            </main>
          </React.Fragment>
        )
        return result 
    }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);