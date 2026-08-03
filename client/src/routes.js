import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage     from './components/AuthPage/AuthPage';
import CreatePage   from './components/CreatePage/CreatePage';
import DetailPage   from './components/DetailPage/DetailPage';
import LinksPage    from './components/LinksPage/LinksPage';

const useRoutes = ( isAuthnticated ) => {
  if ( isAuthnticated ) {
    // when user is autenticated
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    );
  }

  // when user isn't autenticated
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default useRoutes;
