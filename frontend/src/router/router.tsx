import { createBrowserRouter } from 'react-router-dom';
import Login from '../screens/Login';
import Sidebar from '../components/utils/Sidebar';
import ComparisonGraph from '../screens/Dashboard/ComparisonGraph';
import TimeSeriesGraph from '../screens/Dashboard/TimeSeriesGraph';
import Page404 from '../screens/Page404';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Login />
	},
	{
		path: '/dashboard',
		element: <Sidebar />,
		children: [
			{
				path: '/dashboard/comparison',
				element: <ComparisonGraph />
			},
			{
				path: '/dashboard/time-series',
				element: <TimeSeriesGraph />
			}
		]
	},
	{
		path: '*',
		element: <Page404 />
	}
]);

export default router;
