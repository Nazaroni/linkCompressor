import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage     from './components/AuthPage/AuthPage';
import CreatePage   from './components/CreatePage/CreatePage';
import DetailPage   from './components/DetailPage/DetailPage';
import LinksPage    from './components/LinksPage/LinksPage';

const useRoutes = ( isAuthnticated ) => {
  if ( isAuthnticated ) {
    // when user is autenticated
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  // when user isn't autenticated
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};

export default useRoutes;
