import Data from "./pages/data_table";
import CodeForm from "./pages/form";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CodeForm />} />
          <Route path="/entries" element={<Data />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
