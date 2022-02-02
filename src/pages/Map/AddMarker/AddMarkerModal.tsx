import { useState, FunctionComponent, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddMarkerForm from './AddMarkerForm';
import AddPhotoForm from './AddPhotoForm';
import { FormProps } from '../../Auth/components/LoginForm';

interface AddMarkerModalProps {
  open: boolean;
  clickedCoords: { lat: number; lng: number };
  handleClickOpen(): void;
  handleClose(): void;
  onAddMarker(newMarker: MarkerRefInterface | undefined): void;
  fetchMarkers(): void;
}

export interface MarkerFormProps extends FormProps {
  switchForm(): void;
}

export interface MarkerRefInterface {
  marker: {
    coords: {
      lat: number;
      lng: number;
    };
    name: string;
    description: string;
  };
  photo: { title: string; url: string; description: string; user: string };
}

const AddMarkerModal: FunctionComponent<AddMarkerModalProps> = ({
  open,
  handleClickOpen,
  handleClose,
  clickedCoords,
  onAddMarker,
  fetchMarkers,
}) => {
  const [loading, setLoading] = useState(false);
  const [showMarkerForm, setShowMarkerForm] = useState(true);
  // const [markerId, setMarkerId] = useState('');
  const markerRef = useRef<MarkerRefInterface>({
    marker: {
      coords: {
        lat: 0,
        lng: 0,
      },
      name: '',
      description: '',
    },
    photo: { title: '', url: '', description: '', user: '' },
  });

  const storeMarkerRef = (newMarker: {
    coords: {
      lat: number;
      lng: number;
    };
    name: string;
    description: string;
  }): void => {
    markerRef.current.marker = newMarker;
  };

  const addPhotoToMarkerRef = (newPhoto: {
    title: string;
    url: string;
    description: string;
    user: string;
  }): void => {
    markerRef.current.photo = newPhoto;
  };

  const addMarker = () => {
    onAddMarker(markerRef?.current);
    fetchMarkers();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a Marker</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new marker at {clickedCoords.lat}, {clickedCoords.lng}?
          </DialogContentText>
          {showMarkerForm && (
            <AddMarkerForm
              clickedCoords={clickedCoords}
              loading={loading}
              toggleLoad={() => setLoading((prevState) => !prevState)}
              switchForm={() => setShowMarkerForm(false)}
              storeMarker={storeMarkerRef}

              // setMarkerId={setMarkerId}
            />
          )}
          {!showMarkerForm && (
            <AddPhotoForm
              loading={loading}
              toggleLoad={() => setLoading((prevState) => !prevState)}
              switchForm={() => setShowMarkerForm(true)}
              addPhotoToMarker={addPhotoToMarkerRef}
              addMarker={addMarker}
              closeMarkerModal={handleClose}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMarkerModal;
