import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import React from 'react'
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import { CheckingAuth } from './hoc/CheckingAuth';
import Message from './components/Message';

function App() {
  // const store = useContext(StoreContext);
  return (
    <>
      {/* {store.authStore.loaderIsReady ? <MySkeleton /> : null} */}
      <Message />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route
          path="/main"
          element={
            <CheckingAuth userAccess={true} otherPath={'/auth'}>
              <MainPage />
            </CheckingAuth>
          }
        />
        <Route
          path="/auth/:page"
          element={
            <CheckingAuth userAccess={false} otherPath={'/main'}>
              <AuthPage />
            </CheckingAuth>
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
