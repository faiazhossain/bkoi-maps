import { API } from '@/app.config';
import { setReverseGeoCode, setReverseGeoLngLat } from '@/redux/reducers/mapReducer';
import axios from 'axios';
import React, { useEffect } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

const GeolocationComponent = () => {
  const dispatch = useDispatch();
  const onLocationSelect = ()=> {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
  
    const success = async (pos: { coords: any; }) => {
      const crd = pos.coords;
      const lat = crd?.latitude;
      const lng = crd?.longitude;
      const latNdLng = { lng, lat };
      dispatch(setReverseGeoLngLat(latNdLng));
      const headers = { headers: { Authorization: `Bearer ${ 'MjYyMzpHOVkzWFlGNjZG' }` } }
      try {
        const dataforucode = axios.get(
          `${API.REVERSE_GEO}latitude=${lat}&longitude=${lng}`,headers
        );
        dispatch(setReverseGeoCode((await dataforucode)?.data));
        dispatch(setReverseGeoLngLat(latNdLng))
      } catch (error) {
        console.error(error);
      }
    }
  
    const error = (err: { code: any; message: any; }) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  
  return (
    <div id="geoLocationContainer" style={{ position:'absolute',right:'0px',top:'220px', cursor:'pointer'}}>
      <div style={{width:'100%'}}>
      <div onClick={onLocationSelect} style={{color:'black', fontSize:'32px', borderRadius:'50%',width:'fit-content', margin:'10px', display:'inline-block'}}>
         <BiCurrentLocation></BiCurrentLocation>
         </div>
      </div>
    </div>
  );
}
 
export default GeolocationComponent;
