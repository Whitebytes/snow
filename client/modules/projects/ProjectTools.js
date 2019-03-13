import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Subscriptions from '@material-ui/icons/Subscriptions';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ColorLens from '@material-ui/icons/ColorLens';
import YoutubeSearch from '@material-ui/icons/YoutubeSearchedFor';

import Chip from '@material-ui/core/Chip';
import ReactPlayer from 'react-player'
 

const styles = theme => ({
    card: {
      margin: 10
    },
    cardTool: {
        margin: 10,
        height: 350,
        flex:1
      },
      chip:{
          margin:3,
          float: 'left'
      },
    media:{
        height:150
    }   ,
    toolItemDragging:{
        userSelect: 'none',
        background: theme.palette.primary.main
    },
    list:{
        background: theme.palette.primary.light,
        display: 'flex'
    },
    listIsDragging:{
        background: theme.palette.primary.dark
    }
  });

const tools=[
    {
        id:1,
        name:"Thumbnailing",
        state:'ready',
        progress: 100,
        results: 'ok',
        index: 0,
        icon: <ThumbUpAlt />,
        tags: ['thumbnailed'],
        imgUrl: 'https://www.quickmovenow.com/wp-content/uploads/2016/07/Selling-a-house-to-downsize-Types-of-property-300x170.jpg'

    },
    
    {
        id:3,
        name:"3D stitching",
        state:'ready to stitch',
        progress: 0,
        results: 'waiting',
        index: 2,
        icon: <Subscriptions />,
        tags: ['stitched', 'rendered', 'mapoverlay'],
        imgUrl: 'https://cmsassets.mybluprint.com/dims4/default/a62692b/2147483647/strip/true/crop/434x259+0+87/resize/1440x860!/quality/90/?url=https%3A%2F%2Fcmsassets.mybluprint.com%2Fe5%2F41%2F679afbc24d09b691b5f6dba84960%2Fhandembroiderystitches-line-of-hand-embroidered-back-stitching-null-2f7088de-f469-435e-aa22-c6b742770220.jpg'
       
    },
    {
        id:4,
        name:"Color enhancer",
        state:'ready',
        progress: 0,
        results: 'ok',
        index: 3,
        icon: <ColorLens />,
        tags: ['autocolored'],
        imgUrl:'https://allnaturalpetcare.com/blog/wp-content/uploads/2013/12/Color_Enhancing_Rainbowfish_Food.jpg'
    },
    {
        id:5,
        name:"Stern counter",
        state:'ready',
        progress: 0,
        results: 'counted:10',
        index: 3,
        isYT:true,
        icon: <YoutubeSearch />,
        tags: ['sterns found', 'sterns counted'],
        imgUrl:'http://www.welkevogelisdit.nl/sites/default/files/dougallstern1.jpg' 
    }
    

];


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  flex:1,
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  display: 'flex',
  overflow: 'auto',
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: tools,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
   
    this.setState({
      items,
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
      const {classes} = this.props
    return (
        <Card className={classes.card}  >
        <CardHeader
          
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
           
          }
          title={`Media tools for project ${this.props.name}`}
          subheader="Configure media intelligence to apply on new media for this project (drag to change order)"
          ></CardHeader>
          <CardContent>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
              className={snapshot.isDraggingOver ? classes.listIsDragging : classes.list}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={snapshot.isDragging ? classes.toolItemDragging : ''}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                     <Card className={classes.cardTool}  >
                        <CardHeader
                        action={
                            <IconButton>
                            {item.icon}
                            </IconButton>
                        
                        }
                        title={item.name}
                        subheader={"state: "+item.state}
                        ></CardHeader>{item.isYT? <ReactPlayer width="100%" height="200" url='https://www.youtube.com/watch?v=64NoQCeKXuY' playing />:
                         <CardMedia
                            className={classes.media}
                            image={item.imgUrl}
                            title="Paella dish"
                      /> }
                        <CardContent>
                        <Typography >
                            Outputted tags
                        </Typography>
                            {item.tags.map(tag=>{
                            return <Chip key={tag} label={tag} className={classes.chip} icon={<CheckCircle/>}></Chip>
                            })}
                        </CardContent>
                        </Card>
                     
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </CardContent></Card>
    );
  }
}

export default withStyles(styles)(App);



