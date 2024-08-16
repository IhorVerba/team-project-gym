import { Route } from 'react-router';

/**
 * @function generateChildrenRoutes - Generate children routes from an array of routes
 * @param {Array<object>} routes - array of routes
 * @returns {Array<JSX.Element>} - array of Route components
 */
export const generateChildrenRoutes = (routes: Array<object>) =>
  routes.map((route, index) => <Route key={index} {...route} />);
