import { useState, FunctionComponent } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Link } from 'react-router-dom';

import { PhotoInterface } from '../../context/location-ctx';

interface PhotoProps {
  photo: PhotoInterface;
  isMapPage: boolean | undefined;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PhotoCard: FunctionComponent<PhotoProps> = ({ photo, isMapPage }) => {
  const [expanded, setExpanded] = useState(false);

  console.log(photo);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      // color={}
      variant="outlined"
      sx={{ maxWidth: 800, width: '90%', marginY: '5%' }}
    >
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={photo.title}
        subheader={
          isMapPage ? (
            <div>
              Uploaded by:{' '}
              <Link
                style={{ textDecoration: 'none' }}
                to={`/user/${photo.user?.id}`}
              >
                {photo.user?.username}
              </Link>
            </div>
          ) : (
            !isMapPage &&
            typeof photo.location !== 'string' && (
              <div>Taken at: {photo?.location?.name}</div>
            )
          )
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={'http://localhost:5000/' + photo.file}
        alt="something"
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{photo.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PhotoCard;
