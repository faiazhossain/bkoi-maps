import React from "react";
import { Button, Space } from "antd";
import { MdLocalAtm } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { handleFetchNearby } from "@/redux/actions/mapActions";
import {
  setNearByButton,
  setNearByClickedLocation,
  setReverseGeoNearButton,
} from "@/redux/reducers/mapReducer";
// import { FaUniversity } from "react-icons/fa";
import { FaClinicMedical } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { FaParking } from "react-icons/fa";
import { MdPark } from "react-icons/md";

const NearbyButton: React.FC = () => {
  const dispatch = useAppDispatch();

  // redux state
  const selectedLocation: any = useAppSelector(
    (state: { map: { selectedLocation: any; }; }) => state?.map?.selectedLocation ?? null
  );
  const reverseGeoLngLat: any = useAppSelector(
    (state: any) => state?.map?.reverseGeoLngLat
  );
  const mapData: any = useAppSelector(
    (state: any) => state?.map?.mapData
  );  
  const reverseGeoCode: any = useAppSelector((state: { map: { reverseGeoCode: any; }; }) => state?.map?.reverseGeoCode ?? "");
  const handleSelectATM = () => {
    const latitude = selectedLocation?.latitude || reverseGeoLngLat?.lat || mapData?.latitude || reverseGeoCode?.place?.latitude ;
    const longitude = selectedLocation?.longitude || reverseGeoLngLat?.lng || mapData?.longitude || reverseGeoCode?.place?.longitude;
    const value = "ATM near me";
    const data = { latitude, longitude, value };
    dispatch(handleFetchNearby(data));
    dispatch(setNearByClickedLocation(null));
    dispatch(setReverseGeoNearButton(true))
    dispatch(setNearByButton("ATM"));
  };

  const handleSelectSchool = () => {
    const latitude = selectedLocation?.latitude || reverseGeoLngLat?.lat || mapData?.latitude || reverseGeoCode?.place?.latitude;
    const longitude = selectedLocation?.longitude || reverseGeoLngLat?.lng || mapData?.longitude || reverseGeoCode?.place?.longitude; 
    const value = "School near me";
    const data = { latitude, longitude, value };
    dispatch(handleFetchNearby(data));
    dispatch(setNearByClickedLocation(null));
    dispatch(setReverseGeoNearButton(true))
    dispatch(setNearByButton("School"));
  };

  const handleSelectClinic = () => {
    const latitude = selectedLocation?.latitude || reverseGeoLngLat?.lat || mapData?.latitude || reverseGeoCode?.place?.latitude;
    const longitude = selectedLocation?.longitude || reverseGeoLngLat?.lng || mapData?.longitude || reverseGeoCode?.place?.longitude;
    const value = "Clinic near me";
    const data = { latitude, longitude, value };
    dispatch(handleFetchNearby(data));
    dispatch(setNearByClickedLocation(null));
    dispatch(setReverseGeoNearButton(true))
    dispatch(setNearByButton("Clinic"));
  };
  const handleSelectBank = () => {
    const latitude = selectedLocation?.latitude || reverseGeoLngLat?.lat || mapData?.latitude || reverseGeoCode?.place?.latitude;
    const longitude = selectedLocation?.longitude || reverseGeoLngLat?.lng || mapData?.longitude || reverseGeoCode?.place?.longitude;
    const value = "Bank near me";
    const data = { latitude, longitude, value };
    dispatch(handleFetchNearby(data));
    dispatch(setNearByClickedLocation(null));
    dispatch(setReverseGeoNearButton(true))
    dispatch(setNearByButton("Bank"));
  };

  const handleSelectParking = () => {
    const latitude = selectedLocation?.latitude || reverseGeoLngLat?.lat || mapData?.latitude || reverseGeoCode?.place?.latitude;
    const longitude = selectedLocation?.longitude || reverseGeoLngLat?.lng || mapData?.longitude || reverseGeoCode?.place?.longitude;
    const value = "Parking near me";
    const data = { latitude, longitude, value };
    dispatch(handleFetchNearby(data));
    dispatch(setNearByClickedLocation(null));
    dispatch(setReverseGeoNearButton(true))
    dispatch(setNearByButton("Parking"));
  };

  const handleSelectElectricPark = () => {
    const latitude = selectedLocation?.latitude || reverseGeoLngLat?.lat || mapData?.latitude || reverseGeoCode?.place?.latitude;
    const longitude = selectedLocation?.longitude || reverseGeoLngLat?.lng || mapData?.longitude || reverseGeoCode?.place?.longitude;
    const value = "Park near me";
    const data = { latitude, longitude, value };
    dispatch(handleFetchNearby(data));
    dispatch(setNearByClickedLocation(null));
    dispatch(setReverseGeoNearButton(true))
    dispatch(setNearByButton("Park"));
  };

  return (
    <div>
      <p
        style={{
          textDecoration: "underline",
          color: "#606C5D",
          marginBottom: "10px",
        }}
      >
        Near by places
      </p>

      <Space
        className="site-button-ghost-wrapper"
        wrap
        style={{ justifyContent: "center" }}
      >
        <Button
          onClick={handleSelectATM}
          style={{ display: "flex", alignItems: "center" }}
          type="dashed"
          icon={<MdLocalAtm style={{ fontSize: "16px" }} />}
        >
          ATM
        </Button>

        <Button
          onClick={handleSelectSchool}
          style={{ display: "flex", alignItems: "center" }}
          type="dashed"
          icon={<FaSchool style={{ fontSize: "16px" }} />}
        >
          School
        </Button>

        <Button
          onClick={handleSelectClinic}
          style={{ display: "flex", alignItems: "center" }}
          type="dashed"
          icon={<FaClinicMedical style={{ fontSize: "16px" }} />}
        >
          Clinic
        </Button>
        <Button
          onClick={handleSelectBank}
          style={{ display: "flex", alignItems: "center" }}
          type="dashed"
          icon={<BsBank2 style={{ fontSize: "16px" }} />}
        >
          Bank
        </Button>

        <Button
          onClick={handleSelectElectricPark}
          style={{ display: "flex", alignItems: "center" }}
          type="dashed"
          icon={<MdPark style={{ fontSize: "16px" }} />}
        >
          Park
        </Button>
        <Button
          onClick={handleSelectParking}
          style={{ display: "flex", alignItems: "center" }}
          type="dashed"
          icon={<FaParking style={{ fontSize: "16px" }} />}
        >
          Parking
        </Button>
      </Space>
    </div>
  );
};

export default NearbyButton;