import {
  setBikeTime,
  setMotorCycleTime,
  setSelectLocationFrom,
  setSelectLocationTo,
  setToggleDistanceButton,
} from "@/redux/reducers/mapReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React from "react";
import { HiSwitchVertical } from "react-icons/hi";

const ToggleButton_distance = () => {
  const dispatch = useAppDispatch();
  // redux state
  const switchToggleButton: any = useAppSelector(
    (state: any) => state?.map?.toggleDistanceButton ?? null
  );
  const selectLocationTo: any = useAppSelector(
    (state: any) => state?.map?.selectLocationTo ?? null
  );
  const selectLocationFrom: any = useAppSelector(
    (state: any) => state?.map?.selectLocationFrom ?? null
  );

  const setSwitch = () => {
    if (switchToggleButton === true) {
      dispatch(setToggleDistanceButton(false));
      dispatch(setBikeTime(false));
      dispatch(setMotorCycleTime(false));
      dispatch(
        setSelectLocationFrom({ ...selectLocationTo, pointType: "From" })
      );
      dispatch(setSelectLocationTo({ ...selectLocationFrom, pointType: "To" }));
    } else if (switchToggleButton === false) {
      dispatch(setToggleDistanceButton(true));
      dispatch(setBikeTime(false));
      dispatch(setMotorCycleTime(false));
      dispatch(
        setSelectLocationFrom({ ...selectLocationTo, pointType: "From" })
      );
      dispatch(setSelectLocationTo({ ...selectLocationFrom, pointType: "To" }));
    }
  };

  return (
    <div>
      <HiSwitchVertical
        className="switchButtonStyle"
        style={{ fontSize: "28" }}
        onClick={setSwitch}
      ></HiSwitchVertical>
    </div>
  );
};

export default ToggleButton_distance;
