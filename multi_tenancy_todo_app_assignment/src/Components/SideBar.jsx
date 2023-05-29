import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AddIcCall,
  Home,
  Person2,
  Settings,
  TableChart,
} from "@mui/icons-material";

const Sidebar = ({ setstate, state }) => {
  return (
    <Box sx={{ width: "240px", backgroundColor: "#00d5fa", height: "86vh" }}>
      <Box alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="h4"
          sx={{
            fontSize: "35px",
            margin: "22px",
            fontFamily: "Open Sans",
          }}
        >
          Admin DashBoard
        </Typography>
      </Box>
      <List typography="body1">
        <ListItem>
          <ListItemIcon>
            <TableChart />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              setstate(1);
            }}
            primary="User Table"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Person2 />
          </ListItemIcon>
          <ListItemText
            onClick={() => {
              setstate(2);
            }}
            primary="Add User"
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
