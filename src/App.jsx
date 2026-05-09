import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";

import ExceptionList from "./pages/ExceptionList";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/exceptions"
            element={
              <ProtectedRoute>
                <ExceptionList />
              </ProtectedRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}

export default App;