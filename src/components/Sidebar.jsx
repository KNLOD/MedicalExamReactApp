import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <IconButton
        onClick={toggleDrawer}
        style={{ position: 'absolute', zIndex: 1, left: 10, top: 10 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        style={{ width: drawerWidth }}
      >
        <div style={{ height: 64 }} /> {/* Adjust height to match your toolbar height */}
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1">Main page</Typography>} />
          </ListItem>
          <ListItem button component={Link} to="/patients" onClick={toggleDrawer}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1">Patients</Typography>} />
          </ListItem>
          <ListItem button component={Link} to="/examinations" onClick={toggleDrawer}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1">Examinations</Typography>} />
          </ListItem>
          <ListItem button component={Link} to="/add_patient" onClick={toggleDrawer}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle1">Add Patient</Typography>} />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;
