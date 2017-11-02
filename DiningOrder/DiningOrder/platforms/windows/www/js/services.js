angular.module('diningorder.services', [])

.factory('EverythingBillService', function () {

    var costArray = [];
    var buyerArray = [];

 //   var costArray = [{ id: 2, name: 'gas', amount: 90, picture: 's', tipTax: 5, buyerIds: [1, 2, 3] }];
//    var buyerArray = [{ id: 1, name: 'mark', amount: 333, buyerHasThisCost: true, costIds:[] },
 //    { id: 2, name: 'hellen', amount: 333, buyerHasThisCost: false, costIds:[] }];

    var currentCost = new Object();
    var currentBuyer = new Object();

    var createNewCost = function () {
        currentCost.id = getGuidId();
        currentCost.name = 'Cost Name';
        currentCost.amount = 0;
        currentCost.tipTax = 0;
        currentCost.buyerIds = [];
        console.log("buyerIds = = => " + currentCost.buyerIds.length);
        return currentCost;
    };

    var getCost = function (costId) {
        for (var i = 0; i < costArray.length; i++) {
            if (costArray[i].id === parseInt(costId)) {
                console.log(costId + "buyerIds = = => " + costArray[i].buyerIds);
                return costArray[i];
            }
        }
        return null;
    };

    var saveCost = function (cost) {
        for (var i; i < costArray.length; i++) {
            if (cost.id == costArray[i].id) {
                removeCost(cost.id);//remove all the duplicate ids
            }
        }
        costArray.push(cost);
    };

    var removeCost = function (costId) {
        for (var i = 0; i < costArray.length; i++) {
            if (costArray[i].id === parseInt(costId)) {
                costArray.splice(i, 1);
            }
        }
    }
    var getAllCosts = function () {
        return costArray;
    };


    var createNewBuyer = function () {
        currentBuyer.id = getGuidId();
        currentBuyer.name = 'Buyer Name';
        currentBuyer.amount = 0;
        currentBuyer.email = '';
        currentBuyer.costIds = [];

        return currentBuyer;
    };


    var getBuyer = function (buyerId) {
        for (var i = 0; i < buyerArray.length; i++) {
            if (buyerArray[i].id === parseInt(buyerId)) {
                return buyerArray[i];
            }
        }
    };

    var saveBuyer = function (buyer) {
        for (var i; i < buyerArray.length; i++) {
            if (buyer.id == buyerArray[i].id) {
                removeBuyer(buyer.id);//remove all the duplicate ids
            }
        }
        buyerArray.push(buyer);
    };

    var removeBuyer = function (buyerId) {
        for (var i = 0; i < buyerArray.length; i++) {
            if (buyerArray[i].id === parseInt(buyerId)) {
                buyerArray.splice(i, 1);
            }
        }
    }

    var getAllBuyers = function () {
        return buyerArray;
    };

    var getGuidId = function () {
        //function s4() {
        //    return Math.floor((1 + Math.random()) * 0x10000)
        //      .toString(16)
        //      .substring(1);
        //}
        //return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        //  s4() + '-' + s4() + s4() + s4();
        return new Date().getUTCMilliseconds();
    };

    return {
        createNewCost: createNewCost,
        getCost: getCost,
        saveCost: saveCost,
        getAllCosts: getAllCosts,
        createNewBuyer: createNewBuyer,
        getBuyer: getBuyer,
        saveBuyer: saveBuyer,
        getAllBuyers: getAllBuyers,
        getGuidId: getGuidId
    }
})

.factory('OrderService', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var orders = [{
        id: 0,
        name: 'Soup',
        category: 'food',
        price: 12.23,
        option: 'Spicy',
        description: 'Bread with Sausage',
        picture: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Hot Dog',
        category: 'food',
        price: 6.23,
        option: 'Regular Size',
        description: 'Bread with Sausage',
        picture: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'POP',
        category: 'drink',
        price: 2.23,
        option: 'Coca',
        description: 'Ice Drink',
        picture: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }];


    return {
        all: function () {
            console.log("" + orders.length);
            return orders;
        },
        remove: function (order) {
            orders.splice(orders.indexOf(order), 1);
        },
        get: function (orderId) {
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].id === parseInt(orderId)) {
                    return orders[i];
                }
            }
            return null;
        }
    };
});
