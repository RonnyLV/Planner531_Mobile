(function () {

    var app = angular.module('fiveThreeOne-planner', ['LocalStorageModule', 'uuid4']);

    app.controller('plannerController', [
        'localStorageService',
        'uuid4',
        'fiveThreeOne-plannerService',
        function (localStorageService, uuid4, plannerService) {
            var plannerController = this;

            angular.extend(plannerController, {
                measurementUnits: [
                    "kg",
                    "lbs"
                ],

                barbellWeight: {
                    inKg: 20,
                    inLbs: 45
                },

                printableVersion: false,

                calculated: false,

                mesocycleName: '',

                selectedMeasurementUnit: "kg",

                selectedAccessoryWorkTemplate: "I'm not doing Jack shit",

                historyRecords: {},

                accessoryWorkPlanTemplates: [
                    "Boring but big",
                    "The Triumvirate",
                    "I'm not doing Jack shit",
                    "Bodyweight"
                ],

                mainLifts: [
                    {
                        name: 'Military press',
                        shouldEstimateOneRepMax: false,
                        maxReps: null,
                        maxWeight: null,
                        oneRepMax: null,
                        ninetyPercentOfOneRepMax: 0,
                        cycleWeights: new Array(),
                        accessoryWorkExcercises: new Array(),
                        accessoryWorkPlanTemplates: [
                            {
                                name: "Boring but big",
                                excercises: [
                                    {
                                        name: "Military press",
                                        sets: 5,
                                        reps: 10
                                    },
                                    {
                                        name: "Chin ups",
                                        sets: 5,
                                        reps: 10
                                    }
                                ]
                            },
                            {
                                name: "The Triumvirate",
                                excercises: [
                                    {
                                        name: "Chest dips",
                                        sets: 5,
                                        reps: 15
                                    },
                                    {
                                        name: "Chin ups",
                                        sets: 5,
                                        reps: 10
                                    }
                                ]
                            },
                            {
                                name: "I'm not doing Jack shit",
                                excercises: null
                            },
                            {
                                name: "Bodyweight",
                                excercises: [
                                    {
                                        name: "Chin ups",
                                        sets: 5,
                                        reps: 15
                                    },
                                    {
                                        name: "Chest dips",
                                        sets: 5,
                                        reps: 15
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Deadlift',
                        shouldEstimateOneRepMax: false,
                        maxReps: null,
                        maxWeight: null,
                        oneRepMax: null,
                        ninetyPercentOfOneRepMax: 0,
                        cycleWeights: new Array(),
                        accessoryWorkExcercises: new Array(),
                        accessoryWorkPlanTemplates: [
                            {
                                name: "Boring but big",
                                excercises: [
                                    {
                                        name: "Deadlift",
                                        sets: 5,
                                        reps: 10
                                    },
                                    {
                                        name: "Hanging leg raises",
                                        sets: 5,
                                        reps: 15
                                    }
                                ]
                            },
                            {
                                name: "The Triumvirate",
                                excercises: [
                                    {
                                        name: "Goodmornings",
                                        sets: 5,
                                        reps: 12
                                    },
                                    {
                                        name: "Hanging leg raises",
                                        sets: 5,
                                        reps: 15
                                    }
                                ]
                            },
                            {
                                name: "I'm not doing Jack shit",
                                excercises: null
                            },
                            {
                                name: "Bodyweight",
                                excercises: [
                                    {
                                        name: "Glute ham raises",
                                        sets: 5,
                                        reps: 15
                                    },
                                    {
                                        name: "Hanging leg raises",
                                        sets: 5,
                                        reps: 15
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Bench press',
                        shouldEstimateOneRepMax: false,
                        maxReps: null,
                        maxWeight: null,
                        oneRepMax: null,
                        ninetyPercentOfOneRepMax: 0,
                        cycleWeights: new Array,
                        accessoryWorkExcercises: new Array(),
                        accessoryWorkPlanTemplates: [
                            {
                                name: "Boring but big",
                                excercises: [
                                    {
                                        name: "Bench press",
                                        sets: 5,
                                        reps: 10
                                    },
                                    {
                                        name: "One arm dumbbell row",
                                        sets: 5,
                                        reps: 10
                                    }
                                ]
                            },
                            {
                                name: "The Triumvirate",
                                excercises: [
                                    {
                                        name: "Dumbbell bench press",
                                        sets: 5,
                                        reps: 15
                                    },
                                    {
                                        name: "One arm dumbbell row",
                                        sets: 5,
                                        reps: 10
                                    }
                                ]
                            },
                            {
                                name: "I'm not doing Jack shit",
                                excercises: null
                            },
                            {
                                name: "Bodyweight",
                                excercises: [
                                    {
                                        name: "Chin ups",
                                        sets: 5,
                                        reps: 15
                                    },
                                    {
                                        name: "Pushups",
                                        sets: 5,
                                        reps: 15
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Back squat',
                        shouldEstimateOneRepMax: false,
                        maxReps: null,
                        maxWeight: null,
                        oneRepMax: null,
                        ninetyPercentOfOneRepMax: 0,
                        cycleWeights: new Array(),
                        accessoryWorkExcercises: new Array(),
                        accessoryWorkPlanTemplates: [
                            {
                                name: "Boring but big",
                                excercises: [
                                    {
                                        name: "Back squat",
                                        sets: 5,
                                        reps: 10
                                    },
                                    {
                                        name: "Leg curls",
                                        sets: 5,
                                        reps: 10
                                    }
                                ]
                            },
                            {
                                name: "The Triumvirate",
                                excercises: [
                                    {
                                        name: "Leg press",
                                        sets: 5,
                                        reps: 15
                                    },
                                    {
                                        name: "Leg curls",
                                        sets: 5,
                                        reps: 10
                                    }
                                ]
                            },
                            {
                                name: "I'm not doing Jack shit",
                                excercises: null
                            },
                            {
                                name: "Bodyweight",
                                excercises: [
                                    {
                                        name: "One leg squats",
                                        sets: 5,
                                        reps: 15
                                    },
                                    {
                                        name: "Sit ups",
                                        sets: 5,
                                        reps: 15
                                    }
                                ]
                            }
                        ]
                    }
                ],

                availablePlates: {
                    inKg: [
                        {
                            weight: 50,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        },
                        {
                            weight: 25,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        },
                        {
                            weight: 20,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        },
                        {
                            weight: 15,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        },
                        {
                            weight: 10,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        },
                        {
                            weight: 5,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        },
                        {
                            weight: 2.5,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        },
                        {
                            weight: 1.25,
                            measurementUnit: "kg",
                            usedForCalculations: true
                        }
                    ],
                    inLbs: [
                        {
                            weight: 110,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 100,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 55,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 45,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 35,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 25,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 10,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 5,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        },
                        {
                            weight: 2.5,
                            measurementUnit: "lbs",
                            usedForCalculations: true
                        }
                    ]
                },

                mainLiftCycles: [
                    [
                        {
                            reps: 5,
                            canDoMoreReps: false,
                            percentages: 65
                        },
                        {
                            reps: 5,
                            canDoMoreReps: false,
                            percentages: 75
                        },
                        {
                            reps: 5,
                            canDoMoreReps: true,
                            percentages: 85
                        }
                    ],
                    [
                        {
                            reps: 3,
                            canDoMoreReps: false,
                            percentages: 70
                        },
                        {
                            reps: 3,
                            canDoMoreReps: false,
                            percentages: 80
                        },
                        {
                            reps: 3,
                            canDoMoreReps: true,
                            percentages: 90
                        }
                    ],
                    [
                        {
                            reps: 5,
                            canDoMoreReps: false,
                            percentages: 75
                        },
                        {
                            reps: 3,
                            canDoMoreReps: false,
                            percentages: 85
                        },
                        {
                            reps: 1,
                            canDoMoreReps: true,
                            percentages: 95
                        }
                    ],
                    [
                        {
                            reps: 5,
                            canDoMoreReps: false,
                            percentages: 40
                        },
                        {
                            reps: 5,
                            canDoMoreReps: false,
                            percentages: 50
                        },
                        {
                            reps: 5,
                            canDoMoreReps: false,
                            percentages: 60
                        }
                    ]
                ]
            });

            var saveData = function () {
                plannerService.saveDataToLocalStorage(
                    plannerController.mainLifts
                    , plannerController.availablePlates
                    , plannerController.selectedAccessoryWorkTemplate
                    , plannerController.selectedMeasurementUnit
                );
            };

            plannerController.fixAccessoryExcercisesInTheTemplate = function (mainLifts, storedMainLifts) {
                for (var mainLiftIndex = 0; mainLiftIndex < storedMainLifts.length; mainLiftIndex++) {
                    var mainLift = mainLifts[mainLiftIndex]
                    var storedMainLift = storedMainLifts[mainLiftIndex];
                    storedMainLift.accessoryWorkPlanTemplates = mainLift.accessoryWorkPlanTemplates;
                }
                angular.copy(storedMainLifts, mainLifts);
                saveData();
            };

            plannerController.addAccessoryWorkExcercise = function (mainLift) {
                mainLift.accessoryWorkExcercises.push({
                    id: identifierGenerator.newIdentifier(),
                    name: null,
                    sets: null,
                    reps: null
                });
                saveData();
            };

            plannerController.removeAccessoryWorkExcercise = function (mainLift, accessoryWorkExcercise) {
                var accessoryWorkExcercisesToRemove = $.grep(mainLift.accessoryWorkExcercises, function (item) {
                    return item.id == accessoryWorkExcercise.id;
                });

                mainLift.accessoryWorkExcercises.splice(
                    mainLift.accessoryWorkExcercises.indexOf(accessoryWorkExcercisesToRemove[0]), 1);
                saveData();
            };

            plannerController.loadAccessoryWorkTemplate = function () {
                for (var mainLiftIndex = 0; mainLiftIndex < plannerController.mainLifts.length; mainLiftIndex++) {
                    var mainLift = plannerController.mainLifts[mainLiftIndex];
                    mainLift.accessoryWorkExcercises = new Array();
                    var template = plannerService.getAccessoryWorkTemplate(mainLift, plannerController.selectedAccessoryWorkTemplate);
                    if (template.excercises != undefined)
                        for (var accessoryExcerciseIndex = 0; accessoryExcerciseIndex < template.excercises.length; accessoryExcerciseIndex++) {
                            var excercise = template.excercises[accessoryExcerciseIndex];
                            var excerciseCopy = {
                                name: excercise.name,
                                sets: excercise.sets,
                                reps: excercise.reps
                            };
                            mainLift.accessoryWorkExcercises.push(excerciseCopy);
                        }
                }
                saveData();
            };

            plannerController.addPlateToCalculation = function (availablePlate) {
                availablePlate.usedForCalculations = true;
                saveData();
            };

            plannerController.removePlateFromCalculation = function (availablePlate) {
                availablePlate.usedForCalculations = false;
                saveData();
            };

            plannerController.isFormValid = function () { //Conditional validation does not seem to work- all validators are valid but the form itself is not :(. This is a workaround.
                return plannerService.areAllMainLiftsValid(plannerController.mainLifts)
                    && plannerService.atLeastOnePlateCanBeUsedForCalculations(plannerController.getAvailablePlates(plannerController.availablePlates, plannerController.selectedMeasurementUnit));
            };

            plannerController.recalculateMesocycle = function () {
                plannerController.calculated = false;
                plannerService.clearMainLifts(plannerController.mainLifts);
            };

            plannerController.calculateMesocycle = function () {
                plannerService.clearMainLifts(plannerController.mainLifts);
                plannerService.calculateMesocycle(
                    plannerController.mainLifts
                    , plannerController.mainLiftCycles
                    , plannerController.getAvailablePlates()
                    , plannerController.getBarbellWeight()
                );
                plannerController.calculated = true;
                saveData();
            };

            plannerController.enablePrintableVersion = function () {
                plannerController.printableVersion = true;
            };

            plannerController.disablePrintableVersion = function () {
                plannerController.printableVersion = false;
            };

            plannerController.printPage = function () {
                window.print();
                //window.location.href = window.location.href; //workaround to call print dialog
            };

            plannerController.getAvailablePlates = function () {
                if (plannerController.measurementUnits == 'lbs') {
                    return plannerController.availablePlates.inLbs;
                } else {
                    return plannerController.availablePlates.inKg;
                }
            };

            plannerController.getBarbellWeight = function () {
                if (this.selectedMeasurementUnit == "lbs") {
                    return plannerController.barbellWeight.inLbs;
                } else {
                    return plannerController.barbellWeight.inKg;
                }
            };

            plannerController.calculateEstimatedOneRepMax = function (mainLift) {
                var result = plannerService.calculateEstimatedOneRepMax(mainLift);
                saveData();
                return result;
            };

            plannerController.calculateNinetyPercentOfOneRepMax = function (mainLift) {
                var result = plannerService.calculateNinetyPercentOfOneRepMax(mainLift);
                saveData();
                return result;
            };

            plannerController.estimateOneRepMax = function (mainLift) {
                mainLift.shouldEstimateOneRepMax = true;
                mainLift.oneRepMax = null;
                mainLift.ninetyPercentOfOneRepMax = null;
                plannerController.calculateEstimatedOneRepMax(mainLift);
                saveData();
            };

            plannerController.enterOneRepMax = function (mainLift) {
                mainLift.shouldEstimateOneRepMax = false;
                mainLift.oneRepMax = null;
                mainLift.ninetyPercentOfOneRepMax = null;
                saveData();
            };

            plannerController.loadHistory = function () {
                AWS.config.credentials.get(function (err) {
                    if (err) {
                        alert("Error: " + err);
                        return;
                    }

                    var syncClient = new AWS.CognitoSyncManager();
                    var result = {};

                    syncClient.openOrCreateDataset('Mesocycles', function (err, dataset) {
                        dataset.getAll(function (err, records) {
                            angular.forEach(records, function (value, key) {
                                result[key] = angular.fromJson(records[key]);
                                result[key].creationDate = new Date(records[key].creationDate);
                                result[key].lastUpdateDate = new Date(records[key].lastUpdateDate);
                            });

                            angular.copy(result, plannerController.historyRecords);
                            $('#myModal').modal('show');
                        })
                    });
                });
            };


            plannerController.sync = function () {
                if (plannerController.mesocycleName == '') {
                    plannerController.mesocycleName = new Date().yyyymmdd();
                }
                AWS.config.credentials.get(function (err) {
                    if (err) {
                        alert("Error: " + err);
                        return;
                    }

                    console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);

                    var syncClient = new AWS.CognitoSyncManager();

                    syncClient.openOrCreateDataset('Mesocycles', function (err, dataset) {
                        var currentTime = new Date().getTime();
                        var syncData = angular.toJson({
                            mesocycleName: plannerController.mesocycleName,
                            mainLifts: plannerController.mainLifts,
                            availablePlates: plannerController.availablePlates,
                            selectedAccessoryWorkTemplate: plannerController.selectedAccessoryWorkTemplate,
                            selectedMeasurementUnit: plannerController.selectedMeasurementUnit,
                            creationDate: currentTime,
                            lastUpdateDate: currentTime
                        });

                        var mesocycleId = uuid4.generate();

                        dataset.getAll(function (err, records) {
                            angular.forEach(records, function (value, key) {
                                records[key] = angular.fromJson(records[key]);
                                if (records.mesocycleName == plannerController.mesocycleName) {
                                    mesocycleId = key;
                                    syncData.creationDate = records[key].creationDate;
                                }
                            });
                        });

                        dataset.put(mesocycleId, syncData, function (err, record) {

                        });

                        dataset.synchronize({

                            onSuccess: function (data, newRecords) {
                                console.log('is success');
                            }

                        });

                    });

                });
            };

            plannerController.getMainLiftByName = function (name, mainLifts) {
                var result = -1;
                angular.forEach(mainLifts, function (value, key) {
                    if (value.name == name) {
                        result = key;
                    }
                });
                return plannerController.mainLifts[result];
            };

            plannerService.loadFromStorage(
                plannerController.mainLifts
                , plannerController.availablePlates
                , plannerController.selectedAccessoryWorkTemplate
                , plannerController.selectedMeasurementUnit
            );
        }
    ]);

})();