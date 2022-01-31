import { useState, FunctionComponent, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddMarkerForm from './AddMarkerForm';
import AddPhotoForm from './AddPhotoForm';
import { MarkerDetails } from '../MapPage';
import { FormProps } from '../../Auth/components/LoginForm';

interface AddMarkerModalProps {
  open: boolean;
  clickedCoords: { lat: number; lng: number };
  handleClickOpen(): void;
  handleClose(): void;
  onAddMarker(newMarker: MarkerDetails | undefined): void;
}

export interface MarkerFormProps extends FormProps {
  switchForm(): void;
}

const AddMarkerModal: FunctionComponent<AddMarkerModalProps> = ({
  open,
  handleClickOpen,
  handleClose,
  clickedCoords,
  onAddMarker,
}) => {
  const [loading, setLoading] = useState(false);
  const [showMarkerForm, setShowMarkerForm] = useState(true);
  // const [markerId, setMarkerId] = useState('');
  const markerRef = useRef<MarkerDetails>();

  const storeMarkerRef = (marker: MarkerDetails) => {
    markerRef.current = marker;
  };

  const addMarker = () => {
    onAddMarker(markerRef.current);
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
              markerId={markerRef.current?.id}
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
