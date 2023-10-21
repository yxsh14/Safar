import axios from "axios";

export const getPlaceData=async(type,sw,ne)=>{
    try{
        const {data:{data}}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
  params: {
    bl_latitude: sw.lat,
    tr_latitude: ne.lat,
    bl_longitude: sw.lng,
    tr_longitude: ne.lng,
  },
  headers: {
    'X-RapidAPI-Key': '81b57a6e24msha61bc1d6c92afc1p14ed36jsnbb249220c915',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
});     console.log(data);
        return data;
    }
    catch(error){
        console.log(error+' yash');
    }
}
// export const getWeatherData=async(lat,lng)=>{
//   try {
//     const {data}=await axios.get('https://weather-api99.p.rapidapi.com/weather',{
//       params: {lon:lng,lat:lat},
//   headers: {
//     'X-RapidAPI-Key': '',
//     'X-RapidAPI-Host': 'weather-api99.p.rapidapi.com'
//   }
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }


