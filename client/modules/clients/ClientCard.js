import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

import SaveAlt from '@material-ui/icons/SaveAlt';
import router from 'next/router';

const styles = theme => ({
  card: {
    maxWidth: 300,
    float: 'left',
    margin: 15,
    cursor:'pointer'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ClientCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleCardClick = (item)=>{
    const link = document.createElement('a');
    link.href = `static/os/`+item.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  render() {
    const { classes, osData } = this.props;

    return (
      <Card className={classes.card} onClick={event =>{this.handleCardClick(osData)}} >
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" alt={osData.className} src={osData.img} className={classes.avatar} />
          }
          title={osData.name}
          subheader={osData.instruction}
        />
        <CardMedia
          className={classes.media}
          image={'static/os/tools.jpg'}
          title="Tools"
        />
        <CardContent>
        <Typography paragraph>
            {osData.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
         
          <IconButton aria-label="Share">
            <SaveAlt />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ClientCard);
