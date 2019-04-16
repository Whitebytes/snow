const inquirer   = require('inquirer');
const os   = require('os');
import settings  from './Settings';
import client  from './Subscriptions';
import gql from "graphql-tag";
const userQ='query{currUser{firstName, lastName}}'
const query=`mutation login(
  $email: String!,
  $password: String!,
  $appName: String!,
  $appProps: String!,
){login(
  email:$email,
  password:$password,
  appName:$appName,
  appProps:$appProps
) }`

export default  async () => {
  var token = settings.get('token');
  if (token){
    var currUser = await client
    .query({query: gql(userQ)})
      .then((res)=>{
        return res.data.currUser;
    }).catch(error => {
      //invalid token
      settings.set('token',null);
      settings.save();
    });
    if (currUser)
      return currUser;
  }
  var token = settings.set('token', null);

  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your e-mail address:',
      validate: function( value ) {
      return true;
     }
    },
    {
      name: 'password',
      type: 'password',
      mask: '*',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true; 
        } else {
          return 'Please enter your password.';
        }
      }
    }
  ];
  var count=0;
  let user;
  while(count++<3){
    var credits = await inquirer.prompt(questions);
    
    user = await client
      .mutate({mutation: gql(query), variables:{
        email: credits.username ||'geertjan@whitebytes.nl',
        password: credits.password,
        appName: 'CLI',
        appProps: JSON.stringify({
          hostname: os.hostname()
        })
      }}) 
      .then(async (rest) => {
        settings.set('token',rest.data.login);
        settings.save();
        return await client.query({query: gql(userQ), fetchPolicy:'no-cache'})
          .then((res)=>{
            console.log(res)
            return res.data.currUser;
        })
      }).catch(error =>{console.log(error)})
      if (user)
        return user;
  }
  console.log('No valid creditials, leaving now..')
}
