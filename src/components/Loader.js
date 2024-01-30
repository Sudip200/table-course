import React from 'react';
import {InfinitySpin} from 'react-loader-spinner';
const Loader = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
        <InfinitySpin
  visible={true}
  width="200"
  color="#4fa94d"
  ariaLabel="infinity-spin-loading"
  />
        </div>
    );
    }
export default Loader;