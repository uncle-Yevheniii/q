import { Navigate, Route, Routes } from "react-router-dom";

import { CustomThemeProvider } from "./ThemeContext";
import { AboutLayout, HeroesLayout, HeroLayout, HomeLayout } from "./layout";

export default function App() {
  return (
    <>
      <CustomThemeProvider>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route
              path="/heroes"
              element={<HeroesLayout />}
              children={<Route path=":heroID" element={<HeroLayout />} />}
            />
            <Route path="/about" element={<AboutLayout />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CustomThemeProvider>
    </>
  );
}
