import CssBaseline from '@material-ui/core/CssBaseline';
import React, { Fragment, lazy, StrictMode, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import AuthenticatedRoute from './components/Auth/AuthenticatedRoute';
import UnauthenticatedRoute from './components/Auth/UnauthenticatedRoute';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import CourseView from './components/CourseView';
import ErrorBoundary from './components/ErrorBoundaries/Page/index';
import InstructorView from './components/InstructorView';
import Layout from './components/Layout';
import {
  CART,
  CHECKOUT,
  COURSE,
  DASHBOARD,
  INSTRUCTOR_VIEW,
  LOGIN,
  REGISTER,
  REMIND_PASSWORD,
  RESET_PASSWORD,
  ROOT,
  VERIFY,
} from './constants/routes';
import Home from './pages/Home';
import Loading from './pages/Loading';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Notifier from './pages/Notifier';
import Register from './pages/Register';

const RemindPassword = lazy(() => import('./pages/RemindPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const VerifyAccount = lazy(() => import('./pages/VerifyAccount'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => (
  <Fragment>
    <CssBaseline />
    <Notifier />
    <Layout>
      <Suspense fallback={<Loading />}>
        <StrictMode>
          <ErrorBoundary>
            <Switch>
              <Route exact path={ROOT} component={Home} />
              <Route exact path={COURSE} component={CourseView} />
              <Route exact path={RESET_PASSWORD} component={ResetPassword} />
              <Route exact path={VERIFY} component={VerifyAccount} />
              <Route path={INSTRUCTOR_VIEW} component={InstructorView} />

              <UnauthenticatedRoute
                exact
                path={REGISTER}
                component={Register}
              />
              <UnauthenticatedRoute exact path={LOGIN} component={Login} />
              <UnauthenticatedRoute
                exact
                path={REMIND_PASSWORD}
                component={RemindPassword}
              />

              <AuthenticatedRoute
                exact
                path={DASHBOARD}
                component={Dashboard}
              />

              <Route exact path={CART} component={CartView} />
              <Route exact path={CHECKOUT} component={CheckoutView} />

              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </StrictMode>
      </Suspense>
    </Layout>
  </Fragment>
);

export default App;
