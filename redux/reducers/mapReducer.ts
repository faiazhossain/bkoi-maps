import { MAP_API_ACCESS_TOKEN } from "@/app.config";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: [],
  selectedLocation: null,
  searchedMapData: null,
  nearBySearchedLocation: null,
  nearByClickedLocation: null,
  nearByButton: "",
  mapData: null,
  mapStyle: null,
  geoData: null,
  searchPlaces: [],
  selectLocationFrom: null,
  selectLocationTo: null,
  reverseGeoCode: null,
  uCode: null,
  uCodeMarker: null,
  reverseGeoPopupInfo: null,
  mapVisibility: true,
  reverseGeoLngLat: null,
  mapLayer: `https://map.barikoi.com/styles/osm-liberty/style.json?key=${MAP_API_ACCESS_TOKEN}`,
  selectedMarker: true,
  rupantorData: null,
  selectedIconUCode: null,
  toggleDistanceButton: true,
  carTime: false,
  bikeTime: false,
  motorCycleTime: false,
  uCodeForLink: null,
  usageData:null,
  reverseGeoNearButton: false,
  cursor:'default',
  mapillaryData:false,
  polyGonData:null,
  singleMapillaryData:null,
  imgId:null,
  scatterData:null,
};

const mapSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setCarTime: (state, action) => {
      state.carTime = action.payload;
    },
    setBikeTime: (state, action) => {
      state.bikeTime = action.payload;
    },
    setMotorCycleTime: (state, action) => {
      state.motorCycleTime = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setNearBySearchedLocation: (state, action) => {
      state.nearBySearchedLocation = action.payload;
          
    },
    setNearByClickedLocation: (state, action) => {
      state.nearByClickedLocation = action.payload;
      
    },
    // For No near by "INFO" Found
    setNearByButton: (state, action) => {
      state.nearByButton = action.payload;
    },
    setToggleDistanceButton: (state, action) => {
      state.toggleDistanceButton = action.payload;
    },
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;

    },
    setSearchedMapData: (state, action) => {
      state.searchedMapData = action.payload;
    },
    setMapData: (state, action) => {
      state.mapData = action.payload;
    },
    setMapStyle: (state, action) => {
      state.mapStyle = action.payload;
    },
    setGeoData: (state, action) => {
      state.geoData = action.payload;
    },
    setSearchPlaces: (state, action) => {
      state.searchPlaces = action.payload;
    },
    // Distance Matrix from part
    setSelectLocationFrom: (state, action) => {
      state.selectLocationFrom = action.payload;
    },
    setSelectLocationTo: (state, action) => {
      state.selectLocationTo = action.payload;
    },
    setReverseGeoCode: (state, action) => {
      state.reverseGeoCode = action.payload;
    },
    setUCode: (state, action) => {
      state.uCode = action.payload;

    },
    setUCodeMarker: (state, action) => {
      state.uCodeMarker = action.payload;
    },
    setReverseGeoPopupInfo: (state, action) => {
      state.reverseGeoPopupInfo = action.payload;
    },
    setMapVisibility: (state, action) => {
      state.mapVisibility = action.payload;
    },
    setReverseGeoLngLat: (state, action) => {
      state.reverseGeoLngLat = action.payload;
      
    },
    setMapLayer: (state, action) => {
      state.mapLayer = action.payload;
    },
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
    setRupantorData: (state, action) => {
      state.rupantorData = action.payload;
    },
    setSelectedIconUCode: (state, action) => {
      state.selectedIconUCode = action.payload;
    },
    setuCodeForLink: (state, action) => {
      state.uCodeForLink = action.payload;
    }, 
    setUsageData: (state, action) => {
      state.usageData = action.payload;
    },
    setReverseGeoNearButton: (state, action) => {
      state.reverseGeoNearButton = action.payload;
    },
    setPolyGonData: (state, action) => {
      state.polyGonData = action.payload;
    },
    
    setMapillaryData: (state, action) => {
      state.mapillaryData = action.payload;
    },    
    
    setSingleMapillaryData: (state, action) => {
      state.singleMapillaryData = action.payload;
    },
    setImgId: (state, action) => {
      state.imgId = action.payload;
    }, 
    setScatterData: (state, action) => {
      state.scatterData = action.payload;
      // console.log(action.payload)
    },
  },
});

export const {
  setCarTime,
  setBikeTime,
  setMotorCycleTime,
  setSearch,
  setSelectedLocation,
  setSearchedMapData,
  setMapData,
  setMapStyle,
  setGeoData,
  setSearchPlaces,
  setSelectLocationFrom,
  setSelectLocationTo,
  setReverseGeoCode,
  setUCode,
  setUCodeMarker,
  setReverseGeoPopupInfo,
  setMapVisibility,
  setReverseGeoLngLat,
  setMapLayer,
  setSelectedMarker,
  setRupantorData,
  setNearBySearchedLocation,
  setNearByClickedLocation,
  setSelectedIconUCode,
  setNearByButton,
  setToggleDistanceButton,
  setuCodeForLink,
  setUsageData,
  setReverseGeoNearButton,
  setPolyGonData,
  setMapillaryData,
  setSingleMapillaryData,
  setImgId,
  setScatterData
} = mapSlice.actions;
export default mapSlice.reducer;
