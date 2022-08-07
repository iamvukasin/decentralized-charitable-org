import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { NavigationBar } from './components';
import { useDonationsForTarget, useTargets, useUserDonations } from './hooks';
import { subscribeTargets } from './hooks/useTargets';

const App: FC = () => {
  useTargets();
  useDonationsForTarget();
  useUserDonations();

  useEffect(() => {
    subscribeTargets();
  }, []);

  return (
    <div className="app">
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default App;
