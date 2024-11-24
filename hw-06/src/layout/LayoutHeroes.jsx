import { Outlet } from "react-router-dom";

import { DataTableGrid } from "../components";

export default function HeroesLayout() {
  return (
    <>
      <DataTableGrid />
      <Outlet />
    </>
  );
}
