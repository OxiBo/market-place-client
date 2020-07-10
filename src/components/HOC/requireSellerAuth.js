import React, { Component } from "react";
import { withCookies } from "react-cookie";
// import { withRouter } from "react-router-dom";

// import { toast } from "react-toastify";

// import { errorToastStyle } from "../../styles/toastifyStyles";

export default (WrappedComponent) => {
  class RequireSellerAuth extends Component {
    // which life cycle method  is best to use here?
    componentDidMount() {
      console.log(this.props);
      const type = this.props.allCookies.type;
      if (type !== "SELLER") {
        console.log("you are not a seller");
        //   toast("You are not authorized to see this page!", errorToastStyle);
        this.props.history.push("/");
      }
    }
    // shouldComponentUpdate(nextProps) {
    //     console.log(this.props)
    //   console.log(nextProps);
    //   const type = nextProps.allCookies.type;
    //   if (type !== "SELLER") {
    //     console.log("you are not a seller");
    //     //   toast("You are not authorized to see this page!", errorToastStyle);
    //     nextProps.history.push("/");
    //   }

    //   return true;
    // }

    // componentWillUpdate has been deprecated
    // componentWillUpdate(nextProps) {
    //   if (!nextProps.current_user) {
    //     toast("You have to be logged in to see this page!", errorTostStyle);
    //     this.props.history.push("/");
    //   }
    // }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withCookies(RequireSellerAuth);
};
