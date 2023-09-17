import React, { useEffect, useState } from 'react';
import { Viewer } from 'mapillary-js';
import { AiOutlineCloseCircle, AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setImgId, setSingleMapillaryData } from '@/redux/reducers/mapReducer';
  // const dispatch = useAppDispatch();
  interface MapillaryViewerProps {
    id: string;
    // width: string;
  // height: string; 
  onMapillaryData: any;
}
const MapillaryViewer: React.FC<MapillaryViewerProps> = ({ onMapillaryData, id}) => {
  
  const singleMapillaryData = useAppSelector((state) => state?.map?.singleMapillaryData ?? null);
  const imgId = useAppSelector((state) => state?.map?.imgId ?? null);
  const dispatch = useAppDispatch();
  const [fullScreen, setFullScreen]=useState(false);
  useEffect(() => {
    const viewer = new Viewer({
      accessToken: "MLY|9965372463534997|6cee240fad8e5571016e52cd3f24d7f8",
      container: "mapillary-container", // Use the ID of your container element
      imageId: imgId ? imgId : id, // Specify the image ID you want to display
      component:{cover:false},
    });

    const onImage = (event: { image: { id: any; }; })=>{
      const imageId = event.image.id;
      dispatch(setImgId(imageId))
    };
      viewer.on('image', onImage);

    return () => {
      viewer.remove();
    };
  }, [id,fullScreen]);

  const fullScreenView = ()=>{
    if(!fullScreen){
      setFullScreen(true)
    } else{
      setFullScreen(false)
    }
  }

  return (
    <div id="mapillary-container"  style={{ width:!fullScreen?'26%':'100%', height:!fullScreen?'34vh':'100vh', zIndex:999000, position:'absolute', bottom:'0', borderRadius:!fullScreen?'20px':0, margin:!fullScreen? 10:0}}>
      <div style={{width:'100%', position:'relative'}}>

      {/* <div style={{display:"flex", justifyContent:'space-between', position:'absolute',zIndex:'999999', width:'100%'}}> */}
        <div onClick={onMapillaryData} style={{color:'white', fontSize:'32px', borderRadius:'50%', background:'rgba(0, 0, 0, 0.47)',width:'fit-content', margin:'10px',zIndex:'999999', top:'0', position:'absolute', display:'inline-block'}}><AiOutlineCloseCircle></AiOutlineCloseCircle></div>
        <div onClick={fullScreenView} style={{color:'white', fontSize:'32px', borderRadius:'50%', background:'rgba(0, 0, 0, 0.47)',width:'fit-content', margin:'10px', zIndex:'999999', right:'0', position:'absolute', display:'inline-block'}}>{!fullScreen ? <AiOutlineFullscreen></AiOutlineFullscreen> : <AiOutlineFullscreenExit></AiOutlineFullscreenExit>}</div>
      {/* </div> */}
      </div>
    </div>
  );
};
export default MapillaryViewer;