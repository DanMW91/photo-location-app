import { useState, forwardRef, ReactElement, Ref, useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddPhotoForm from '../../../shared/components/AddPhotoForm';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import LocationContext from '../../../context/location-ctx';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPhotoModal = ({ locationName }: { locationName: string }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { location } = useContext(LocationContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPhotoToLocation = async (newPhoto: {
    title: string;
    photoFile: File;
    description: string;
    user: string;
  }) => {
    console.log('in add photolocation');
    try {
      const photoData = new FormData();

      photoData.append('photoTitle', newPhoto.title);
      photoData.append('photoUser', newPhoto.user);
      photoData.append('photoDesc', newPhoto.description);
      photoData.append('photoFile', newPhoto.photoFile);

      if (location?.id) {
        const response = await fetch(
          `http://localhost:5000/photos/new/${location.id}`,
          {
            method: 'POST',
            body: photoData,
          }
        );
      }
      setLoading(false);
      // const responseData = await response.json();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Photo
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Add Photo to ${locationName}`}</DialogTitle>
        <DialogContent>
          <AddPhotoForm
            loading={loading}
            toggleLoad={() => setLoading((prevState) => !prevState)}
            addPhoto={addPhotoToLocation}
            closeModal={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPhotoModal;
