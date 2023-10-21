import React,{useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Typography, AppBar, Box, InputBase, Toolbar } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
const Header = ({setCoordinates}) => {
    const classes=useStyles();
    const [autoComplete, setautoComplete] = useState(null);
    const onLoad=(autoC)=> setautoComplete(autoC);
    const onPlaceChanged = () => {
  console.log({autoComplete}); // Debug line
  if (autoComplete && autoComplete.getPlace) {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  } else {
    console.error('AutoComplete or getPlace is undefined.');
  }
};
    return (
    <AppBar position="static">
        <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}>Safar</Typography>
            <Box display="flex">
                <Typography variant="h6" className={classes.title}>Safar Karo, Suffer Nahi</Typography>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder="Search..." classes={{root:classes.inputRoot,input:classes.inputInput}}/>
                    </div>
                </Autocomplete>
            </Box>
        </Toolbar>
    </AppBar>
    );
}
export default Header;