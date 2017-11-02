angular.module('diningorder.controllers', [])

.controller('DashCtrl', function ($scope) { })

//Add Cost Controller
      .controller('AddCostCtrl', function ($scope, $ionicPopup, $state, $stateParams, $ionicHistory, EverythingBillService) {
          $scope.costArray = EverythingBillService.getAllCosts();
          $scope.buyerArray = EverythingBillService.getAllBuyers();
          if (!$stateParams.costId) {
              $scope.currentCost = EverythingBillService.createNewCost();
          } else {
              $scope.currentCost = EverythingBillService.getCost($stateParams.costId);
          }


          $scope.saveCostChange = function () {
              console.log("update Cost Array.");
              //remove the cost from cost array if it is alreay there
              var currentCostId = $scope.removeCurrentCost();
              //then add a new one with a new id and updated information.
              var newCost = new Object();
              if (currentCostId)
              { newCost.id = $scope.currentCost.id }
              else {
                  newCost.id = EverythingBillService.getGuidId();
              }

              newCost.name = $scope.currentCost.name;
              newCost.tipTax = $scope.currentCost.tipTax;
              newCost.amount = $scope.currentCost.amount;

              //TODO update buyer ids when create or update an cost.
              newCost.buyerIds = [];
              for (var i = 0; i < $scope.buyerArray.length; i++) {
                  if ($scope.buyerArray[i].buyerHasThisCost) {
                      console.log("$scope.buyerArray[i].buyerHasThisCost" + $scope.buyerArray[i].buyerHasThisCost);
                      newCost.buyerIds.push($scope.buyerArray.buyerId);
                  }
              }
              EverythingBillService.saveCost(newCost);
              $state.go('tab.everythingbill');
          }; //saveCostArray

          $scope.cancelCostChange = function () {
              $scope.currentCost = new Object();
              $ionicHistory.goBack();
          }; //cancelCostChange

          $scope.removeCurrentCost = function () {
              for (var i = 0; i < $scope.costArray.length; i++) {
                  if ($scope.costArray[i].id == $scope.currentCost.id) {
                      $scope.costArray.splice(i, 1);
                      return $scope.currentCost.id;
                  }
              }
          };

          $scope.checkBuyerHasThisCost = function ($index) {
              console.log($scope.currentBuyer.name+ "====" + $scope.currentBuyer.buyerHasThisCost);
            //  console.log("====" + $scope.currentCost.buyerIds);
              if ($scope.currentCost != null) {
                  if ($scope.buyerArray[$index].buyerHasThisCost) {//checkbox checked.

                      if ($scope.currentCost.buyerIds.indexOf($scope.buyerArray[$index].id) == -1) {
                          $scope.currentCost.buyerIds.push($scope.buyerArray[$index].id);
                      }
                  } else { //checkbox unchecked.
                      if ($scope.currentCost.buyerIds.indexOf($scope.buyerArray[$index].id) != -1) {
                          $scope.currentCost.buyerIds.splice($scope.currentCost.buyerIds.indexOf($scope.buyerArray[$index].id), 1);
                      }
                  }
              }
          };//checkBuyerHasThisCost

          // A confirm dialog to delete cost
          $scope.deleteCostConfirm = function () {
              var confirmPopup = $ionicPopup.confirm({
                  title: 'Delete Cost',
                  template: 'Are you sure you want to delete this Cost?',
                  cancelText: 'No',
                  okText: 'YES'
              });
              confirmPopup.then(function (res) {
                  if (res) {
                      $scope.removeCurrentCost();
                      $state.go('tab.everythingbill');
                  } else {
                      return;
                      console.log('You are not sure');
                  }
              });
          }; // A confirm dialog to delete buyer

      }) //Add Cost Controller




//Add Buyer Controller
      .controller('AddBuyerCtrl', function ($scope, $ionicPopup, $state, $stateParams, $ionicHistory, EverythingBillService) {
          $scope.costArray = EverythingBillService.getAllCosts();
          $scope.buyerArray = EverythingBillService.getAllBuyers();
          if (!$stateParams.buyerId) {
              $scope.currentBuyer = EverythingBillService.createNewBuyer();
          } else {
              $scope.currentBuyer = EverythingBillService.getBuyer($stateParams.buyerId);
          }


          $scope.saveBuyerChange = function () {
              console.log("update Buyer Array.");
              var currentBuyerId = $scope.removeCurrentBuyer();
              console.log("current buyer id " + currentBuyerId);
              var newBuyer = new Object();
              if (currentBuyerId) {
                  newBuyer.id = currentBuyerId;
              } else {
                  newBuyer.id = EverythingBillService.getGuidId();
              }
              newBuyer.name = $scope.currentBuyer.name;
              newBuyer.email = $scope.currentBuyer.email;
              newBuyer.costIds = []; //re-initialize the costIds.
              //if
              for (var i = 0; i < $scope.costArray.length; i++) {
                  console.log($scope.costArray[i].name +" cost has this buyer" + $scope.costArray[i].costHasThisBuyer);

              }
              EverythingBillService.saveBuyer(newBuyer);
              $state.go('tab.everythingbill');
          }; //saveBuyerArray

          $scope.cancelBuyerChange = function () {
              $scope.currentBuyer = new Object();
              $ionicHistory.goBack();
          }; //cancelCostChange

          $scope.removeCurrentBuyer = function () {
              for (var i = 0; i < $scope.buyerArray.length; i++) {
                  if ($scope.buyerArray[i].id == $scope.currentBuyer.id) {
                      $scope.buyerArray.splice(i, 1);
                      return $scope.currentBuyer.id;
                  }
              }
          };

          $scope.checkCostHasThisBuyer = function ($index) {
              console.log("====" + $scope.currentBuyer);
              //if ($scope.currentBuyer != null) {

              //    if ($scope.costArray[$index].costHasThisBuyer) {//checkbox checked.

              //        if ($scope.currentBuyer.costIds.indexOf($scope.costArray[$index].id) == -1) {
              //            $scope.currentBuyer.costIds.push($scope.costArray[$index].id);
              //        }
              //    } else { //checkbox unchecked.
              //        if ($scope.currentBuyer.costIds.indexOf($scope.costArray[$index].id) != -1) {
              //            $scope.currentBuyer.costIds.splice($scope.currentCost.costIds.indexOf($scope.costArray[$index].id), 1);
              //        }
              //    }
              //}
          };//checkCostHasThisBuyer


          // A confirm dialog to delete buyer
          $scope.deleteBuyerConfirm = function () {
              var confirmPopup = $ionicPopup.confirm({
                  title: 'Delete Buyer',
                  template: 'Are you sure you want to delete this buyer?',
                  cancelText: 'No',
                  okText: 'YES'
              });
              confirmPopup.then(function (res) {
                  if (res) {
                      $scope.removeCurrentBuyer();
                      $state.go('tab.everythingbill');
                  } else {
                      return;
                      console.log('You are not sure');
                  }
              });
          }; // A confirm dialog to delete buyer

      })//Add Buyer Controller

/**
   Controll for every thing bill split
  
  // cost: id, name, amount, tipTax, buyerIds[], averageAmount,picture
  //buyer: id, name, amount, costIds[], email, phone, picture

*/

    .controller('EverythingBillCtrl', function ($scope, $ionicPopup, EverythingBillService, $state, $stateParams, $ionicHistory, $timeout, $http, $window) {
        $scope.costArray = EverythingBillService.getAllCosts();
        $scope.buyerArray = EverythingBillService.getAllBuyers();

        $scope.addCostButtonClick = function () {
            $state.go('tab.add-cost');
        }; //addCostButtonClick


        $scope.addBuyerButtonClick = function () {
            $state.go('tab.add-buyer');
        }; //addBuyerButtonClick


        $scope.currentCost = EverythingBillService.getCost($stateParams.costId);

        $scope.currentBuyer = EverythingBillService.getBuyer($stateParams.buyerId);

    })

/**
*/


.controller('BillCtrl', function ($scope, $ionicPopup, $timeout, $http, $window) {
    // $scope.addPersonButtonDisabled = true;
    $scope.totalBill = 0;
    $scope.tipAmount = 0;
    $scope.tipPercent = 0;
    $scope.totalFinalAmount = 0;
    $scope.totalPersonsArray = [];
    $scope.totalPersons = 0;
    $scope.currentPerson = new Object();
    /**
    $scope.currentPerson = {
        index: 0,
        name : 'Me',
        face : "https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png",
        amount : 0
    };
    */

    // $scope.totalPersonsArray.push($scope.currentPerson);


    $scope.totalBillChange = function (scope) {
        if ($scope.doIsNumber($scope.totalBill)) {
            if ($scope.doIsNumber($scope.tipPercent)) {
                $scope.tipAmount = $scope.totalBill * $scope.tipPercent / 100;
                $scope.totalFinalAmount = $scope.totalBill + $scope.tipAmount;
            } else {
                $scope.tipPercent = 0;
                $scope.tipAmount = 0;
                $scope.totalFinalAmount = $scope.totalBill;
            }
        }
        $scope.doBillSplit();
        //   console.log("total bill change called.");
    };

    $scope.totalBillBlur = function () {

        if (!$scope.doIsNumber($scope.totalBill)) {
            $scope.totalBill = 0;
            $scope.totalBillChange();
        }
    };




    $scope.tipPercentChange = function (scope) {
        //  console.log("tip percent change called.");
        if ($scope.doIsNumber($scope.tipPercent)) {
            if ($scope.doIsNumber($scope.totalBill)) {
                $scope.tipAmount = $scope.totalBill * $scope.tipPercent / 100;
                $scope.totalFinalAmount = $scope.totalBill + $scope.tipAmount;
            } else {
                $scope.tipAmount = 0;
                $scope.totalFinalAmount = 0;
            }
        } else {
            //see blur event
        }
        $scope.doBillSplit();
    };


    $scope.tipPercentBlur = function () {

        if (!$scope.doIsNumber($scope.tipPercent)) {
            $scope.tipPercent = 0;
            $scope.tipPercentChange();

        }
    };

    $scope.tipAmountChange = function (scope) {
        // console.log("tip amount change called.");
        if ($scope.doIsNumber($scope.tipAmount)) {
            if ($scope.doIsNumber($scope.totalBill)) {
                $scope.tipPercent = $scope.tipAmount * 100 / $scope.totalBill;
                $scope.totalFinalAmount = $scope.totalBill + $scope.tipAmount;

            } else {
                $scope.totalBill = 0;
                $scope.tipPercent = 0;
                $scope.totalFinalAmount = $scope.tipAmount;
            }
        } else {
            //see blur event
        }
        $scope.doBillSplit();
    };

    $scope.tipAmountBlur = function () {

        if (!$scope.doIsNumber($scope.tipAmount)) {
            $scope.tipAmount = 0;
            $scope.tipAmountChange();

        }
    };


    $scope.totalFinalAmountChange = function (scope) {
        //   console.log("total final amount change called.");
        if ($scope.doIsNumber($scope.totalFinalAmount)) {
            if ($scope.doIsNumber($scope.totalBill) && $scope.totalBill > 0) {

                $scope.tipPercent = ($scope.totalFinalAmount - $scope.totalBill) * 100 / $scope.totalBill;
                $scope.tipAmount = $scope.totalFinalAmount - $scope.totalBill;
            } else {
                $scope.totalBill = 0;
                $scope.tipPercent = 0;
                $scope.tipAmount = 0;
            }
        } else {
            //see blur event;
        }
        $scope.doBillSplit();
    };
    $scope.totalFinalAmountBlur = function () {

        if (!$scope.doIsNumber($scope.totalFinalAmount)) {
            $scope.totalBill = 0;
            $scope.tipPercent = 0;
            $scope.tipAmount = 0;
            $scope.totalFinalAmount = 0;

        } else if (!$scope.doIsNumber($scope.totalBill) || $scope.totalBill <= 0) {
            $scope.totalBill = $scope.totalFinalAmount;
            //} else if ($scope.totalFinalAmount < $scope.totalBill) {
            //    $scope.totalFinalAmount = $scope.totalBill;
        }
    }



    /**
    * check if a number a number
    */
    $scope.doIsNumber = function (num) {
        return !isNaN(parseFloat(Math.round(num * 100) / 100).toFixed(2));
    };

    $scope.doToNumber = function (num) {
        if (!isNaN(parseFloat(Math.round(num * 100) / 100).toFixed(2))) {
            return num;
        } else {
            return 0;
        }

    };





    $scope.addPersonClick = function (scope) {

        //  console.log("$scope.totalPersons = "+$scope.totalPersons);
        $scope.totalPersons++;
        //  console.log("$scope.totalPersonsArray.length= "+$scope.totalPersonsArray.length);

        var person = new Object();
        person.index = $scope.totalPersonsArray.length + 1;
        if ($scope.currentPerson.name == null || angular.isUndefined($scope.currentPerson.name)) {
            person.name = 'PersonName ';
        } else {
            person.name = $scope.currentPerson.name;
        }
        if ($scope.totalPersons % 2) {
            person.face = "img/payee-odd.png";
        } else {
            person.face = "img/payee-even.png";
        }
        var totalAmountToSplit = $scope.doToNumber($scope.totalBill);

        for (i = 0; i < $scope.totalPersonsArray.length; i++) {
            if ($scope.doIsNumber($scope.totalPersonsArray[i].extra)) {
                totalAmountToSplit = totalAmountToSplit - $scope.doToNumber($scope.totalPersonsArray[i].extra);
            }
        }
        //  console.log("totalAmountToSplit = "+totalAmountToSplit);

        person.amount = (totalAmountToSplit + $scope.doToNumber($scope.tipAmount)) / $scope.doToNumber($scope.totalPersons);
        //  console.log("person.amount = "+person.amount);

        var indivialEvenAmount = 0;

        if ($scope.doIsNumber($scope.totalPersons) && $scope.totalPersons > 0) {
            individualEvenAmount = totalAmountToSplit / $scope.totalPersons;
        } else {
            individualEvenAmount = totalAmountToSplit;
        }


        //  console.log("individualEvenAmount"+individualEvenAmount);

        $scope.totalPersonsArray.push(person);
        $scope.totalPersons = $scope.totalPersonsArray.length;

        for (i = 0; i < $scope.totalPersonsArray.length; i++) {

            $scope.totalPersonsArray[i].amount = (individualEvenAmount + $scope.doToNumber($scope.totalPersonsArray[i].extra)) * (1 + $scope.doToNumber($scope.tipPercent) / 100);
            //  console.log($scope.totalPersonsArray[i].amount);
        }
        $scope.totalPersons = $scope.totalPersonsArray.length;
        person = null;
        $scope.currentPerson.name == null;
        //  }

    };


    $scope.doBillSplit = function (scope) {
        //  console.log(" doBillSplit called.");
        var totalAmountToSplit = $scope.doToNumber($scope.totalBill);


        //  console.log("totalAmountToSplit =" + totalAmountToSplit);

        for (i = 0; i < $scope.totalPersonsArray.length; i++) {
            totalAmountToSplit = totalAmountToSplit - $scope.doToNumber($scope.totalPersonsArray[i].extra);
        }

        var indivialEvenAmount = 0;

        if ($scope.doIsNumber($scope.totalPersons) && $scope.totalPersons > 0) {
            individualEvenAmount = totalAmountToSplit / $scope.totalPersons;
        } else {
            individualEvenAmount = totalAmountToSplit;
        }


        for (i = 0; i < $scope.totalPersonsArray.length; i++) {
            $scope.totalPersonsArray[i].amount = (individualEvenAmount + $scope.doToNumber($scope.totalPersonsArray[i].extra)) * (1 + $scope.doToNumber($scope.tipPercent) / 100);
        }

    };

    $scope.resetBill = function ($state) {
        //  console.log("reset Bill form.");
        $window.location.reload(true);
        $scope.totalBill = 0;
        $scope.tipAmount = 0;
        $scope.tipPercent = 0;
        $scope.totalFinalAmount = 0;
        $scope.totalPersonsArray = [];
        $scope.totalPersons = 0;
        $scope.currentPerson = new Object();

    };

    // A confirm dialog
    $scope.showConfirm = function () {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Reset Bill',
            template: 'Are you sure you want to clear all the bill info?',
            cancelText: 'No',
            okText: 'YES'
        });
        confirmPopup.then(function (res) {
            if (res) {
                $scope.resetBill();
            } else {
                return;
                console.log('You are not sure');
            }
        });
    };

    $scope.closeApp = function () {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        }
    }





    $scope.removePersonClick = function ($index) {
        // console.log("remove person button clicked.");
        $scope.totalPersonsArray.splice($index, 1);
        $scope.totalPersons = $scope.totalPersonsArray.length;
        $scope.doBillSplit();
    };



    //////////////////////////////////////////////////////////////////////////////////////
    // Triggered on a button click, or some other target
    $scope.payExtra = function ($index) {
        $scope.data = {}
        // An elaborate, custom popup
        var payExtraPopup = $ionicPopup.show({
            template: '<input type="number" ng-model="data.extra" autofocus>',
            title: 'Add Extra Amount',
            subTitle: 'The following amount plus tip will be added to this person',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                  text: '<b>Save</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if (!$scope.data.extra) {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault();
                      } else {
                          var totalExtras = $scope.doToNumber($scope.data.extra);
                          for (i = 0; i < $scope.totalPersonsArray.length; i++) {
                              totalExtras = totalExtras + $scope.doToNumber($scope.totalPersonsArray[i].extra);
                          }
                          //   console.log("Total Extra =" + totalExtras);
                          if (totalExtras > $scope.totalBill) {
                              $scope.totalPersonsArray[$index].extra = 0;

                          } else {
                              $scope.totalPersonsArray[$index].extra = $scope.data.extra;

                          }
                          $scope.doBillSplit();
                          return $scope.data.extra;
                      }
                  }
              }
            ]
        });
        payExtraPopup.then(function (res) {
            //  console.log('Tapped!', res);
        });
        $timeout(function () {
            payExtraPopup.close(); //close the popup after 3 seconds for some reason
        }, 150000);
    };
    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////
    // Triggered on a button click, or some other target
    $scope.sendReminder = function ($index) {
        $scope.data = {}
        // An elaborate, custom popup
        var sendReminderPopup = $ionicPopup.show({
            template: '<input type="email" ng-model="data.email" autofocus>',
            title: 'Email Reminder',
            subTitle: 'An email reminder will be sent to the following email',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                  text: '<b>Send</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if (!$scope.data.email) {
                          //don't allow the user to close unless he enters wifi password
                          e.preventDefault();
                      } else {
                          $scope.totalPersonsArray[$index].email = $scope.data.email;
                          $scope.sendMail({
                              toEmail: $scope.data.email,
                              subject: 'Dining Order - Your Bill',
                              mailBody: 'Your total amount is $' + $scope.totalPersonsArray[$index].amount + " (including $" + $scope.totalPersonsArray[$index].extra + " extra plus tips.)"
                          });
                          return $scope.data.email;
                      }
                  }
              }
            ]
        });
        sendReminderPopup.then(function (res) {
            console.log('Tapped!', res);
        });
        $timeout(function () {
            sendReminderPopup.close(); //close the popup after 3 seconds for some reason
        }, 150000);
    };
    //////////////////////////////////////////////////////////////////////////////////////

    //put sendmail to the same controller
    $scope.sendMail = function (a) {
        console.log(a.toEmail);
        var mailJSON = {
            "key": "PnTGlSq9RN5Z32zsfMknqg",
            "message": {
                "html": "" + a.mailBody,
                "text": "" + a.mailBody,
                "subject": "" + a.subject,
                "from_email": "notification@DiningOrder.ca",
                "from_name": "Dining Order - Your Bill Reminder",
                "to": [
                  {
                      "email": "" + a.toEmail,
                      "name": "Dining Order",
                      "type": "to"
                  }
                ],
                "important": false,
                "track_opens": null,
                "track_clicks": null,
                "auto_text": null,
                "auto_html": null,
                "inline_css": null,
                "url_strip_qs": null,
                "preserve_recipients": null,
                "view_content_link": null,
                "tracking_domain": null,
                "signing_domain": null,
                "return_path_domain": null
            },
            "async": false,
            "ip_pool": "Main Pool"
        };
        var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";

        $http.post(apiURL, mailJSON).
          success(function (data, status, headers, config) {
              alert('successful email send.');
              $scope.form = {};
              //// console.log('successful email send.');
              //// console.log('status: ' + status);
              // console.log('data: ' + data);
              // console.log('headers: ' + headers);
              // console.log('config: ' + config);
          }).error(function (data, status, headers, config) {
              console.log('error sending email.');
              console.log('status: ' + status);
          });
    };
    //put sendmail to the same controller end
})



.controller('OrdersCtrl', function ($scope, OrderService) {
    $scope.orders = [];
    // $scope.orders = OrderService.all();
    $scope.remove = function (order) {
        OrderService.remove(order);

    };
}
)



////////////////// sendemail through https://mandrillapp.com/ markzhang2005@yaho.com mark19730203
.controller('sentMailCtrl', function ($scope, $http) {
    $scope.sendMail = function (a) {
        console.log(a.toEmail);
        var mailJSON = {
            "key": "PnTGlSq9RN5Z32zsfMknqg",
            "message": {
                "html": "" + a.mailBody,
                "text": "" + a.mailBody,
                "subject": "" + a.subject,
                "from_email": "noreply@fooddelivery.com",
                "from_name": "New Order",
                "to": [
                  {
                      "email": "" + a.toEmail,
                      "name": "New Order",
                      "type": "to"
                  }
                ],
                "important": false,
                "track_opens": null,
                "track_clicks": null,
                "auto_text": null,
                "auto_html": null,
                "inline_css": null,
                "url_strip_qs": null,
                "preserve_recipients": null,
                "view_content_link": null,
                "tracking_domain": null,
                "signing_domain": null,
                "return_path_domain": null
            },
            "async": false,
            "ip_pool": "Main Pool"
        };
        var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";

        $http.post(apiURL, mailJSON).
          success(function (data, status, headers, config) {
              alert('successful email send.');
              $scope.form = {};
              console.log('successful email send.');
              console.log('status: ' + status);
              console.log('data: ' + data);
              console.log('headers: ' + headers);
              console.log('config: ' + config);
          }).error(function (data, status, headers, config) {
              console.log('error sending email.');
              console.log('status: ' + status);
          });
    }
});
