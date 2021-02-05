import React from "react";

import requireAuth from "../hoc/requireAuth";
import PageHeader from "./../components/PageHeader";
import MainTableContainer from "../components/Table/MainTableContainer";

const Main = () => {
  return (
    <PageHeader>
      <MainTableContainer />
    </PageHeader>
  );
};

export default requireAuth(Main);
