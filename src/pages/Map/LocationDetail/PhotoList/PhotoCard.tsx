import { useState, FunctionComponent, useEffect } from 'react';
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
import { USERS, UserInterface } from '../../../Auth/components/LoginForm';
import { Link } from 'react-router-dom';

interface PhotoProps {
  photo: { title: string; url: string; description: string; userId: string };
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
  const [user, setUser] = useState<UserInterface | undefined>();

  useEffect(() => {
    const photoUser: UserInterface | undefined = USERS.find(
      (user) => user.userId === photo.userId
    );
    setUser(photoUser);
  }, [photo.userId]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      // color={}
      variant="outlined"
      sx={{ maxWidth: 800, width: '90%', marginTop: '5%' }}
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
          isMapPage && (
            <div>
              Uploaded by:{' '}
              <Link
                style={{ textDecoration: 'none' }}
                to={`/user/${user?.userId}`}
              >
                {user?.username}
              </Link>
            </div>
          )
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={photo.url}
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
