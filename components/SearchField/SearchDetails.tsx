import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  Spin,
} from "antd";
import React, { useEffect, useState } from "react";

import ReverseGeocode from "../ReverseGeocode/ReverseGeocode";
import {
  handleMapData,
} from "@/redux/actions/mapActions";
import NearByCard from "../NearByData/NearByCard";
import NearByInformation from "../NearByData/NearByInformation";
import { useRouter } from "next/router";


const SearchDetails = () => {
  // redux 
  const dispatch = useAppDispatch();

  // next router
  const router = useRouter();

  // redux state

  const nearByClickedLocationData: any = useAppSelector((state) => state?.map?.nearByClickedLocation);
  const mapData: any = useAppSelector((state) => state?.map?.mapData);
  const reverseGeoCode: any = useAppSelector((state: any) => state?.map?.reverseGeoCode);
  const reverseGeoCodeLatLng: any = useAppSelector((state: any) => state?.map?.reverseGeoLngLat);
  const nearBySearchedData: any = useAppSelector((state) => state?.map?.nearBySearchedLocation);
  const reverseGeoNearButton: any = useAppSelector((state) => state?.map?.reverseGeoNearButton);

  const mapillaryData: any = useAppSelector((state) => state?.map?.mapillaryData);
  useEffect(()=> {
    if (mapData?.uCode) {
      dispatch(handleMapData(mapData?.uCode));
    }
  }, [mapData?.uCode])

  return (
    <div
      className={mapData || reverseGeoCode  ? `searchbarDetails` : ""}
      style={{
        height: mapData || reverseGeoCode ? `92vh` : 0,
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        zIndex: 100,
        margin: "auto",
      }}
    >
      {nearBySearchedData && reverseGeoNearButton && <NearByCard />}
      {
       (reverseGeoCodeLatLng && reverseGeoCode) ? reverseGeoCode && !nearBySearchedData && !mapillaryData && <ReverseGeocode />: <div
       style={{
         backgroundColor: "white",
         height: "200px",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
       }}
     >
      <Spin />
     </div>
      }
     
      { nearByClickedLocationData && <NearByInformation /> }
    </div>
  );
};

export default SearchDetails;
