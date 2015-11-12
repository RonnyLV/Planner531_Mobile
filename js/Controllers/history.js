(function () {

    var app = angular.module('fiveThreeOne-history', ['LocalStorageModule', 'ui.bootstrap']);

    app.controller('historyController', [
        '$uibModalInstance',
        'fiveThreeOne-plannerService',
        function ($uibModalInstance, plannerService, historyRecords) {
            var historyController = this;

            historyController.historyRecords = historyRecords;

            historyController.mainLifts = [
                "Military press",
                "Deadlift",
                "Bench press",
                "Back squat"
            ];

            historyController.getMainLiftByName = function (name, mainLifts) {
                var result = -1;
                angular.forEach(mainLifts, function (value, key) {
                    if (value.name == name) {
                        result = key;
                    }
                });
                return mainLifts[result];
            };
        }
    ]);

})();