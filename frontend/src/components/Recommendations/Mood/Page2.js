import React from "react";

import Navigate from "./Navigate";

export default function Page2(props) {
  return (
    <div>
      <div>page2</div>
      <Navigate title="Back" setPage={props.setPage} goto={1} />
    </div>
  );
}
