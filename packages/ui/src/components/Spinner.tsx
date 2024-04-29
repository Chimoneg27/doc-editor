import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = () => (
  <Spin
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
  />
);

export default Spinner;
