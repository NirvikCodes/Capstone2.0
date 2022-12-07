
import React from 'react';
import Navigation from './components/Navigation';
import { AuthProvider } from './components/context/AuthContext';
import { Dashboard } from './pages/dashboard/dashboard';

const App = () => {

  return (
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  )
}




export default App;
