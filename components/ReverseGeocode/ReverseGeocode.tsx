import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
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
import { json } from "stream/consumers";
import axios from "axios";

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

  // const [responseArray, setResponseArray] = useState({});
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    if (reverseGeoCode) {
      try {
        const headers = { Authorization: `Bearer MjYyMzpHOVkzWFlGNjZG` };
        const promises = reverseGeoCode?.place?.images.map((image: { key: string }) => {
          // Specify the response type explicitly
          return axios.get(`https://api.admin.barikoi.com/api/v2/get-place-image-url-without-auth?key=${image.key}`, { headers }) as Promise<{ data: { data: { url: string } } }>;
        });

        // Use Promise.all() to wait for all requests to complete
        Promise.all(promises)
          .then((responses) => {
            // Extract and store image URLs from responses
            const urls = responses.map((response) => response.data.url);
            setImageUrls(urls);
          })
          .catch((error) => {
            // Handle errors specific to the requests
          });
      } catch (error) {
        // Handle errors specific to the code executed within the try block
      }
    } else {
      // Code to execute when reverseGeoCode is not true (optional)
    }
  }, [reverseGeoCode]); // Add dependencies as needed
  
  
  
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
     {(reverseGeoCode && reverseGeoCode?.status) && 
      (
        <Card className="_width_lg">
          {/* showing image */}
          <div className="searchDetails" style={{ borderRadius: '20px', width:'100%', height:'288px' }}>
            {
            reverseGeoCode?.place?.images?.length > 0 ? (
            //   <Carousel arrows={true} style={{ borderRadius: '20px', width:'100%', height:'288px' }}>
            //   {
            //     reverseGeoCode?.place?.images
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
                {/* {
                  reverseGeoCode?.place?.images
                    .slice()
                    .reverse() // Reverse the order of images
                    .map((image: any) => (
                      <div style={{ borderRadius: '20px' }} key={image.id}>
                        {image?.key ? (
                          <Image
                            src={`https://api.bmapsbd.com/${image?.key}`}
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
                } */}
                
                  {imageUrls.slice()
                    .reverse().map((url, index) => (
                    <div style={{ borderRadius: '20px' }} key={index}>
                      {url ? (
                        <Image
                          src={url}
                          alt={`Image ${index}`}
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
                  ))}
          
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
            reverseGeoCode?.place?.business_name ||
            reverseGeoCode?.place?.place_name ||
            reverseGeoCode?.place?.label 
            }
          </h2>
          {/* Address name */}
          {/* <p style={{marginTop: '10px'}}>{reverseGeoCode?.place?.address || reverseGeoCode?.place?.business_name}{reverseGeoCode?.place?.area ?`, ${reverseGeoCode?.place?.area}`:''}{reverseGeoCode?.place?.city ? `, ${reverseGeoCode?.place?.city}. `: ''}</p> */}
          <p style={{marginTop: '10px'}}>{reverseGeoCode?.place?.address || reverseGeoCode?.place?.business_name}</p>
          <p style={{fontWeight: '400', marginTop:'10px' }} className="_color_light"> {reverseGeoCode?.place?.sub_type}</p>

          {reverseGeoCode?.place?.places_additional_data && (
            <div style={{display:'flex', alignItems:'center', marginTop:'20px'}}> 
              {JSON.parse(reverseGeoCode?.place?.places_additional_data)?.contact?.email && <p style={{ display:'flex', alignItems:'center',fontSize:'18px', color:'#279EFF'}}><HiOutlineMail/></p> }  
              {<p style={{marginLeft:'30px'}}>
              {JSON.parse(reverseGeoCode?.place?.places_additional_data)?.contact?.email}
              </p>}
            </div>
          )}
          
          {reverseGeoCode?.place?.places_additional_data && (
            <div style={{display:'flex', alignItems:'center',marginTop:'10px'}}>
              {JSON.parse(reverseGeoCode?.place?.places_additional_data)?.contact?.phone&& <p style={{display:'flex', alignItems:'center',fontSize:'16px', color:'#279EFF'}}><BsFillTelephoneFill/></p>}
              <p style={{marginLeft:'30px'}}>
              {JSON.parse(reverseGeoCode?.place?.places_additional_data)?.contact?.phone}
              </p> 
            </div>
          )}
          
          {reverseGeoCode?.place?.places_additional_data && (
            <div style={{display:'flex', alignItems:'center',marginTop:'10px'}}>
              {JSON.parse(reverseGeoCode?.place?.places_additional_data)?.contact?.website && <p style={{display:'flex', alignItems:'center',fontSize:'16px', color:'#279EFF'}}><BiWorld/></p>}
              <a href={JSON.parse(reverseGeoCode?.place?.places_additional_data)?.contact?.website} style={{marginLeft:'30px'}}>
              {JSON.parse(reverseGeoCode?.place?.places_additional_data)?.contact?.website}
              </a> 
            </div>
          )}

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
                      {reverseGeoCode?.place?.images?.length > 0 ? (
                        <Image
                          src={
                            imageUrls
                              ? `${imageUrls[0]}`
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
                        <b>Address:</b> {reverseGeoCode?.place?.address}
                      </p>
                      <p style={{ fontSize: "14px" }}>
                        <b>City:</b> {reverseGeoCode?.place?.city}
                      </p>
                    </Col>
                  </Row>
                  <Divider />
                  <p style={{ color: "#bbb" }}>Copy link</p>
                  <Paragraph
                    copyable={{
                      text: `${LOCAL_BASE_URL}?place=${reverseGeoCode?.place?.place_code
                      }/`,
                      onCopy: () => dispatch(setuCodeForLink(reverseGeoCode?.place?.place_code
                      ))
                    }}
                    style={{ textDecoration: "underline", marginTop: "5px" }}
                  >
                    {LOCAL_BASE_URL}?place={reverseGeoCode?.place?.place_code
}
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

          {reverseGeoCode?.place && (
            <Row align="middle" justify="center" style={{ marginTop: "10px" }}>
              <Col span={6}>
                <HomeOutlined style={{ fontSize: 24 }} />
              </Col>
              <Col span={18}>{reverseGeoCode?.place?.address_bn || reverseGeoCode?.place?.address }</Col>
            </Row>
          )}

          {reverseGeoCode?.place?.place_code && (
            <Row align="middle" justify="center" style={{ marginTop: "10px" }}>
              <Col span={6}>
                <label>Place Code: </label>
              </Col>
              <Col span={18}>
                <Text className="blueBorder">
                  {reverseGeoCode?.place?.place_code}
                </Text>
              </Col>
            </Row>
          )}

          {reverseGeoCode?.place?.district && (
            <Row align="middle" justify="center" style={{ marginTop: "16px" }}>
              <Col span={6}>
                <label>District: </label>
              </Col>
              <Col span={18}>
                <Text className="greenBorder">
                  {reverseGeoCode?.place?.district}
                </Text>
              </Col>
            </Row>
          )}

          {reverseGeoCode?.place?.postcode && (
            <Row align="middle" justify="center" style={{ marginTop: "14px" }}>
              <Col span={6}>
                <label>Post Code: </label>
              </Col>
              <Col span={18}>
                <Text className="redBorder">{reverseGeoCode?.place?.postcode}</Text>
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
