import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'next/link';
import client  from '../../data/ApiClient';
import Head from 'next/head'
import {clientInfo, loginMutation} from '../../data/Queries'

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
 
class SignIn extends Component{
   
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          password: "",
          error:"",
          clientInfo: null
        };
        client.query({query:clientInfo}).then(({data})=>{
          this.setState({'clientInfo': data.clientInfo})
        })
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
        event.preventDefault()
        client.mutate({
                mutation:loginMutation,
                variables:{
                    email: this.state.email,
                    password: this.state.password,
                    appName:'Browser',
                    appProps: JSON.stringify(this.state.clientInfo)
                }
            })
            .then(({data}) => {
                this.setState({error: ''})
                localStorage.setItem('token', data.login)
                if (process.browser)
                  window.location.href='/'
            
            })
            .catch((err) => {
                if (err.graphQLErrors){
                    console.log(err.graphQLErrors)
                    this.setState({error: err.graphQLErrors[0].message})
                }
                else 
                    this.setState({error: 'Sorry, something went wrong terribly wrong'})
            })
      }
   
    render(){
        const { classes } = this.props;
        var loginForm = (
          <React.Fragment>
            <CssBaseline />
            <Head><title>Login</title></Head>
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
                    type="password"
                    helperText = {this.state.error}
                    error = {this.state.error!=''}
                    />
                    {this.state.error!='' ? 
                        <Link href="/ResetPassword"  >
                            <a className={classes.smallLink}>Forgot password? Reset</a>
                        </Link> : null 
                    }
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={!this.validateForm()}
                    color="primary"
                    className={classes.submit}
                  >
                    Sign in
                  </Button>
                  <br/>
                  <Link href="/Login" >
                    <a className={classes.smallLink}>Not a member jet? Subscribe</a>
                  </Link>
                  
                </form>
              </Paper>
            </main>
          </React.Fragment>
        )

        return loginForm
    }
}


export default withStyles(styles)(SignIn)