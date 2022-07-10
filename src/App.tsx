import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './components';

const App: FC = () => (
  <div className="app">
    <NavigationBar />
    <Outlet />
  </div>
);

export default App;
