import React from 'react';
import {InfinitySpin} from 'react-loader-spinner';
const TableLoader = () => {
    return (
        <div className="w-full h-40 flex justify-center items-center">
        <InfinitySpin
  visible={true}
  width="200"
  color="#4fa94d"
  ariaLabel="infinity-spin-loading"
  />
        </div>
    );
    }
export default TableLoader;