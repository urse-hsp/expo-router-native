import React, { useState, useEffect } from 'react';
import Login from './index'

interface IndexType {
  isVisible?: boolean;
  onClose?: () => any;
}

const Index: React.FC<IndexType> = (props) => {
  return <Login type="create">

  </Login>;
};
export default Index;
