import { RouteProps, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import React from 'react';

interface PrivateRouteProps extends Omit<RouteProps, 'element'> {
	element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
	const { accessToken, refreshToken } = React.useContext(AuthContext);

	const navigate = useNavigate();

	if (!accessToken || !refreshToken) {
		navigate('/');
		return null;
	}

	return element;
};

export default PrivateRoute;
