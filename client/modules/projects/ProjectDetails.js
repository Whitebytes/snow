import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import router from 'next/router';
import BuObjects from '../../data/BuObjects';
import GMap from '../../modules/media/GMap';
import { connect } from "react-redux";
import MediaList from '../../modules/media/MediaList';


import ProjectTools from './ProjectTools'
const objName = 'mediaList'
const query = `query{queryMediaRaw(clause:"{}"){id,name,blobRef,props}}`


const styles = theme => ({
  card: {
    maxWidth:300,
    float: 'left',
    margin: 15,
    cursor:'pointer',
    flex:1
  },
  cardMap:{
    maxHeight: 450,
    margin: 15,
    float: 'left',
    flex:3
  },
  map:{
    display: 'block',
    overflow: 'hidden',
    position: 'relative',

    width:'100%',
    minWidth:500,
    margin: 15,
    height: 450,
    
  },
  mediaCard:{
    display: 'block',
    overflow: 'hidden',
    position: 'relative',

    width:'100%',
    minWidth:500,

  },
  media: {
    paddingTop: '16.25%', // 16:9
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
  canvas: {display:'flex'}
});

class ProjectDetails extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleCardClick = (id)=>{
    router.push('/projects/details?id='+id)
  }
  render() {
    const { classes, project, data, ...rest } = this.props;

    return (
    <div>
    <div  className={classes.canvas}>
      <Card className={classes.card} onClick={event =>{this.handleCardClick(project.id)}} >
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" alt={project.userOwner.firstName} src={project.userOwner.avatar} className={classes.avatar} />
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={project.name}
          subheader={ new Intl.DateTimeFormat('nl-NL',{ 
            year: 'numeric', 
            month: 'long', 
            day: '2-digit' 
        }).format(new Date(parseInt(project.createdAt)))}
        />
        <CardMedia
          className={classes.media}
          image={''+this.props.url}
          title="Paella dish"
        />
        <CardContent>
        <Typography paragraph>
            {project.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
              chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
              salt and pepper, and cook, stirring often until thickened and fragrant, about 10
              minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
           
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      
      <Card className={classes.cardMap}  >
        <CardHeader title='Media by location'
         
        />
      <CardContent  className={classes.map}>
            
      <BuObjects query={query} objectName={objName}>
      
      <GMap
        bootstrapURLKeys={{key: 'AIzaSyDKzVON9dMEWaJqWw8ARIa9wM2gU465btk'}}
        markers={data.map((elem)=>{
          var {props, ...item} = elem;
          var propObj = JSON.parse(props)
          return {
            ...propObj,
              ...item
          }
        })}
        {...rest} >
      </GMap>
      </BuObjects></CardContent></Card>
      
      
      </div>
      
      <ProjectTools name={project.name}></ProjectTools>
      <Card className={classes.mediaCard}  >
        <CardHeader
          
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
           
          }
          title={`Uploaded media`}
          ></CardHeader>
          <CardContent>
              <MediaList />
            </CardContent>
            </Card>
      </div>
      
    );
  }
}

ProjectDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
  return (state) => { 
      
      if (state.buObjects[objName])
        return {
          loadState:state.buObjects[objName].state, 
          data:state.buObjects[objName].records
        }
        return {data:[]}
  };

};


export default connect(
  mapStateToProps,
)(withStyles(styles)(ProjectDetails));

