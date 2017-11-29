angular.module('newnglms', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider, '$locationProvider') {
  $httpProvider.interceptors.push('AuthInterceptor');
 $locationProvider.html5Mode(false).hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/login/login.html',
      access: {
        restricted: false
      }
    })
    .when('/courses', {
      templateUrl: 'angular-app/course-list/courses.html',
      controller: CoursesController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/course/:id', {
      templateUrl: 'angular-app/course-display/course.html',
      controller: CourseController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
	.when('/playcourse/:id', {
      templateUrl: 'angular-app/play-course/course.html',
      controller: CourseController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
	.when('/login', {
      templateUrl: 'angular-app/login/login.html',
      controller: LoginController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
	.when('/admin', {
      templateUrl: 'angular-app/admin/admin.html',
      controller: CoursesController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/profile', {
      templateUrl: 'angular-app/profile/profile.html',
      access: {
        restricted: true
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

function run($rootScope, $location, $window, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/');
    }
  });
}
