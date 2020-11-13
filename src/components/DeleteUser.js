import React from "react";
import { useHistory } from "react-router-dom";
import { Mutation } from "react-apollo";
import Button from "./styled/Button";
import { DELETE_USER, DELETE_SELLER } from "../utils/serverOperations";
import removeAuthCookies from "../utils/removeAuthCookies";

const DeleteUser = ({ type, cookies }) => {
  //   console.log(cookies);
  const history = useHistory();
  return (
    <Mutation
      mutation={type === "BUYER" ? DELETE_USER : DELETE_SELLER}
      onCompleted={() => {
        removeAuthCookies(cookies);
        history.push("/");
      }}
    >
      {(deleteUser) => (
        <Button
          onClick={() => {
              // TODO make the confirm window - react modal
            if (window.confirm("Are you sure you want to delete your profile?")) {
              deleteUser(cookies).catch((err) => {
                console.error(err);
                alert(err.message);
              });
            }
          }}
        >
          {" "}
          Delete Profile
        </Button>
      )}
    </Mutation>
  );
};

export default DeleteUser;
