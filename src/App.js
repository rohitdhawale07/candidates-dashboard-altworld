import React, { useEffect, useState } from "react";
import SideNav from "./components/SideNav";
import Dashboard from "./components/Dashboard";

function App() {

  return (
    <div className="flex">
      <SideNav />
      <Dashboard/>
    </div>
  );
}

export default App;
