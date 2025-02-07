import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import listRoute from "./routes/routes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {listRoute.map((item, index) => {
            return (
              <Route key={index} path={item.path} element={item.element} />
            );
          })}
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
