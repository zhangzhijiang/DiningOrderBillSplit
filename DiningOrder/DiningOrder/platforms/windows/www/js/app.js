﻿// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('diningorder', ['ionic', 'diningorder.controllers', 'diningorder.services', 'diningorder.directives'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})
.config(['$ionicConfigProvider', function ($ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html"
      })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.orders', {
        url: '/orders',
        views: {
            'tab-orders': {
                templateUrl: 'templates/tab-orders.html',
                controller: 'OrdersCtrl'
            }
        }
    })

    .state('tab.everythingbill', {
        url: '/everythingbill',
        views: {
            'tab-everythingbill': {
                templateUrl: 'templates/tab-everythingbill.html',
                controller: 'EverythingBillCtrl'
            }
        }
    })

           .state('tab.add-cost', {
               url: '/addcost/:costId',
               views: {
                   'tab-everythingbill': {
                       templateUrl: 'templates/add-cost.html',
                       controller: 'AddCostCtrl'
                   }
               }
           })

          .state('tab.add-buyer', {
              url: '/addbuyer/:buyerId',
              views: {
                  'tab-everythingbill': {
                      templateUrl: 'templates/add-buyer.html',
                      controller: 'AddBuyerCtrl'
                  }
              }
          })


    .state('tab.bill', {
        url: '/bill',
        views: {
            'tab-bill': {
                templateUrl: 'templates/tab-bill.html',
                controller: 'BillCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/bill');

});

