import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useAppDispatch } from '@/features/store';
import { setCode } from '@/features/auth/auth.slice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Prop = {
    openBox : boolean,
    code : number | null | undefined
}

export default function GlobalModal({code, openBox} : Prop) {
    const dispatch = useAppDispatch()
    console.log(code)
  const [open, setOpen] = React.useState(openBox ?? false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false); dispatch(setCode(null))}

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography> Session Terminating Code</Typography>
        <Typography>Code : {code}</Typography>
        </Box>
      </Modal>
    </div>
  );
}