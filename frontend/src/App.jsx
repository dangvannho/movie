import { Routes, Route } from "react-router-dom";
import "./App.css";
import listRoute from "./routes/routes";

function App() {
  return (
    <Routes>
      {listRoute.map((item, index) => {
        return <Route key={index} path={item.path} element={item.element} />;
      })}
    </Routes>
  );
}

export default App;
