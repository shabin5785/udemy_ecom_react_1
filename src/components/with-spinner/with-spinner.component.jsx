import React from "react";

import Spinner from "../spinner/spinner.componet";

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

// const WithSpinner = WrappedComponent => {
//   let { isLoading, ...otherProps } = WrappedComponent;
//   console.log(" wl ", WrappedComponent);
//   const Spinner = isLoading ? (
//     <SpinnerOverlay>
//       <SpinnerContainer />
//     </SpinnerOverlay>
//   ) : (
//     <WrappedComponent {...otherProps} />
//   );

//   return Spinner;
// };

export default WithSpinner;
