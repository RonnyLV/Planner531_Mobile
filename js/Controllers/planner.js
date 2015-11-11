(function () {

    var app = angular.module('fiveThreeOne-planner', ['LocalStorageModule']);

    app.controller('plannerController', [
        'localStorageService',
        'plannerService',
        function (localStorageService, plannerService) {
            var FiveThreeOneController = this;
            
            FiveThreeOneController.removeOutdatedDataFromLocalStorage = function () {
                var storedPlates = FiveThreeOneController.storedPlates();
                if (storedPlates != undefined
                    && storedPlates[0].measurementUnit == undefined)
                    localStorageService.remove('availablePlates');
                var storedMainLifts = FiveThreeOneController.storedMainLifts();
                if (storedMainLifts != undefined
                    && FiveThreeOneController.accessoryWorkTemplatesHaveBeenChanged(storedMainLifts))
                    FiveThreeOneController.fixAccessoryExcercisesInTheTemplate(storedMainLifts);
            };

            FiveThreeOneController.measurementUnits = [
                "kg",
                "lbs"
            ];

            FiveThreeOneController.selectedMeasurementUnit = "kg";

            FiveThreeOneController.fixAccessoryExcercisesInTheTemplate = function (storedMainLifts) {
                for (var mainLiftIndex = 0; mainLiftIndex < storedMainLifts.length; mainLiftIndex++) {
                    var mainLift = FiveThreeOneController.mainLifts[mainLiftIndex]
                    var storedMainLift = storedMainLifts[mainLiftIndex];
                    storedMainLift.accessoryWorkPlanTemplates = mainLift.accessoryWorkPlanTemplates;
                }
                FiveThreeOneController.mainLifts = storedMainLifts;
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.accessoryWorkTemplatesHaveBeenChanged = function (storedMainLifts) {
                for (var mainLiftIndex = 0; mainLiftIndex < FiveThreeOneController.mainLifts.length; mainLiftIndex++) {
                    var mainLift = FiveThreeOneController.mainLifts[mainLiftIndex];
                    var storedMainLift = storedMainLifts[mainLiftIndex];
                    if (mainLift.accessoryWorkPlanTemplates.length != storedMainLift.accessoryWorkPlanTemplates.length)
                        return true;
                    else {
                        for (var accessoryWorkTemplateIndex = 0; accessoryWorkTemplateIndex < mainLift.accessoryWorkPlanTemplates.length; accessoryWorkTemplateIndex++) {
                            var accessoryWorkTemplate = mainLift.accessoryWorkPlanTemplates[accessoryWorkTemplateIndex];
                            var storedAccessoryWorkTemplate = storedMainLift.accessoryWorkPlanTemplates[accessoryWorkTemplateIndex];
                            if (JSON.stringify(accessoryWorkTemplate) !== JSON.stringify(storedAccessoryWorkTemplate))
                                return true;
                        }
                    }
                }
                return false;
            };

            FiveThreeOneController.accessoryWorkPlanTemplates = [
                "Boring but big",
                "The Triumvirate",
                "I'm not doing Jack shit",
                "Bodyweight"
            ];

            FiveThreeOneController.storedSelectedMeasurementUnit = function () {
                var selectedMeasurementUnit = null;
                if (localStorageService.isSupported)
                    selectedMeasurementUnit = localStorageService.get('selectedMeasurementUnit');
                return selectedMeasurementUnit;
            };

            FiveThreeOneController.storedMainLifts = function () {
                var mainLifts = null;
                if (localStorageService.isSupported)
                    mainLifts = localStorageService.get('mainLifts');
                return mainLifts;
            };

            FiveThreeOneController.storedPlates = function () {
                var availablePlates = null;
                if (localStorageService.isSupported)
                    availablePlates = localStorageService.get('availablePlates');
                return availablePlates;
            };

            FiveThreeOneController.storedSelectedAccessoryWorkTemplate = function () {
                var selectedAccessoryWorkTemplate = null;
                if (localStorageService.isSupported)
                    selectedAccessoryWorkTemplate = localStorageService.get('selectedAccessoryWorkTemplate');
                return selectedAccessoryWorkTemplate;
            };

            FiveThreeOneController.saveDataToLocalStorage = function () {
                if (localStorageService.isSupported) {
                    localStorageService.add('mainLifts', FiveThreeOneController.mainLifts);
                    localStorageService.add('availablePlates', FiveThreeOneController.availablePlates);
                    localStorageService.add('selectedAccessoryWorkTemplate', FiveThreeOneController.selectedAccessoryWorkTemplate);
                    localStorageService.add('selectedMeasurementUnit', FiveThreeOneController.selectedMeasurementUnit);
                }
            };

            FiveThreeOneController.loadFromStorage = function () {
                FiveThreeOneController.removeOutdatedDataFromLocalStorage();

                var storedMainLifts = FiveThreeOneController.storedMainLifts();
                if (storedMainLifts != undefined)
                    FiveThreeOneController.mainLifts = storedMainLifts;

                var storedPlates = FiveThreeOneController.storedPlates();
                if (storedPlates != undefined)
                    FiveThreeOneController.availablePlates = storedPlates;

                var storedSelectedAccessoryWorkTemplate = FiveThreeOneController.storedSelectedAccessoryWorkTemplate();
                if (storedSelectedAccessoryWorkTemplate != undefined)
                    FiveThreeOneController.selectedAccessoryWorkTemplate = storedSelectedAccessoryWorkTemplate;

                var storedSelectedMeasurementUnit = FiveThreeOneController.storedSelectedMeasurementUnit();
                if (storedSelectedMeasurementUnit != undefined)
                    FiveThreeOneController.selectedMeasurementUnit = storedSelectedMeasurementUnit;
            };

            FiveThreeOneController.mainLifts = [
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
            ];

            FiveThreeOneController.selectedAccessoryWorkTemplate = "I'm not doing Jack shit";

            FiveThreeOneController.loadAccessoryWorkTemplate = function () {
                for (var mainLiftIndex = 0; mainLiftIndex < FiveThreeOneController.mainLifts.length; mainLiftIndex++) {
                    var mainLift = FiveThreeOneController.mainLifts[mainLiftIndex];
                    mainLift.accessoryWorkExcercises = new Array();
                    var template = FiveThreeOneController.getAccessoryWorkTemplate(mainLift, FiveThreeOneController.selectedAccessoryWorkTemplate);
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
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.getAccessoryWorkTemplate = function (mainLift, selectedAccessoryWorkTemplate) {
                var correspondingTemplates = $.grep(mainLift.accessoryWorkPlanTemplates, function (item) {
                    return item.name == selectedAccessoryWorkTemplate;
                });
                return correspondingTemplates[0];
            };

            FiveThreeOneController.addAccessoryWorkExcercise = function (mainLift) {
                mainLift.accessoryWorkExcercises.push({
                    id: identifierGenerator.newIdentifier(),
                    name: null,
                    sets: null,
                    reps: null
                });
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.removeAccessoryWorkExcercise = function (mainLift, accessoryWorkExcercise) {
                var accessoryWorkExcercisesToRemove = $.grep(mainLift.accessoryWorkExcercises, function (item) {
                    return item.id == accessoryWorkExcercise.id;
                });

                mainLift.accessoryWorkExcercises.splice(
                    mainLift.accessoryWorkExcercises.indexOf(accessoryWorkExcercisesToRemove[0]), 1);
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.getAvailablePlates = function () {
                var availablePlates = $.grep(FiveThreeOneController.availablePlates, function (item) {
                    return item.measurementUnit == FiveThreeOneController.selectedMeasurementUnit;
                });
                return availablePlates;
            };

            FiveThreeOneController.availablePlates = [
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
                },
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
            ];

            FiveThreeOneController.atLeastOnePlateCanBeUsedForCalculations = function () {
                var platesUsedForCalculations = $.grep(FiveThreeOneController.getAvailablePlates(), function (item) {
                    return item.usedForCalculations;
                });

                return platesUsedForCalculations != undefined
                    && platesUsedForCalculations.length > 0;
            };

            FiveThreeOneController.addPlateToCalculation = function (availablePlate) {
                availablePlate.usedForCalculations = true;
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.removePlateFromCalculation = function (availablePlate) {
                availablePlate.usedForCalculations = false;
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.barbellWeight = {
                inKg: 20,
                inLbs: 45
            };

            FiveThreeOneController.getBarbellWeight = function () {
                var weight = 0;
                if (FiveThreeOneController.selectedMeasurementUnit == "kg")
                    weight = FiveThreeOneController.barbellWeight.inKg;
                else if (FiveThreeOneController.selectedMeasurementUnit == "lbs")
                    weight = FiveThreeOneController.barbellWeight.inLbs;
                return weight;
            };

            FiveThreeOneController.calculated = false;

            FiveThreeOneController.mainLiftCycles = [
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
            ];

            FiveThreeOneController.calculateEstimatedOneRepMax = function (mainLift) {
                var oneRepMax = 0;
                if (mainLift.maxReps != undefined
                    && mainLift.maxWeight != undefined) {
                    oneRepMax = parseFloat(mainLift.maxReps * mainLift.maxWeight * 0.0333 + mainLift.maxWeight).toFixed(1);
                }
                mainLift.oneRepMax = oneRepMax;
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.calculateNinetyPercentOfOneRepMax = function (mainLift) {
                mainLift.ninetyPercentOfOneRepMax = 0;
                if (mainLift.oneRepMax != undefined)
                    mainLift.ninetyPercentOfOneRepMax = parseFloat(mainLift.oneRepMax * 0.9).toFixed(1);
                return mainLift.ninetyPercentOfOneRepMax;
            };

            FiveThreeOneController.estimateOneRepMax = function (mainLift) {
                mainLift.shouldEstimateOneRepMax = true;
                mainLift.oneRepMax = null;
                mainLift.ninetyPercentOfOneRepMax = null;
                FiveThreeOneController.calculateEstimatedOneRepMax(mainLift);
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.enterOneRepMax = function (mainLift) {
                mainLift.shouldEstimateOneRepMax = false;
                mainLift.oneRepMax = null;
                mainLift.ninetyPercentOfOneRepMax = null;
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.isFormValid = function () { //Conditional validation does not seem to work- all validators are valid but the form itself is not :(. This is a workaround.
                return FiveThreeOneController.areAllMainLiftsValid()
                    && FiveThreeOneController.atLeastOnePlateCanBeUsedForCalculations();
            };

            FiveThreeOneController.areAllMainLiftsValid = function () {
                var invalidLifts = $.grep(FiveThreeOneController.mainLifts, function (item) {
                    return item.ninetyPercentOfOneRepMax == null
                        || (item.ninetyPercentOfOneRepMax != null && item.ninetyPercentOfOneRepMax <= 0);
                });
                return invalidLifts.length == 0;
            };

            FiveThreeOneController.recalculateMesocycle = function () {
                FiveThreeOneController.calculated = false;
                FiveThreeOneController.clearMainLifts();
            };

            FiveThreeOneController.clearMainLifts = function () {
                for (var mainLiftIndex = 0; mainLiftIndex < FiveThreeOneController.mainLifts.length; mainLiftIndex++) {
                    var mainLift = FiveThreeOneController.mainLifts[mainLiftIndex];
                    mainLift.cycleWeights = new Array();
                }
            };

            FiveThreeOneController.calculateMesocycle = function () {
                FiveThreeOneController.clearMainLifts();
                for (var mainLiftIndex = 0; mainLiftIndex < FiveThreeOneController.mainLifts.length; mainLiftIndex++) {
                    for (var mainLiftCycleIndex = 0; mainLiftCycleIndex < FiveThreeOneController.mainLiftCycles.length; mainLiftCycleIndex++) {
                        var mainLiftCycle = FiveThreeOneController.mainLiftCycles[mainLiftCycleIndex];
                        var mainLift = FiveThreeOneController.mainLifts[mainLiftIndex];
                        var cycle = mainLiftCycleIndex + 1;
                        var cycleWeights = {
                            cycle: cycle,
                            isDeload: cycle == 4,
                            setWeights: new Array()
                        };
                        for (var setIndex = 0; setIndex < mainLiftCycle.length; setIndex++) {
                            var set = mainLiftCycle[setIndex];
                            var setWeight = {
                                set: setIndex + 1,
                                reps: set.reps,
                                percentages: set.percentages,
                                canDoMoreReps: set.canDoMoreReps,
                                weight: FiveThreeOneController.calculateWeight(mainLift, set)
                            };
                            cycleWeights.setWeights.push(setWeight);
                        }
                        mainLift.cycleWeights.push(cycleWeights);
                    }
                }
                FiveThreeOneController.calculated = true;
                FiveThreeOneController.saveDataToLocalStorage();
            };

            FiveThreeOneController.calculateWeight = function (mainLift, set) {
                var weight = {
                    rawWeight: Number((mainLift.ninetyPercentOfOneRepMax / 100 * set.percentages).toFixed(1)),
                    weightToUse: 0,
                    platesVisible: false,
                    platesToUse: new Array()
                };

                var barbellWeight = FiveThreeOneController.getBarbellWeight();
                if (weight.rawWeight > barbellWeight)
                    weight.weightToUse = barbellWeight;

                var rawWeightWithoutBarbell = weight.rawWeight - barbellWeight;

                var availablePlates = FiveThreeOneController.getAvailablePlates();
                for (var availablePlateIndex = 0; availablePlateIndex < availablePlates.length; availablePlateIndex++) {
                    var availablePlate = availablePlates[availablePlateIndex];
                    if (availablePlate.usedForCalculations) {
                        var weightOnBothSides = 2 * availablePlate.weight;
                        do {
                            if (rawWeightWithoutBarbell - weightOnBothSides >= 0) {
                                var alreadyAddedPlate = FiveThreeOneController.getAlreadyAddedPlate(weight, availablePlate);

                                if (alreadyAddedPlate != undefined) {
                                    alreadyAddedPlate.plateCount += 2;
                                }
                                else {
                                    weight.platesToUse.push({plateWeight: availablePlate.weight, plateCount: 2});
                                    weight.platesVisible = true;
                                }

                                weight.weightToUse += weightOnBothSides;
                                rawWeightWithoutBarbell -= weightOnBothSides;
                            }
                        } while (rawWeightWithoutBarbell - weightOnBothSides > 0)
                    }
                }

                return weight;
            };

            FiveThreeOneController.getAlreadyAddedPlate = function (weight, availablePlate) {
                var alreadyAddedPlate = null;
                var alreadyAddedPlates = $.grep(weight.platesToUse, function (item) {
                    return item.plateWeight == availablePlate.weight;
                });
                if (alreadyAddedPlates.length > 0)
                    alreadyAddedPlate = alreadyAddedPlates[0];
                return alreadyAddedPlate;
            };

            FiveThreeOneController.printableVersion = false;
            FiveThreeOneController.mesocycleName = '';

            FiveThreeOneController.enablePrintableVersion = function () {
                FiveThreeOneController.printableVersion = true;
            };

            FiveThreeOneController.disablePrintableVersion = function () {
                FiveThreeOneController.printableVersion = false;
            };

            FiveThreeOneController.printPage = function () {
                window.print();
                //window.location.href = window.location.href; //workaround to call print dialog
            };

            FiveThreeOneController.historyRecords = {};

            FiveThreeOneController.showHistory = function () {
                if (angular.equals({}, FiveThreeOneController.historyRecords)) {
                    AWS.config.credentials.get(function (err) {
                        if (err) {
                            alert("Error: " + err);
                            return;
                        }

                        var syncClient = new AWS.CognitoSyncManager();

                        syncClient.openOrCreateDataset('Mesocycles', function (err, dataset) {
                            dataset.getAll(function (err, records) {
                                angular.forEach(records, function (value, key) {
                                    records[key] = angular.fromJson(records[key]);
                                });
                                //FiveThreeOneController.historyRecords = records;
                                window.foo = records;
                            })
                        });
                    });
                }
            };


            FiveThreeOneController.sync = function () {
                if (FiveThreeOneController.mesocycleName == '') {
                    FiveThreeOneController.mesocycleName = new Date().yyyymmdd();
                }
                AWS.config.credentials.get(function (err) {
                    if (err) {
                        alert("Error: " + err);
                        return;
                    }

                    console.log("Cognito Identity Id: " + AWS.config.credentials.identityId);

                    var syncClient = new AWS.CognitoSyncManager();

                    syncClient.openOrCreateDataset('Mesocycles', function (err, dataset) {
                        var syncData = angular.toJson({
                            mainLifts: FiveThreeOneController.mainLifts,
                            availablePlates: FiveThreeOneController.availablePlates,
                            selectedAccessoryWorkTemplate: FiveThreeOneController.selectedAccessoryWorkTemplate,
                            selectedMeasurementUnit: FiveThreeOneController.selectedMeasurementUnit
                        });

                        dataset.put(FiveThreeOneController.mesocycleName, syncData, function (err, record) {

                        });

                        dataset.synchronize({

                            onSuccess: function (data, newRecords) {
                                console.log('is success');
                            }

                        });

                    });

                });
            }
        }
    ]);

})();