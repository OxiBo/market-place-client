import { css } from "glamor";
import { theme } from "../App"
export const toastOptions = {
    position: "top-center",
    autoClose: 150000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    className: css({
      background: `${theme.toastBackground}!important`,
      color: `${theme.purple}!important`,
      fontWeight: "bold",
      height: "50px!important",
      borderRadius: "5px!important"
    })
  };
  
  export const errorToastStyle = {
    ...toastOptions,
    className: css({
      background: "rgba(255,229,229, 0.9)!important",
      color: "red!important",
      fontWeight: "bold",
      borderRadius: "5px!important"
    })
  };