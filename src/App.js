import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";
import PageNotFound from "./views/PageNotFound";
import ROUTES from "./constants/routes";
import ContactDetails from "./views/ContactDetails";
import ManageDetails from "./views/ManageDetails";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.VIEW} element={<ContactDetails />} />
          <Route path={ROUTES.CREATE} element={<ManageDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
