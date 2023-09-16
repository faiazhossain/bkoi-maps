import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Image,
  Modal,
  Row,
  Typography,
} from "antd";
import ToggleButton from "../Common/ToggleButton";
import { BsFillShareFill, BsFillTelephoneFill } from "react-icons/bs";
import { LOCAL_BASE_URL } from "@/app.config";
import { HomeOutlined } from "@ant-design/icons";
import NearbyButton from "../Common/NearbyButton";
import { setuCodeForLink } from "@/redux/reducers/mapReducer";
import { HiOutlineMail } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";

// import constants
const { Text, Paragraph } = Typography;

const ReverseGeocode = () => {
  const dispatch = useAppDispatch()

  // redux state
  const reverseGeoCode: any = useAppSelector(
    (state: any) => state?.map?.reverseGeoCode
  );

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
  
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
     {(reverseGeoCode && !reverseGeoCode?.status) && 
      (
        <Card className="_width_lg">
          {/* showing image */}
          <div className="searchDetails" style={{ borderRadius: '20px', width:'100%', height:'288px' }}>
            {
            reverseGeoCode[0]?.images?.length > 0 ? (
            //   <Carousel arrows={true} style={{ borderRadius: '20px', width:'100%', height:'288px' }}>
            //   {
            //     reverseGeoCode[0]?.images
            //       .slice()
            //       .reverse() // Reverse the order of images
            //       .map((image: any) => (
            //         <div style={{ borderRadius: '20px' }} key={image.id}>
            //           <Image
            //             src={`https://api.bmapsbd.com/${image?.image_link}`}
            //             alt=""
            //             style={{
            //               objectFit: 'contain',
            //               borderRadius: '20px',
            //             }}
            //             className="imageFit"
            //             width={340}
            //             height={288}
            //           />
            //         </div>
            //       ))
            //   }
            // </Carousel>
            <Carousel arrows={true} style={{ borderRadius: '20px', width:'100%', height:'288px' }}>
                {
                  reverseGeoCode[0]?.images
                    .slice()
                    .reverse() // Reverse the order of images
                    .map((image: any) => (

                      

                      <div style={{ borderRadius: '20px' }} key={image.id}>
                        {image.image_link ? (
                          
                          <Image
                            src={`https://api.bmapsbd.com/${image?.image_link}`}
                            alt=""
                            style={{
                              objectFit: 'contain',
                              borderRadius: '20px',
                            }}
                            className="imageFit"
                            width={340}
                            height={288}
                          />
                        ) : (
                          // You can display a placeholder or an error message here
                          <div>Image not found</div>
                        )}
                      </div>
                    ))
                }
            </Carousel>
            
            ) : (
              <div style={{display:'flex',justifyContent:'center', position:'relative'}}>

              <Image
                src="/images/ifNoImage.png"
                width='100%'
                // height={160}
                alt=""
                preview={false}
                style={{
                  objectFit: "contain",
                  opacity:'0.8',
                  borderRadius:'20px',
                  marginBottom:'10px',
                  // filter: 'grayscale(50%)',
                  filter:'grayscale(20%) blur(1px)',
                }}
                className="imageFit"
              />
                <h3 style={{position:'absolute',  top: '50%',left: '50%',transform:'translate(-50%, -50%)', color:'#FFFFFF', textShadow: '-1px 0px 6px rgba(0,0,0,0.6)'}}>No Image Found!</h3>
              </div>
            )}
          </div>
          <h2 style={{marginTop:'14px'}}>
            {
            reverseGeoCode[0]?.business_name ||
            reverseGeoCode[0]?.place_name ||
            reverseGeoCode[0]?.label 
            }
          </h2>
          {/* Address name */}
          <p style={{marginTop: '10px'}}>{reverseGeoCode[0]?.Address || reverseGeoCode[0]?.business_name}{reverseGeoCode[0]?.area ?`, ${reverseGeoCode[0]?.area}`:''}{reverseGeoCode[0]?.city ? `, ${reverseGeoCode[0]?.city}. `: ''}</p>
          <p style={{fontWeight: '400', marginTop:'10px' }} className="_color_light"> {reverseGeoCode[0]?.subType}</p>
          {reverseGeoCode[0]?.additional?.contact && (
            <div style={{display:'flex', alignItems:'center', marginTop:'20px'}}> 
              {JSON.parse(reverseGeoCode[0]?.additional.contact)[0]?.value && <p style={{ display:'flex', alignItems:'center',fontSize:'18px', color:'#279EFF'}}><HiOutlineMail/></p> }  
              {<p style={{marginLeft:'30px'}}>
              {JSON.parse(reverseGeoCode[0]?.additional.contact)[0]?.value}
              </p>}
            </div>
          )}
          
          {reverseGeoCode[0]?.additional?.contact && (
            <div style={{display:'flex', alignItems:'center',marginTop:'10px'}}>
              {JSON.parse(reverseGeoCode[0]?.additional.contact)[1]?.value && <p style={{display:'flex', alignItems:'center',fontSize:'16px', color:'#279EFF'}}><BsFillTelephoneFill/></p>}
              <p style={{marginLeft:'30px'}}>
              {JSON.parse(reverseGeoCode[0]?.additional.contact)[1]?.value}
              </p> 
            </div>
          )}
          
          {reverseGeoCode[0]?.additional?.contact && (
            <div style={{display:'flex', alignItems:'center',marginTop:'10px'}}>
              {JSON.parse(reverseGeoCode[0]?.additional.contact)[2]?.value && <p style={{display:'flex', alignItems:'center',fontSize:'16px', color:'#279EFF'}}><BiWorld/></p>}
              <a href={JSON.parse(reverseGeoCode[0]?.additional.contact)[2]?.value} style={{marginLeft:'30px'}}>
              {JSON.parse(reverseGeoCode[0]?.additional.contact)[2]?.value}
              </a> 
            </div>
          )}
          {/* <p>Contact: {JSON.parse(reverseGeoCode[0]?.additional.contact[0])}</p> */}
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
                    <Col sm={8}>
                      {reverseGeoCode[0]?.images?.length > 0 ? (
                        <Image
                          src={
                            reverseGeoCode[0]?.images
                              ? `https://api.bmapsbd.com/${reverseGeoCode[0]?.images[0]?.image_link}`
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
                    <Col sm={16} className="_flex_col_around">
                      <p style={{ fontSize: "14px" }}>
                        <b>Address:</b> {reverseGeoCode[0]?.Address}
                      </p>
                      <p style={{ fontSize: "14px" }}>
                        <b>City:</b> {reverseGeoCode[0]?.city}
                      </p>
                    </Col>
                  </Row>
                  <Divider />
                  <p style={{ color: "#bbb" }}>Copy link</p>
                  <Paragraph
                    copyable={{
                      text: `${LOCAL_BASE_URL}?place=${reverseGeoCode[0]?.uCode}/`,
                      onCopy: () => dispatch(setuCodeForLink(reverseGeoCode[0]?.uCode))
                    }}
                    style={{ textDecoration: "underline", marginTop: "5px" }}
                  >
                    {LOCAL_BASE_URL}?place={reverseGeoCode[0]?.uCode}
                  </Paragraph>
                </Modal>
              </Row>
              <Row>
                <p className="_margin_top_sm _color_light">Get Link</p>
              </Row>
            </Col>
          </Row>
          <Divider></Divider>
          <NearbyButton />
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

          {reverseGeoCode[0] && (
            <Row align="middle" justify="center" style={{ marginTop: "10px" }}>
              <Col span={6}>
                <HomeOutlined style={{ fontSize: 24 }} />
              </Col>
              <Col span={18}>{reverseGeoCode[0]?.address_bn || reverseGeoCode[0]?.Address }</Col>
            </Row>
          )}

          {reverseGeoCode[0]?.uCode && (
            <Row align="middle" justify="center" style={{ marginTop: "10px" }}>
              <Col span={6}>
                <label>UCode: </label>
              </Col>
              <Col span={18}>
                <Text className="blueBorder">
                  {reverseGeoCode[0]?.uCode}
                </Text>
              </Col>
            </Row>
          )}

          {reverseGeoCode[0]?.district && (
            <Row align="middle" justify="center" style={{ marginTop: "16px" }}>
              <Col span={6}>
                <label>District: </label>
              </Col>
              <Col span={18}>
                <Text className="greenBorder">
                  {reverseGeoCode[0]?.district}
                </Text>
              </Col>
            </Row>
          )}

          {reverseGeoCode[0]?.postCode && (
            <Row align="middle" justify="center" style={{ marginTop: "14px" }}>
              <Col span={6}>
                <label>Post Code: </label>
              </Col>
              <Col span={18}>
                <Text className="redBorder">{reverseGeoCode[0]?.postCode}</Text>
              </Col>
            </Row>
          )}
        </Card>
      ) 
      }
    </div>
  );
};

export default ReverseGeocode;
