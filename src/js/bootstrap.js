angular.module('DashTemplates', []);
window.app = angular.module('FamilyDashboard', ['DashTemplates']);

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// Include all directives
// TODO include in smart one with cross-dependencies
requireAll(require.context('./directives/', true, /\.js$/));

var appContainer = document.body;
angular.bootstrap(appContainer, ['FamilyDashboard']);