import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const Sidebar = () => {

    const {sidemenuOpen, closeSideMenu} = useContext(UIContext)

  return (
    <Drawer
      anchor="left"
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {menuItems.map((e, i) => (
            <ListItem button key={i}>
              <ListItemIcon>
                {i % 2 === 0 ? <MailIcon /> : <LabelImportantIcon />}
              </ListItemIcon>
              <ListItemText primary={e} />
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {menuItems.map((e, i) => (
            <ListItem button key={i}>
              <ListItemIcon>
                {i % 2 === 0 ? <MailIcon /> : <LabelImportantIcon />}
              </ListItemIcon>
              <ListItemText primary={e} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

const menuItems: string[] = [
  "Inicio",
  "Proyectos",
  "Sprints",
  "Tareas",
  "Usuarios",
];

export { Sidebar };
