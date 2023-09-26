import {
  setGeoData,
  setMapData,
  setMapVisibility,
  setNearByClickedLocation,
  setNearBySearchedLocation,
  setPolyGonData,
  setSelectLocationFrom,
  setSelectLocationTo,
  setToggleDistanceButton,
  setUCode,
} from "@/redux/reducers/mapReducer";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button } from "antd";
import React from "react";
import { FaDirections } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const ToggleButton = () => {
  const dispatch = useAppDispatch();

  // redux state
  const selectedLocation: any = useAppSelector(
    (state: { map: { selectedLocation: any; }; }) => state?.map?.selectedLocation ?? null
  );

  const revGeoData: any = useAppSelector(
    (state: { map: { reverseGeoCode: any; }; }) => state?.map?.reverseGeoCode ?? null
  );

  const mapData: any = useAppSelector((state: { map: { mapData: any; }; }) => state?.map?.mapData ?? null);
  const reverseGeoLngLat: any = useAppSelector(
    (state: { map: { reverseGeoLngLat: any; }; }) => state?.map?.reverseGeoLngLat ?? null
  ); 

  const mapVisibility: any = useAppSelector(
    (state: { map: { mapVisibility: any; }; }) => state?.map?.mapVisibility
  );

  const toggleDistanceButton: any = useAppSelector(
    (state: { map: { toggleDistanceButton: any; }; }) => state?.map?.toggleDistanceButton
  );

  const uCodeData: any = useAppSelector((state: { map: { uCode: any; }; }) => state?.map?.uCode ?? null);
  const nearByClickedLocationData: any = useAppSelector(
    (state: { map: { nearByClickedLocation: any; }; }) => state?.map?.nearByClickedLocation
  );

  
  const handleMapVisibility = () => {
    dispatch(setMapVisibility(!mapVisibility));
    dispatch(setToggleDistanceButton(true));
    dispatch(setNearBySearchedLocation(null));
    dispatch(setNearByClickedLocation(null));
    dispatch(setUCode(null));

    if (selectedLocation != null) {
      dispatch(
        setSelectLocationTo({
          ...selectedLocation,
          pointType: "To",
          latitude: nearByClickedLocationData?.latitude? nearByClickedLocationData?.latitude : mapData?.latitude,
          longitude:nearByClickedLocationData?.longitude? nearByClickedLocationData?.longitude : mapData?.longitude,
          value: nearByClickedLocationData? nearByClickedLocationData.business_name ? nearByClickedLocationData.business_name :nearByClickedLocationData.address :  mapData?.business_name
            ?  mapData?.business_name
              ?  mapData?.business_name
              : mapData?.address
            : null,
        })
      );
    }
    if (reverseGeoLngLat != null) {
      const dataFromGeoCode = {
        latitude: nearByClickedLocationData?.latitude? nearByClickedLocationData?.latitude : reverseGeoLngLat?.lat,
        longitude:nearByClickedLocationData?.longitude? nearByClickedLocationData?.longitude : reverseGeoLngLat?.lng,
        value: nearByClickedLocationData? nearByClickedLocationData.business_name ? nearByClickedLocationData.business_name :nearByClickedLocationData.address : revGeoData
          ? revGeoData?.place?.business_name
            ? revGeoData?.place?.business_name
            : revGeoData?.place?.address
          : null,
      };

      dispatch(setSelectLocationTo({ ...dataFromGeoCode, pointType: "To" }));
    }
    if (uCodeData != null && selectedLocation==null) {
      dispatch(
        setSelectLocationTo({
          ...selectedLocation,
          latitude: nearByClickedLocationData?.latitude? nearByClickedLocationData?.latitude : uCodeData?.latitude,
          longitude:nearByClickedLocationData?.longitude? nearByClickedLocationData?.longitude : uCodeData?.longitude,
          value: nearByClickedLocationData? nearByClickedLocationData.business_name ? nearByClickedLocationData.business_name :nearByClickedLocationData.address : uCodeData
            ? uCodeData?.business_name
              ? uCodeData?.business_name
              : uCodeData?.Address
            : null,
        })
      );
    }
  };

  const handleMapVisibilityAndRemoveInfo = () => {
    dispatch(setNearBySearchedLocation(null));
    dispatch(setNearByClickedLocation(null));
    dispatch(setMapVisibility(!mapVisibility));
    dispatch(setSelectLocationFrom(null));
    dispatch(setSelectLocationTo(null));
    dispatch(setToggleDistanceButton(true));
    dispatch(setGeoData(null));
    dispatch(setMapData(null));
    dispatch(setUCode(null));
    dispatch(setPolyGonData(null));
    dispatch(setToggleDistanceButton(!toggleDistanceButton)); // Fly To in distance matrix data change
  };

  return (
    <div>
      {mapVisibility ? (
        <Button
          onClick={handleMapVisibility}
          size="large"
          className="autoCompleteSearchbarButton paddingBtn"
        >
          <FaDirections
            style={{
              color: "#32a66b",
              fontSize: 22,
            }}
          />
        </Button>
      ) : (
        // <div className="_flex">
          <Button className="_flex" style={{marginLeft:'20px'}} onClick={handleMapVisibilityAndRemoveInfo}>
            <AiOutlineClose
              // style={{ fontSize: 22, cursor: "pointer" }}
              style={{ fontSize: 22, cursor: "pointer" }}
              />
              </Button>
        // </div>
      )}
    </div>
  );
};

export default ToggleButton;
