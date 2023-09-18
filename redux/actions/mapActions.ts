import axios from "axios";
import {
  setGeoData,
  setPolyGonData,
  setReverseGeoCode,
  setReverseGeoLngLat,
  setSearch,
  setSearchPlaces,
  setUCode,
  setUsageData,
} from "../reducers/mapReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { API } from "@/app.config";
import { setNearBySearchedLocation } from "../reducers/mapReducer";

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSearchData(value: any) {
  return (dispatch: any) => {
    if (value) {
      const regex = new RegExp(
        '[\u0995-\u09B9\u09CE\u09DC-\u09DF]|[\u0985-\u0994]|[\u09BE-\u09CC\u09D7]|(\u09BC)|()[০-৯]'
      );
      const matches = regex.test(value);
      try {
        // if(matches===false)
        axios.get(matches===false?`${API.AUTOCOMPLETE}${value}`:`${API.AUTOCOMPLETE}${value}&bangla=true`).then((res) => {
          const results: any[] = res?.data?.places;
          const escapedValue = escapeRegExp(value);
          const newOptions: any = results?.map((result: any) => {
            const formattedAddress = result.address.replace(
              new RegExp(escapedValue, 'gi'),
              (match: any) => `<b>${match}</b>`
            );

            return {
              ...result,
              key: result.id,
              value: result.address,
              label: formattedAddress,
              longitude: Number(result.longitude),
              latitude: Number(result.latitude),
            };
          });

          dispatch(setSearch(newOptions));
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      dispatch(setSearch([]));
    }
  };
}

// For Distance Matrix Searchbar
export const handleSearchPlaces = createAsyncThunk(
  "search/searchPlaces",
  async (value: any, { dispatch }) => {
    try {
      const res = await axios.get(`${API.AUTOCOMPLETE}${value}`);
      const results: any[] = res?.data?.places;
      const newOptions: any = results?.map((result: any) => ({
        ...result,
        key: result?.id,
        value: result?.address,
        label: result?.address,
        longitude: Number(result?.longitude),
        latitude: Number(result?.latitude),
      }));
      dispatch(setSearchPlaces(newOptions));
    } catch (err) {
      console.error(err);
      message.error({ content: "Failed to get data !" });
    }
  }
);

export const handleMapData = createAsyncThunk(
  "search/mapData",
  async (data: any, { dispatch }) => {
    try {
      // const token = localStorage.getItem('admin_token');
      // console.log(token);
      const headers = { headers: { Authorization: `Bearer ${ 'MjYyMzpHOVkzWFlGNjZG' }` } }
      // const res = await axios.get(`${API.SEARCH_BY_CODE}${data}`);
      const res = await axios.get(`${ API.SEARCH_BY_CODE }/${ data }`, headers)

      // await axios.get(`${ API.USER_TRANSACTION }`, { headers: { Authorization: `Bearer ${ token }` }, params: options?.params, signal: options?.signal })

      try {
        const dataformap = await axios.get(
          `${API.REVERSE_GEO}latitude=${ res.data.latitude }&longitude=${ res.data.longitude }`
        );
        console.log(dataformap,'console 1');
        dispatch(setReverseGeoCode( dataformap?.data ));
      } catch (err) {
        console.error(err);
      }

    } catch (err) {
      console.error(err);
    }
  }
);

export const handleDistanceForCar = createAsyncThunk(
  "search/searchPlaces",
  async (data: any, { dispatch }) => {
    const { selectLocationFrom, selectLocationTo } = data;
    try {
      const res = await axios.get(
        `https://geoserver.bmapsbd.com/gh/route?point=${ selectLocationFrom?.latitude },${ selectLocationFrom?.longitude }&point=${ selectLocationTo?.latitude },${ selectLocationTo?.longitude }&locale=en-us&elevation=false&profile=car&optimize=%22true%22&use_miles=false&layer=Barikoi&points_encoded=false`
      );
      dispatch(setGeoData( res?.data ));
    } catch (err) {
      console.error(err);
    }
  }
);

export const handleDistanceForBike = createAsyncThunk(
  "search/searchPlaces",
  async (data: any, { dispatch }) => {
    const { selectLocationFrom, selectLocationTo } = data;
    try {
      const res = await axios.get(
        `https://geoserver.bmapsbd.com/gh/route?point=${selectLocationFrom?.latitude},${selectLocationFrom?.longitude}&point=${selectLocationTo?.latitude},${selectLocationTo?.longitude}&locale=en-us&elevation=false&profile=bike&optimize=%22true%22&use_miles=false&layer=Barikoi&points_encoded=false&ch.disable=true`
      );
      dispatch(setGeoData(res?.data));
    } catch (err) {
      console.error(err);
    }
  }
);

export const handleDistanceForMotorCycle = createAsyncThunk(
  "search/searchPlaces",
  async (data: any, { dispatch }) => {
    const { selectLocationFrom, selectLocationTo } = data;
    try {
      const res = await axios.get(
        `https://geoserver.bmapsbd.com/gh/route?point=${selectLocationFrom?.latitude},${selectLocationFrom?.longitude}&point=${selectLocationTo?.latitude},${selectLocationTo?.longitude}&locale=en-us&elevation=false&profile=motorcycle&optimize=%22true%22&use_miles=false&layer=Barikoi&points_encoded=false&ch.disable=true`
      );
      dispatch(setGeoData(res?.data));
    } catch (err) {
      console.error(err);
    }
  }
);

export const handleGetPlacesWthGeocode = createAsyncThunk(
  "search/searchPlacesWithGeocode",
  async (data: any, { dispatch }) => {
    const { lat, lng } = data;
    try {
      const res = await axios.get(
        `${API.REVERSE_GEO}latitude=${lat}&longitude=${lng}`
      );
      console.log(res?.data,'console 2');
      dispatch(setReverseGeoCode(res?.data));
      try {
        const polyGonArea= await axios.get(
          `https://elastic.bmapsbd.com/test/autocomplete/search?q=${res.data[0].uCode}`
        );
        dispatch(setPolyGonData(polyGonArea.data.places[0].bounds));
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  }
);

// Search By UCode

export const handleSearchedPlaceByUcode = createAsyncThunk(
  "search/searchPlaceByUcode",
  async (data: any, { dispatch }) => {

    try {
      // const token = localStorage.getItem('admin_token');
      const headers = { headers: { Authorization: `Bearer ${ 'MjYyMzpHOVkzWFlGNjZG' }` } }
      // const res = await axios.get(`${API.SEARCH_BY_CODE}${data}`);
      const res = await axios.get(`${ API.SEARCH_BY_CODE }/${ data }`, headers)

      console.log(res,'FAIAAAZ2');
      dispatch(setUCode(res?.data));
      try {
        const dataforucode = await axios.get(
          `${API.REVERSE_GEO}latitude=${res.data.latitude}&longitude=${res.data.longitude}`
        );
        console.log(dataforucode,'console 3')
        dispatch(setReverseGeoCode(dataforucode?.data));
        const data = {lat:res.data.latitude, lng:res.data.longitude}
        dispatch(setReverseGeoLngLat(data));
        try {
          const polyGonArea= await axios.get(
            `https://elastic.bmapsbd.com/test/autocomplete/search?q=${dataforucode.data[0].uCode}`
          );
          dispatch(setPolyGonData(polyGonArea.data.places[0].bounds));
        } catch (err) {
          console.error(err);
        }

      } catch (err) {
        console.error(err);
      }
    } catch (err) {

      // If get Error in UCODE then Call rupantor
      try {
        let formData = new FormData();
        formData.append("q", data);
  
        const response = await fetch(`${API.RUPANTOR}`, {
          method: "post",
          body: formData,
        });
  
        if (!response.ok) {
          // Handle non-2xx responses here
          throw new Error(`Request failed with status: ${response.status}`);
        }
  
        const responseData = await response.json();
        try {
          const dataforucode = await axios.get(
            `${API.REVERSE_GEO}latitude=${responseData.geocoded_address.latitude}&longitude=${responseData.geocoded_address.longitude}`
          );
          console.log(dataforucode,'4')
          dispatch(setReverseGeoCode(dataforucode?.data));
          const data= {lat:responseData.geocoded_address.latitude, lng:responseData.geocoded_address.longitude};
          dispatch(setReverseGeoLngLat(data))
        } catch (err) {
          console.error(err);
        }
      } catch (error) {
        console.error("Error:", error);
        // You can dispatch an action here to handle the error state if needed
      }
    }
  }
);

export const handleRupantorGeocode = createAsyncThunk(
  "search/searchPlaceByUcode",
  async (data: any, { dispatch }) => {
    try {
      let formData = new FormData();
      formData.append("q", data);

      const response = await fetch(`${API.RUPANTOR}`, {
        method: "post",
        body: formData,
      });

      if (!response.ok) {
        // Handle non-2xx responses here
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = await response.json();

      try {
        const dataforucode = await axios.get(
          `${API.REVERSE_GEO}latitude=${responseData.geocoded_address.latitude}&longitude=${responseData.geocoded_address.longitude}`
        );
        console.log(dataforucode,'5')
        dispatch(setReverseGeoCode(dataforucode?.data));
        const data= {lat:responseData.geocoded_address.latitude, lng:responseData.geocoded_address.longitude};
        dispatch(setReverseGeoLngLat(data))
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      console.error("Error:", error);
      // You can dispatch an action here to handle the error state if needed
    }
  }
);

//  For usage part when a person click on autocomplete value
export const handleUsage = createAsyncThunk(
  "search/handleUsage",
  async (data: any, { dispatch }) => {
    const formattedData = JSON.stringify(data.selectedOption, null, 2);
    let formData = new FormData();
    formData.append("date", data.formattedDate);
    formData.append("q", data.address);
    formData.append("geo_info", formattedData);

    fetch(`${API.USAGE_DATA}`, {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      // .then((response) => dispatch(setUsageData(response)))
      .then((response) => dispatch(setUsageData(response)))
      .catch((error) => console.error("Error:", error))
  }
);

// nearby part
const fetchData = async (value: any, dispatch: any) => {
  const latitude = value.latitude;
  const longitude = value.longitude;
  const q = value.value;
  const url = `${API.NEARBY_URL}`;
  const payload = new URLSearchParams();
  payload.append("latitude", latitude);
  payload.append("longitude", longitude);
  payload.append("q", q);

  if (!latitude || !longitude) {
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: payload,
    });
    const data = await response.json();

    dispatch(setNearBySearchedLocation(data));
  } catch (error) {
    console.error("Error:", error);
  }
};

export const handleFetchNearby = createAsyncThunk(
  "search/fetchNearby",
  async (data: any, { dispatch }) => {
    const { longitude, latitude, value } = data;
    try {
      await fetchData({ longitude, latitude, value }, dispatch);
    } catch (err) {
      console.error(err);
    }
  }
);
