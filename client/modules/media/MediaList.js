
import MediaCard from '../../modules/media/MediaCard';
const  MediaList =  ({mediaItems, take=30, ...props}) => {
  return mediaItems.slice(0,take).map( item =>{return <MediaCard key={item.id} media={item} {...props} ></MediaCard>})
}

export default MediaList;