import {
  AutoComplete,
  Col,
  Divider,
  Form,
  Row,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  handleDistanceForCar,
  handleSearchPlaces,
} from "@/redux/actions/mapActions";
import {
  setBikeTime,
  setCarTime,
  setGeoData,
  setMotorCycleTime,
  setReverseGeoCode,
  setSearchedMapData,
  setSelectLocationFrom,
  setSelectLocationTo,
} from "@/redux/reducers/mapReducer";
// Import Constants
const { Text } = Typography;
// import icons
import {
  MdLocationSearching,
  MdOutlineUTurnRight,
  MdTurnLeft,
  MdTurnRight,
  MdTurnSlightLeft,
  MdTurnSlightRight,
} from "react-icons/md";
import { HiLocationMarker, HiOutlineLocationMarker } from "react-icons/hi";
import {
  FiArrowDownLeft,
  FiArrowDownRight,
  FiCircle,
  FiCornerUpLeft,
  FiCornerUpRight,
} from "react-icons/fi";

import { GiPathDistance } from "react-icons/gi";
import { BiTime } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import ToggleButton_distance from "../Common/ToggleButton_distance";


const DistanceSearchbar = () => {
  const dispatch = useAppDispatch();
  // state
  // const [options, setOptions] = useState([]);

  // redux state
  const places: any = useAppSelector(
    (state: any) => state?.map?.searchPlaces ?? []
  );
  const selectLocationFrom: any = useAppSelector(
    (state: any) => state?.map?.selectLocationFrom ?? null
  );
  const selectLocationTo: any = useAppSelector(
    (state: any) => state?.map?.selectLocationTo ?? null
  );
  const geoData: any = useAppSelector((state) => state?.map?.geoData ?? "");

  // variables
  const distance: any = geoData ? geoData?.paths[0]?.distance : null;
  const distanceInKm: any = (distance / 1000).toFixed(2);
  const time: any = geoData ? geoData?.paths[0]?.time : null;
  const distanceCarTimeInSec: any = (Math.floor(time / 1000) / 60).toFixed(2);

  // time calculation for showing time in distance bar
  function convertMinutesToHoursAndMinutes(totalMinutes:any) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);
    return hours>0? `${hours} hr and ${minutes} min`: `${minutes} min` ;
  }
  const totalMinutes = distanceCarTimeInSec;
  const result = convertMinutesToHoursAndMinutes(totalMinutes);

  // time calculation for showing times in details routes
  function calculateTimeInMinutes(time:any) {
    if (typeof time !== "number") {
      return "";
    }
    const totalSeconds:any = time / 1000;
    const minutes: any = Math.floor(totalSeconds / 60);
    const seconds: any = Math.floor(totalSeconds % 60);
    return ` ${minutes} min ${seconds} sec` ;
  }

  // getting autocomplete searchData
  const onChangeFrom = async (value: any) => {
    dispatch(setBikeTime(false));
    dispatch(setMotorCycleTime(false));

        dispatch(handleSearchPlaces(value));
        dispatch(setSelectLocationFrom(null));
        dispatch(setGeoData(null));
  };

  // on change in to autocomplete field
  const onChangeTo = async (value: any) => {
    dispatch(setBikeTime(false));
    dispatch(setMotorCycleTime(false));
    dispatch(setReverseGeoCode(null));
    dispatch(setSearchedMapData(null));
    dispatch(setGeoData(null));
    dispatch(handleSearchPlaces(value));
    dispatch(setSelectLocationTo(null));
      
  };

  // on select in autocomplete from
  const onSelectFrom = (value: any) => {
    const selectedOption: any = places.find(
      (option: any) => option.value === value
    );
    dispatch(setSelectLocationFrom({ ...selectedOption, pointType: "From" }));
  };

  // on select in autocomplete to
  const onSelectTo = (value: any) => {
    const selectedOption: any = places.find(
      (option: any) => option.value === value
    );
    dispatch(setSelectLocationTo({ ...selectedOption, pointType: "To" }));
    dispatch(setSearchedMapData(null));
  };

  // on change in from and to location
  useEffect(() => {
    if (selectLocationFrom && selectLocationTo) {
      dispatch(handleDistanceForCar({ selectLocationFrom, selectLocationTo }));
      dispatch(setCarTime(true)); // set the first button (car) as active by default
    }
  }, [selectLocationFrom, selectLocationTo]);

  return (
    <div>
      <Form>
        <Row gutter={10}>
          <Col
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            span={2}
          >
            <MdLocationSearching style={{ ...iconStyleFromTo }} />
            <BsThreeDotsVertical
              style={{ ...iconStyleFromTo, fontSize: "22px" }}
            ></BsThreeDotsVertical>
            <HiOutlineLocationMarker style={{ ...iconStyleFromTo }} />
          </Col>
          <Col span={20}>
            <Col style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* from autocomplete */}
              <AutoComplete
                options={places}
                onSelect={onSelectFrom}
                onChange={onChangeFrom}
                value={selectLocationFrom?.value}
                placeholder="start"
                style={{
                  width: "100%",
                  position: "relative",
                  zIndex: 9999999,
                }}
              />
            </Col>
            ​
            <Col style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* to autocomplete */}
              <AutoComplete
                value={selectLocationTo?.value}
                options={places}
                onSelect={onSelectTo}
                onChange={onChangeTo}
                placeholder="destination"
                style={{ width: "100%" }}
              />
            </Col>
          </Col>
          {selectLocationFrom && selectLocationTo && (
            <Col span={2} style={{ display: "flex", alignItems: "center" }}>
              <ToggleButton_distance></ToggleButton_distance>
            </Col>
          )}
        </Row>
        ​
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          {distance && (
            <div style={{ ...distanceTimeDivStyle }}>
              <GiPathDistance style={{ ...iconStyleFromTo }} />
              <Typography style={{ fontSize: "16px" }}>
                <b>Distance:</b> {distanceInKm} km{" "}
              </Typography>
            </div>
          )}
          {distance && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: "5px",
              }}
            >
              <BiTime style={{ ...iconStyleFromTo }} />
              <Typography style={{ fontSize: "16px" }}>
                <b>Time:</b> {result}
                {/* <b>{hours} hour{hours !== 1 ? 's' : ''} {minutes} minute {minutes !== 1 ? 's' : ''}</b> */}
              </Typography>
            </div>
          )}
          {distance && <Divider></Divider>}
          {distance && geoData?.paths[0]?.instructions && (
            <h3 style={{ color: "#32a66b", textAlign: "center" }}>
              Detailed Route Instructions
            </h3>
          )}
          {distance && <Divider></Divider>}
          {distance &&
            geoData?.paths[0]?.instructions?.map((item: any, index: any) => (
              <Row gutter={10} key={index}>
                <Col
                  span={4}
                  style={{
                    fontSize: "28px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {(() => {
                    switch (item?.sign) {
                      // continue
                      case 0:
                        return (
                          <HiLocationMarker
                            style={{ color: "green" }}
                          ></HiLocationMarker>
                        );
                      // slight right
                      case 1:
                        return <MdTurnSlightRight></MdTurnSlightRight>;
                      // keep right
                      case 2:
                        return <FiCornerUpRight></FiCornerUpRight>;
                      // Sharp right
                      case 3:
                        return (
                          <MdTurnRight style={{ fontSize: 32 }}></MdTurnRight>
                        );
                      // arrived destination
                      case 4:
                        return (
                          <HiLocationMarker
                            style={{ color: "red" }}
                          ></HiLocationMarker>
                        );
                      case 6:
                        return <FiCircle></FiCircle>;
                      case 7:
                        return <FiArrowDownRight></FiArrowDownRight>;
                      case 8:
                        return <MdOutlineUTurnRight></MdOutlineUTurnRight>;
                      case -1:
                        return <MdTurnSlightLeft></MdTurnSlightLeft>;
                      case -2:
                        return <FiCornerUpLeft></FiCornerUpLeft>;
                      case -3:
                        return (
                          <MdTurnLeft style={{ fontSize: 32 }}></MdTurnLeft>
                        );
                      case -7:
                        return <FiArrowDownLeft></FiArrowDownLeft>;
                      default:
                        return "";
                    }
                  })()}
                </Col>
                {/* Editing */}
                <Col span={20}>
                  {/* <p>Currently on street {item?.street_name} </p> */}
                  <p>{item?.text} </p>
                  <p>
                    <span style={{ color: "green" }}>Distance:</span>
                    {(item?.distance / 1000).toFixed(2)} km
                  </p>
                  <p>
                    <span style={{ color: "red" }}>Time:</span>
                    {calculateTimeInMinutes(item?.time)} 
                  </p>
                </Col>
                <Divider></Divider>
              </Row>
            ))}
        </div>
      </Form>
    </div>
  );
};
export default DistanceSearchbar;
// jsx styles
const iconStyleFromTo = {
  fontSize: "18px",
  color: "#32a66b",
};
const distanceTimeDivStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};
