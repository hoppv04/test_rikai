import { Route, Routes } from "react-router-dom";
import PostManagement from "./pages/PostManagement";
import { Toaster } from "react-hot-toast";
import PostForm from "./pages/PostForm";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<PostManagement />} />
          <Route path="/add" element={<PostForm />} />
          <Route path="/update/:id" element={<PostForm />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
