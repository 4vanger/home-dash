const angular = require('angular');
// init modules
angular.module('DashTemplates', []);
window.app = angular.module('FamilyDashboard', ['DashTemplates']);

// Include all directives
// TODO include in smart one with cross-dependencies
function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}
requireAll(require.context('./directives/', true, /\.js$/));
requireAll(require.context('./controllers/', true, /\.js$/));

function loadBootstrapApi() {
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', '/api/bootstrap.json');
		xhr.onload = function () {
			var apiResponse = JSON.parse(xhr.response);
			// TODO check for error responses

			// save data
			window.app.constant('bootstrapData', apiResponse.data);
			resolve();
		};
		xhr.onerror = function () {
			reject(xhr.response);
		};
		xhr.send();
	});
}

function startApp() {
	const appContainer = document.body;
	angular.bootstrap(appContainer, ['FamilyDashboard']);
	return Promise.resolve();
}

loadBootstrapApi()
	.then(startApp);
