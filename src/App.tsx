import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import {
  Outlet,
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import AppRoutes from './AppRoutes';
import { theme } from './theme/index';
import { store } from './store/store';
import { Home } from './pages/Home';
import Header from './commons/Header/Header';

const App = () => {
  const AppProvider = () => {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
          <Box className="App">
            <section>
              <Outlet />
            </section>
          </Box>
        </ThemeProvider>
      </Provider>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppProvider />}>
          <Route path="/" element={<Navigate to={AppRoutes.home.path} replace />} />
          <Route path="*" element={<Navigate to={AppRoutes.home.path} replace />} />
          <Route path={AppRoutes.home.path} element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
