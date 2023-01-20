import React from "react";

export const RootContext = React.createContext({
  onboarded: false,
  setOnboard: () => {},
  adminboarded: false,
  setAdminboard: () => {},
});
