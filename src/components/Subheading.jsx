import React from "react";

import Text from "./Text";


const Subheading = (props) => {
  return <Text
    fontSize="subheading"
    fontWeight="bold"
    {...props}
  />;
};

export default Subheading;