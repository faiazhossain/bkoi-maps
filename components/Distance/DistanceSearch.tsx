import { Card, Divider } from "antd";
import React from "react";
import DistanceSearchbar from "./DistanceSearchbar";
import ToggleButton from "../Common/ToggleButton";
// 
import {
  Button,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  handleDistanceForBike,
  handleDistanceForCar,
  handleDistanceForMotorCycle,
} from "@/redux/actions/mapActions";
import {
  setBikeTime,
  setCarTime,
  setMotorCycleTime,
} from "@/redux/reducers/mapReducer";

import { AiOutlineCar } from "react-icons/ai";
import { FaMotorcycle } from "react-icons/fa";
import { FaBicycle } from "react-icons/fa";

const DistanceSearch = () => {
  const geoData: any = useAppSelector((state) => state?.map?.geoData ?? "");
  const distance: any = geoData ? geoData?.paths[0]?.distance : null;
  const carTime: any = useAppSelector((state) => state?.map?.carTime ?? false);
  const bikeTime: any = useAppSelector(
    (state) => state?.map?.bikeTime ?? false
  );
  const motorCycleTime: any = useAppSelector(
    (state) => state?.map?.motorCycleTime ?? false
  );

  const dispatch = useAppDispatch();
  const selectLocationFrom: any = useAppSelector(
    (state: any) => state?.map?.selectLocationFrom ?? null
  );
  const selectLocationTo: any = useAppSelector(
    (state: any) => state?.map?.selectLocationTo ?? null
  );

    // handle profile click
    const handleProfileCarClick = (value: any) => {
      if (value) {
        dispatch(setCarTime(true));
        dispatch(setBikeTime(false));
        dispatch(setMotorCycleTime(false));
        dispatch(handleDistanceForCar({ selectLocationFrom, selectLocationTo }));
      }
    };
    const handleProfileBikeClick = (value: any) => {
      if (value) {
        dispatch(setBikeTime(true));
        dispatch(setCarTime(false));
        dispatch(setMotorCycleTime(false));
        dispatch(handleDistanceForBike({ selectLocationFrom, selectLocationTo }));
      }
    };
    const handleProfileMototCycleClick = ( value: any ) => {
      if (value) {
        dispatch(setMotorCycleTime(true));
        dispatch(setCarTime(false));
        dispatch(setBikeTime(false));
        dispatch(
          handleDistanceForMotorCycle({ selectLocationFrom, selectLocationTo })
        );
      }
    };
  

  return (
    <div style={{ display: "flex", width: "320px" }}>
      <Card
        className="distanceSearchBar"
        style={{ overflow: "auto", height: distance ? `94vh` : `auto` }}
      >
        <div style={{ ...iconContainerStyles }}>
          {/* car */}
          {
            selectLocationFrom && selectLocationTo ?           
            <div
            style={{ ...iconStyles }}
            onClick={() => handleProfileCarClick(true)}
          >
            <Button className={carTime && "active"}>
              <AiOutlineCar className="text_lg _flex" />
            </Button>
          </div> : <div>
            <Button disabled>
              <AiOutlineCar className="text_lg _flex" />
            </Button>
          </div>
          }

          ​{/* bike */}
          {
            selectLocationFrom && selectLocationTo ?
          <div
            style={{ ...iconStyles }}
            onClick={() => handleProfileBikeClick(true)}
          >
            <Button className={bikeTime && "active"}>
              <FaBicycle className="text_lg _flex" />
            </Button>
          </div> : <div>
            <Button disabled>
              <FaBicycle className="text_lg _flex" />
            </Button>
          </div>
          }
          ​{/* Motorcycle */}
          { selectLocationFrom && selectLocationTo ?
              <div
                style={{ ...iconStyles }}
                onClick={() => handleProfileMototCycleClick(true)}
              >
                <Button className={motorCycleTime && "active"}>
                  <FaMotorcycle className="text_lg _flex" />
                </Button> 
              </div> : <div>
                <Button disabled>
                  <FaMotorcycle className="text_lg _flex" />
                </Button>
                </div>
         }
            <ToggleButton />
        </div>
        <Divider></Divider>
        <DistanceSearchbar />
      </Card>
    </div>
  );
};

export default DistanceSearch;

const iconContainerStyles = {
  display: "flex",
  justifyContent: "center",
  // alignItems:'center',
  gap: "20px",
  marginBottom: "20px",
};
const iconStyles = {
  fontSize: "25px",
};

