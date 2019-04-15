/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AppFrame from '../../modules/components/AppFrame';
import ClientCard from '../../modules/clients/ClientCard';
import Typography from '@material-ui/core/Typography';
let  instruction = `Download and extract. Run the file in a known folder. After logon, an uploaddirectory will be created. Use this browser to control the uploads.`;

class index extends React.Component {
  static getInitialProps({query}) {
    let data=[
      {name:'Windows', img:'static/os/windows.jpg', version: '1.0.1', instruction:instruction, fileName:'FieldCli-win.exe'},
      {name:'Linux', img:'static/os/linux.jpg', version: '1.0.2', instruction:instruction, fileName:'FieldCli-linux'},
      {name:'OSX', img:'static/os/mac.jpg', version: '1.0.3', instruction:instruction, fileName:'FieldCli-macos'}
    ]
    return {data}
  }
  render() {
    return (
      <AppFrame>
         <Typography variant="h4" gutterBottom component="h2">
            CLI Clients download section
        </Typography>
        {this.props.data.map((item)=>{
          return (<ClientCard key={item.osName} osData={item} ></ClientCard>);
        })
       }
      </AppFrame>
    );
  }
}


export default index;
