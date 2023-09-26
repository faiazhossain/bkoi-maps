import React, { useState } from "react";
import { Image } from "antd";
import { useAppDispatch } from "@/redux/store";
import { setMapLayer } from "@/redux/reducers/mapReducer";
import { API } from "@/app.config";
import { FloatButton } from "antd";
import { FaLayerGroup } from "react-icons/fa";

const MapLayer: React.FC = () => {
  const dispatch = useAppDispatch();

  const [mapStyleLayer, setMapStyleLayer]: any = useState(1);

  const selectedDefaultLayer = () => {
    setMapStyleLayer(1);
    dispatch(setMapLayer(`${API.DEFAULT_LAYER}`));
  };
  const selectedDarkLayer = () => {
    setMapStyleLayer(2);
    dispatch(setMapLayer(`${API.DARK_LAYER}`));
  };
  const selectedBanglaLayer = () => {
    setMapStyleLayer(3);
    dispatch(setMapLayer(`${API.BANGLA_LAYER}`));
  };  
  
  const selectedTravelLayer = () => {
    setMapStyleLayer(4);
    dispatch(setMapLayer(`${API.TRAVEL_LAYER}`));
  };
  return (
    // <div style={containerStyle}>
    <div>
      <FloatButton.Group
        trigger="click"
        style={{ right: 54 }}
        shape="square"
        icon={<FaLayerGroup style={{ color: "white" }} />}
      >
        <FloatButton
          onClick={selectedDefaultLayer}
          className={mapStyleLayer === 1 ? "activeButton" : ""}
          tooltip="Default Map"
          icon={
            <Image
              className="_border_radius_5"
              src="/images/default_map.png"
              alt="default_map_image"
              preview={false}
            ></Image>
          }
        />
        <FloatButton
          onClick={selectedDarkLayer}
          className={mapStyleLayer === 2 ? "activeButton" : ""}
          tooltip="Dark Map"
          icon={
            <Image
              className="_border_radius_5"
              src="/images/dark_map.png"
              alt="default_map_image"
              preview={false}
            ></Image>
          }
        />
        <FloatButton
          onClick={selectedBanglaLayer}
          className={mapStyleLayer === 3 ? "activeButton" : ""}
          tooltip="Bangla Map"
          icon={
            <Image
              className="_border_radius_5"
              src="/images/bangla_map.png"
              alt="default_map_image"
              preview={false}
            ></Image>
          }
        />     
          <FloatButton
          onClick={selectedTravelLayer}
          className={mapStyleLayer === 4 ? "activeButton" : ""}
          tooltip="Travel Map"
          icon={
            <Image
              className="_border_radius_5"
              src="/images/Travel_Layer.png"
              alt="default_map_image"
              preview={false}
            ></Image>
          }
        />
      </FloatButton.Group>
    </div>
  );
};

export default MapLayer;

// jsx styles
const containerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 20,
  right: 10,
  height: 50,
  padding: 48,
  textAlign: "center",
  background: "none",
  zIndex: 9999,
};
