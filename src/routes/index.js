import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';

import Cadastro from '../pages/Cadastro';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" element={<Cadastro />} />
      <Route path="*" element={<Page404 />} />
    </Switch>
  );
}
