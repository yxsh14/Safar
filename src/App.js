import React, {useState,useEffect} from "react";
import { CssBaseline,Grid } from "@material-ui/core";
import Header from "./Components/Header/header";
import Map from "./Components/Map/map";
import List from "./Components/List/list";
import { getPlaceData} from "./API";
const App=()=>{
    const [places,setPlaces]=useState([]);
    const [filteredPlaces, setfilteredPlaces] = useState([]);
    const [ChildClicked,setChildClicked]=useState(null);
    
    const [coordinates,setCoordinates]=useState({});
    const [bounds,setBounds]=useState({});
    
    const [loading,setLoading]=useState(false);
    const [type,setType]=useState('restaurants');
    const [rating,setRating]=useState('');
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
            setCoordinates({lat:latitude,lng:longitude});
            
        })
    },[]);
    useEffect(()=>{
        const filteredPlaces=places?.filter((place)=>place.rating >rating);
        setfilteredPlaces(filteredPlaces);
    },[rating]); 
    useEffect(()=>{
        if (bounds.sw && bounds.ne){
        setLoading(true);
        // getWeatherData(coordinates.lat,coordinates.lng).then((data)=>setWeatherData(data));
        getPlaceData(type, bounds.sw,bounds.ne).then((data)=>{
            setPlaces(data?.filter((place)=>place.name && place.num_reviews>0));
            setfilteredPlaces([]);
            setLoading(false);
            
        })}
    },[type,bounds]);
    return(
    <>
        <CssBaseline/>
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={{width:'100%'}} >
            <Grid item xs={12} md={4}>
                <List 
                places={filteredPlaces?.length ?filteredPlaces:places} 
                ChildClicked={ChildClicked}
                loading={loading}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                />
                
            </Grid>
            <Grid item xs={12} md={8}>
                <Map 
                setCoordinates={setCoordinates} 
                setBound={setBounds} 
                coordinates={coordinates} 
                places={filteredPlaces?.length ?filteredPlaces:places} 
                setChildClicked={setChildClicked}
                />
            </Grid>
        </Grid>
    </>
    );
}
export default App;