import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Paper,Typography,useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from "@material-ui/lab";
import useStyles from './styles';
import { mapStyles } from "./mapStyles";

const Map=({setCoordinates,setBound,coordinates,places,setChildClicked})=>{
    const classes=useStyles();
    const isDesktop=useMediaQuery('(min-width:600px)');
    
    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact 
            bootstrapURLKeys={{ key:'AIzaSyBt35o_IWLKzRrZV7sKjG_lIFm9-ZLTjBc'}}
            defaultCenter={coordinates}
                center={coordinates}  
                defaultZoom={14}
                margin={[50, 50, 50, 50]}
                options={{disableDefaultUI:true,zoomControl:true,styles:mapStyles}}
                onChange={(e)=>{
                    setCoordinates({lat:e.center.lat,lng:e.center.lng});
                    setBound({ne:e.marginBounds.ne, sw:e.marginBounds.sw});
                }}
                onChildClick={(child)=>setChildClicked(child)}
            >
                {places?.map((place,i)=>(
                    <div
                    className={classes.markerContainer} 
                    lat={Number(place.latitude)} 
                     lng={Number(place.longitude)}
                    key={i}
                    >{
                        !isDesktop ?(
                            <LocationOnOutlinedIcon color="primary" fontSize="large"/>
                        ): (<Paper elevation={3} className={classes.paper}>
                            <Typography className={classes.typography} variant="subtitle2" gutterBottom>{place.name}</Typography>
                            <img className={classes.pointer}
                            src={place.photo ? place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                            alt={place.name}
                            />
                            <Rating size="small" value={Number(place.rating)} readOnly/>
                        </Paper>)
                    } </div>
                ))}
            </GoogleMapReact>
        </div>
    );
}
export default Map;