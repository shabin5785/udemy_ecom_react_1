import React from "react";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false
    };
  }
  static getDerivedStateFromError(error) {
    //process error as needed
    //and set state
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    //process error and info about error
  }

  render() {
    if (this.state.hasError) {
      return <div>Something Went Wrong</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
