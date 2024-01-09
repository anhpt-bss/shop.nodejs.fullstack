import React from "react";
import { Label } from "admin-bro";

const imgStyle = {
  width: "30em",
  border: "2px solid gray",
  borderRadius: "11px",
  margin: "1em auto",
};

const AdminShowResource = (props) => {
  const { record, property } = props;
  return (
    <div>
      <Label>Resource</Label>
      <img style={imgStyle} src={record.params.url} alt="Resource Image" />
    </div>
  );
};

export default AdminShowResource;
