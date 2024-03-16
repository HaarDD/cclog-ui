import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import React from 'react'
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

function App() {
  // const store = useContext(StoreContext);
  return (
    <>
      {/* {store.authStore.loaderIsReady ? <MySkeleton /> : null} */}
      {/* <Message /> */}
      {/* <Header /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route
          path="/main"
          element={
            // <CheckingAuth userAccess={true} otherPath={'/auth'}>
            <MainPage />
            // <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <p style={{ color: 'red', fontSize: '50px' }}>CClog Main Page</p> </div>
            // </CheckingAuth>
          }
        />
        <Route
          path="/auth/:page"
          element={
            // <CheckingAuth userAccess={false} otherPath={'/main'}>
              <AuthPage />
            // </CheckingAuth>
          }
        />
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
        <Route
          path="/404"
          element={
            // <CheckingAuth otherPath={'404'}>
              <NotFoundPage />
            // </CheckingAuth>
          }
        />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
}

export default App
