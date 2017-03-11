
const util = require('util');

window.app.directive('dashComponent', function ($compile) {
	return {
		restrict: 'E',
		template: require('partials/component.html'),
		scope: {
			component: '='
		},
		link: function (scope, element, attrs) {
			const panelBody = angular.element(element[0].querySelector('.panel-body'));
			const html = util.format('<dash-component-%s component="component"></dash-component-%s>', scope.component.type, scope.component.type)
			panelBody.html(html);
			$compile(element.contents())(scope);
		},
	};
});