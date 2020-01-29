import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, 'left': open });
  };

  const nav = item => {
    // history.push("/"+item)
    console.log(item)
  }

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open Left</Button>
      <Drawer open={state.left} onClose={toggleDrawer(false)}>
      <div
      className={classes.list}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem button >
            <ListItemText primary='Home' onClick={nav("/home")} />
          </ListItem>
          <ListItem button >
            <ListItemText primary='Users' onClick={nav("/users")} />
          </ListItem>
          <ListItem button >
            <ListItemText primary='Datas' onClick={nav("/datas")} />
          </ListItem>
          <ListItem button >
            <ListItemText primary='Contact' onClick={nav("/contact")} />
          </ListItem>
        </List>
      </div>
      </Drawer>
    </div>
  );
}
