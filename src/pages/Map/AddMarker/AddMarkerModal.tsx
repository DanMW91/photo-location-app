import { useState, FunctionComponent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddMarkerForm from './AddMarkerForm';

interface AddMarkerModalProps {
  open: boolean;
  clickedCoords: { lat: number; lng: number };
  handleClickOpen(): void;
  handleClose(): void;
}

const AddMarkerModal: FunctionComponent<AddMarkerModalProps> = ({
  open,
  handleClickOpen,
  handleClose,
  clickedCoords,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new marker at {clickedCoords}?
          </DialogContentText>
          <AddMarkerForm
            loading={loading}
            toggleLoad={() => setLoading((prevState) => !prevState)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMarkerModal;
