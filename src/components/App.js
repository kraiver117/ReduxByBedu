import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Menu from './Menu';
import UsersApp from './users/Index';
import Posts from './posts';

const Tasks = () => <div>This is awesome</div>
const App = () => (
  <BrowserRouter>
    <Menu />
    <div className='margin'>
      <Route exact path='/users' component={UsersApp} />
      <Route exact path='/tasks' component={Tasks} />
      <Route exact path='/posts/:key' component={Posts} />
    </div>
  </BrowserRouter>
);

export default App;