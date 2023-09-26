import { useAppDispatch, useAppSelector } from "@/redux/store";
import { HomeOutlined } from "@ant-design/icons";
import {
  Card,
  Typography,
  Image,
  Divider,
  Button,
  Row,
  Col,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import ToggleButton from "../Common/ToggleButton";
import { LOCAL_BASE_URL } from "@/app.config";
import {
  handleSearchedPlaceByUcode,
} from "@/redux/actions/mapActions";
const { Paragraph, Text } = Typography;
import NearbyButton from "../Common/NearbyButton";

import { RiArrowGoBackFill } from "react-icons/ri";
import { setNearByClickedLocation, setUCode, setuCodeForLink } from "@/redux/reducers/mapReducer";

const NearByInformation = () => {
  const dispatch = useAppDispatch();

  // redux state
  const nearByClickedLocationData: any = useAppSelector(
    (state) => state?.map?.nearByClickedLocation
  );

  const reverseGeoCode: any = useAppSelector(
    (state) => state?.map?.reverseGeoCode
  );
  const searchedMapData: any = useAppSelector(
    (state) => state?.map?.searchedMapData
  );

  const mapData: any = useAppSelector((state) => state?.map?.mapData);

  const uCode: any = mapData ? mapData.place_code : null;

  const uCodeUrl: any = useAppSelector((state) => state?.map?.uCode ?? null);

  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClear = () => {
    dispatch(setNearByClickedLocation(null));
    dispatch(setUCode(null))
  };

  useEffect(() => {
    if (uCode) {
      dispatch(handleSearchedPlaceByUcode(uCode));
    }
  }, [uCode]);



  return (
    <>
      <div
        className={searchedMapData || reverseGeoCode ? `searchbarDetails` : ""}
        style={{
          height: nearByClickedLocationData ? `92vh` : 0,
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          zIndex: 100,
          margin: "auto",
        }}
      >
        {nearByClickedLocationData && (
          <Card
            style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            className="_width_lg searchDetailsDiv"
          >
            {/* showing image */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
              {/* Image part */}
            <h2>
              {
                nearByClickedLocationData?.business_name !== null ? nearByClickedLocationData?.business_name : nearByClickedLocationData?.place_name !== null ? nearByClickedLocationData?.place_name : nearByClickedLocationData?.label
              }
            </h2>
            <p style={{fontWeight: '900' }} className="_color_light">{nearByClickedLocationData?.subType}</p>
            <p style={{marginTop: '10px'}}><span style={{fontWeight:'bold', textDecoration:'underline' }}>{'Address:'} </span>  {nearByClickedLocationData?.Address || nearByClickedLocationData?.address_bn}</p>
            <br />
            {/* business name in bangla */}
            <Divider />
            {/* Direction part */}
            <Row>
              <Col span={12} className="_flex_col">
                <Row>
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                      paddingLeft: "15px",
                    }}
                  >
                    <ToggleButton></ToggleButton>
                  </div>
                </Row>
                <Row>
                  <p className="_margin_top_sm _color_light">Get Direction</p>
                </Row>
              </Col>
              <Col span={12} className="_flex_col">
                <Row>
                  <Button
                    size="large"
                    onClick={showModal}
                    style={{ border: "1px solid #ccc", borderRadius: "10px" }}
                  >
                    <BsFillShareFill
                      style={{ fontSize: "20px", color: "#32a66b" }}
                    />
                  </Button>
                  <Modal
                    title="Share"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelButtonProps={{ style: { display: "none" } }}
                  >
                    <Divider />
                    <Row className="_margin_top_md">
                      <Col span={6}>
                        {uCodeUrl?.images?.length > 0 ? (
                          <Image
                            src={
                              uCodeUrl?.images
                                // ? `https://api.bmapsbd.com/${uCodeUrl?.images[0]?.image_link}`
                                
                                ? `https://api.bmapsbd.com/${uCodeUrl?.images[0]?.image_link}`
                                : ""
                            }
                            alt=""
                            width={100}
                            height={100}
                            className="_border_radius_20"
                          />
                        ) : (
                          <Image
                            src="/images/no-image-available.jpg"
                            alt=""
                            width={100}
                            height={100}
                            preview={false}
                            className="_border_radius_20"
                          />
                        )}
                      </Col>
                      <Col span={18} className="_flex_col_around">
                        <p style={{ fontSize: "14px" }}>
                          <b>Address:</b> {nearByClickedLocationData?.Address}
                        </p>
                        <p style={{ fontSize: "14px" }}>
                          <b>City:</b> {nearByClickedLocationData?.city}
                        </p>
                      </Col>
                    </Row>
                    <Divider />
                    <p style={{ color: "#bbb" }}>Copy link</p>
                    <Paragraph
                      copyable={{
                        text: `${LOCAL_BASE_URL}?place=${nearByClickedLocationData?.uCode}/`,
                        onCopy: () => 
                        dispatch(setuCodeForLink(nearByClickedLocationData?.uCode)
                        )
                      }}
                      style={{ textDecoration: "underline", marginTop: "5px" }}
                    >
                      {LOCAL_BASE_URL}?place={nearByClickedLocationData?.uCode}
                    </Paragraph>
                  </Modal>
                </Row>
                <Row>
                  <p className="searchedDataAbcd_margin_top_sm _color_light">
                    Get Link
                  </p>
                </Row>
              </Col>
            </Row>
            <Divider></Divider>
            <NearbyButton></NearbyButton>
            <Divider></Divider>
            {/* information section */}
            <p
              className="_color_light"
              style={{
                textDecoration: "underline",
                color: "#606C5D",
              }}
            >
              Information
            </p>

            <Row align="middle" justify="center" style={{ marginTop: "10px" }}>
              <Col span={6}>
                <HomeOutlined style={{ fontSize: 24 }} />
              </Col>
              <Col span={18}>{nearByClickedLocationData?.Address || nearByClickedLocationData?.business_name}</Col> 
            </Row>

            { nearByClickedLocationData?.uCode &&
              <Row align="middle" justify="center" style={{ marginTop: "10px" }}>
                <Col span={6}>
                  <label>UCode: </label>
                </Col>
                <Col span={18}>
                  <Text className="blueBorder">{nearByClickedLocationData?.uCode}</Text>
                </Col>
              </Row>
            }

            <Row align="middle" justify="center" style={{ marginTop: "16px" }}>
              <Col span={6}>
                <label>District: </label>
              </Col>
              <Col span={18}>
                <Text className="greenBorder">{nearByClickedLocationData?.district}</Text>
              </Col>
            </Row>

            <Row align="middle" justify="center" style={{ marginTop: "14px" }}>
              <Col span={6}>
                <label>Post Code: </label>
              </Col>
              <Col span={18}>
                <Text className="redBorder">{nearByClickedLocationData?.postCode}</Text>
              </Col>
            </Row>
          </Card>
        )}
      </div>
    </>
  );
};

export default NearByInformation;
