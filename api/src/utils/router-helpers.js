export const GetRouteParam = (params, paramDefinition) => {
	return params[paramDefinition.replace(':', '')];
};
