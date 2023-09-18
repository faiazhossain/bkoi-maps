import {
  setMapData,
  setNearByClickedLocation,
  setNearBySearchedLocation,
  setReverseGeoCode,
  setReverseGeoLngLat,
  setReverseGeoNearButton,
  setUCode,
} from "@/redux/reducers/mapReducer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Button, Card, Col, Row } from "antd";
import { RiArrowGoBackFill } from "react-icons/ri";

const NearByCard = () => {
  const dispatch = useAppDispatch();

  // redux state
  const nearBySearchedLocationData: any = useAppSelector(
    (state) => state?.map?.nearBySearchedLocation
  );
  const nearByClickedLocationData: any = useAppSelector(
    (state) => state?.map?.nearByClickedLocation
  );
  const nearByButton: any = useAppSelector((state) => state?.map?.nearByButton);

  const reverseGeoCode: any = useAppSelector(
    (state) => state?.map?.reverseGeoCode ?? null
  );
  const mapData: any = useAppSelector((state) => state?.map?.mapData ?? null);

  const clickedOnCard = (index: any) => {
    dispatch(
      setNearByClickedLocation(nearBySearchedLocationData?.places[index])
    );

    if (nearByClickedLocationData) {
      dispatch(setReverseGeoLngLat(null));
      dispatch(setReverseGeoCode(null));
      dispatch(setUCode(null));
    }
  };

  const handleClear = () => {
    dispatch(setNearBySearchedLocation(null));
    dispatch(setReverseGeoNearButton(false));
    if (reverseGeoCode) {
      dispatch(setMapData(null));
      const lat = reverseGeoCode?.place.latitude;
      const lng = reverseGeoCode?.place.longitude;
      const data = { lat, lng };
      dispatch(setReverseGeoLngLat(data));
    }
    if (mapData) {
      dispatch(setUCode(null));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {nearBySearchedLocationData?.places?.length > 0 &&
        nearByClickedLocationData === null && (
          <div
            style={{
              height: nearBySearchedLocationData ? `auto` : 0,
              position: "relative",
              zIndex: 100,
              margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
                padding: "10px 22px",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  padding: "10px 0px",
                  color: "#32a66b",
                  borderRadius: 10,
                }}
              >
                Nearby Places
              </h3>
              <Button
                style={{ border: "1px solid #32a66b" }}
                onClick={handleClear}
                icon={
                  <RiArrowGoBackFill
                    style={{ color: "#32a66b", fontSize: "18px" }}
                  />
                }
              ></Button>
            </div>
            {nearBySearchedLocationData &&
              nearBySearchedLocationData?.places?.map(
                (data: any, index: any) => (
                  <Card
                    style={{ cursor: "pointer" }}
                    onClick={() => clickedOnCard(index)}
                    key={index}
                    className="_width_lg card_hover"
                  >
                    <h4>{data.Address}</h4>
                  </Card>
                )
              )}
          </div>
        )}
      {nearBySearchedLocationData?.places?.length === 0 && (
        <Card
          className="_width_lg"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Row>
            <Col span={22}>
              <h2>
                No nearby{" "}
                <span style={{ color: "#32a66b" }}>{nearByButton} </span>
                found
              </h2>
            </Col>
            <Col span={2}>
              <Button
                style={{ border: "1px solid #32a66b" }}
                onClick={handleClear}
                icon={
                  <RiArrowGoBackFill
                    style={{ color: "#32a66b", fontSize: "18px" }}
                  />
                }
              ></Button>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};
export default NearByCard;
