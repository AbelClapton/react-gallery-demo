import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { FC } from "react";

type Props = {
  onAddPhoto: () => void;
};

const Navbar: FC<Props> = ({ onAddPhoto }) => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          My Gallery
        </Typography>
        <Button color="inherit" startIcon={<Add />} onClick={onAddPhoto}>
          Add Photo
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
