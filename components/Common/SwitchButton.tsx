import React, { useState } from 'react';
import { Popover, Switch, Tooltip } from 'antd';
import { useAppDispatch } from '@/redux/store';
import { setImgId, setMapillaryData, setSingleMapillaryData } from '@/redux/reducers/mapReducer';
import { FaStreetView } from 'react-icons/fa';

const SwitchButton: React.FC<{ id: (value: null) => void }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [checked,setChecked]=useState(true);
  const onChange = () => {
    if (checked) {
      dispatch(setMapillaryData(true));
      setChecked(false);
    } else {
      dispatch(setMapillaryData(false));
      dispatch(setImgId(null));
      dispatch(setSingleMapillaryData(null))
      id(null);
      setChecked(true);
    }
  };

  // The rest of your component code
  return(
    <div onClick={onChange} style={{...Style, cursor:'pointer',color:checked?'black':'#82CD47', fontSize:checked?32:34}}>
    {/* <Popover title="Street View"> */}
    <Tooltip placement='left' title="Street View"  color='rgba(0, 0, 0, .8)'>
      <FaStreetView style={{ stroke: checked?'none': "#445069", strokeWidth: "18"}}/>
    </Tooltip>
    {/* </Popover> */}
  </div>
  )
}

export default SwitchButton;

const Style: React.CSSProperties = {
  position: "fixed",
  top: 180,
  right: 10,
  background: "none",
  // zIndex: 9999,
};
