import { createBrowserRouter } from 'react-router-dom';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Sidebar from '../components/utils/Sidebar';

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
				path: '/dashboard',
				element: <Home />
			}
		]
	},
	// {
	// 	path: '*',
	// 	element: <Page404 />
	// }
]);

export default router;
