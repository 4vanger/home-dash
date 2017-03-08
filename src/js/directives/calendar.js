const _ = require('lodash');
const util = require('util');

window.app.directive('dashCalendarComponent', function () {
	return {
		require: ['component'],
		restrict: 'A',
		template: require('partials/calendar.html'),
		scope: {
			component: '='
		},
		controller: function ($scope) {
			$scope.calendarConfig = {
				showNav: 0,
				showDate: 0,
				showPrint: 0,
				showTabs: 0,
				showCalendars: 0,
				showTz: 0,
				mode: 'AGENDA',
				height: 450,
				wkst: 2,
				bgcolor: '#FFFFFF',
				color: '#342104A',
				ctz: 'America/Los_Angeles',
			};
			let params = {
				src: $scope.component.options.calendar,
				ctz: $scope.component.options.ctz,
			};
			const queryParams = _.chain()
				.assign({}, $scope.calendarConfig, params)
				.map(function (value, key) {
					return util.format('%s=%s', encodeURIComponent(key), encodeURIComponent(value));
				})
				.join('&')
				.value();
			$scope.calendarIframeSrc = util.format('https://calendar.google.com/calendar/embed?%s', queryParams);
		},
	}
});