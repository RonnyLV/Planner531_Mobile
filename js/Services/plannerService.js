(function () {

    angular.module("fiveThreeOne")
        .factory("fiveThreeOne-plannerService", [
            'localStorageService',
            function (localStorageService) {
                var plannerService = this;

                angular.extend(plannerService,
                    {
                        calculateMesocycle: function (mainLifts, mainLiftCycles, availablePlates, barbellWeight) {
                            for (var mainLiftIndex = 0; mainLiftIndex < mainLifts.length; mainLiftIndex++) {
                                for (var mainLiftCycleIndex = 0; mainLiftCycleIndex < mainLiftCycles.length; mainLiftCycleIndex++) {
                                    var mainLiftCycle = mainLiftCycles[mainLiftCycleIndex];
                                    var mainLift = mainLifts[mainLiftIndex];
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
                                            weight: plannerService.calculateWeight(mainLift, set, availablePlates, barbellWeight)
                                        };
                                        cycleWeights.setWeights.push(setWeight);
                                    }
                                    mainLift.cycleWeights.push(cycleWeights);
                                }
                            }
                        },

                        removeOutdatedDataFromLocalStorage: function (mainLifts) {
                            var storedPlates = plannerService.storedPlates();
                            if (storedPlates != undefined
                                && storedPlates.inKg == undefined)
                                localStorageService.remove('availablePlates');
                            var storedMainLifts = plannerService.storedMainLifts();
                            if (storedMainLifts != undefined
                                && plannerService.accessoryWorkTemplatesHaveBeenChanged(mainLifts, storedMainLifts))
                                plannerService.fixAccessoryExcercisesInTheTemplate(mainLifts, storedMainLifts);
                        },

                        storedSelectedMeasurementUnit: function () {
                            var selectedMeasurementUnit = null;
                            if (localStorageService.isSupported)
                                selectedMeasurementUnit = localStorageService.get('selectedMeasurementUnit');
                            return selectedMeasurementUnit;
                        },

                        storedMainLifts: function () {
                            var mainLifts = null;
                            if (localStorageService.isSupported)
                                mainLifts = localStorageService.get('mainLifts');
                            return mainLifts;
                        },

                        storedPlates: function () {
                            var availablePlates = null;
                            if (localStorageService.isSupported)
                                availablePlates = localStorageService.get('availablePlates');
                            return availablePlates;
                        },

                        storedSelectedAccessoryWorkTemplate: function () {
                            var selectedAccessoryWorkTemplate = null;
                            if (localStorageService.isSupported)
                                selectedAccessoryWorkTemplate = localStorageService.get('selectedAccessoryWorkTemplate');
                            return selectedAccessoryWorkTemplate;
                        },

                        saveDataToLocalStorage: function (mainLifts, availablePlates, selectedAccessoryWorkTemplate, selectedMeasurementUnit) {
                            if (localStorageService.isSupported) {
                                localStorageService.add('mainLifts', mainLifts);
                                localStorageService.add('availablePlates', availablePlates);
                                localStorageService.add('selectedAccessoryWorkTemplate', selectedAccessoryWorkTemplate);
                                localStorageService.add('selectedMeasurementUnit', selectedMeasurementUnit);
                            }
                        },

                        loadFromStorage: function (mainLifts, availablePlates, selectedAccessoryWorkTemplate, selectedMeasurementUnit) {
                            plannerService.removeOutdatedDataFromLocalStorage(mainLifts);

                            var storedMainLifts = plannerService.storedMainLifts();
                            if (storedMainLifts != undefined && storedMainLifts != mainLifts)
                                angular.copy(storedMainLifts, mainLifts);

                            var storedPlates = plannerService.storedPlates();
                            if (storedPlates != undefined && storedPlates !== availablePlates)
                                angular.copy(storedPlates, availablePlates);

                            var storedSelectedAccessoryWorkTemplate = plannerService.storedSelectedAccessoryWorkTemplate();
                            if (storedSelectedAccessoryWorkTemplate != undefined && storedSelectedAccessoryWorkTemplate !== selectedAccessoryWorkTemplate)
                                selectedAccessoryWorkTemplate = storedSelectedAccessoryWorkTemplate;

                            var storedSelectedMeasurementUnit = plannerService.storedSelectedMeasurementUnit();
                            if (storedSelectedMeasurementUnit != undefined && storedSelectedMeasurementUnit !== selectedMeasurementUnit)
                                selectedMeasurementUnit = storedSelectedMeasurementUnit;
                        },

                        calculateWeight: function (mainLift, set, availablePlates, barbellWeight) {
                            var weight = {
                                rawWeight: Number((mainLift.ninetyPercentOfOneRepMax / 100 * set.percentages).toFixed(1)),
                                weightToUse: 0,
                                platesVisible: false,
                                platesToUse: new Array()
                            };

                            if (weight.rawWeight > barbellWeight)
                                weight.weightToUse = barbellWeight;

                            var rawWeightWithoutBarbell = weight.rawWeight - barbellWeight;

                            for (var availablePlateIndex = 0; availablePlateIndex < availablePlates.length; availablePlateIndex++) {
                                var availablePlate = availablePlates[availablePlateIndex];
                                if (availablePlate.usedForCalculations) {
                                    var weightOnBothSides = 2 * availablePlate.weight;
                                    do {
                                        if (rawWeightWithoutBarbell - weightOnBothSides >= 0) {
                                            var alreadyAddedPlate = plannerService.getAlreadyAddedPlate(weight, availablePlate);

                                            if (alreadyAddedPlate != undefined) {
                                                alreadyAddedPlate.plateCount += 2;
                                            }
                                            else {
                                                weight.platesToUse.push({
                                                    plateWeight: availablePlate.weight,
                                                    plateCount: 2
                                                });
                                                weight.platesVisible = true;
                                            }

                                            weight.weightToUse += weightOnBothSides;
                                            rawWeightWithoutBarbell -= weightOnBothSides;
                                        }
                                    } while (rawWeightWithoutBarbell - weightOnBothSides > 0)
                                }
                            }

                            return weight;
                        },

                        getAccessoryWorkTemplate: function (mainLift, selectedAccessoryWorkTemplate) {
                            var correspondingTemplates = $.grep(mainLift.accessoryWorkPlanTemplates, function (item) {
                                return item.name == selectedAccessoryWorkTemplate;
                            });
                            return correspondingTemplates[0];
                        },

                        calculateEstimatedOneRepMax: function (mainLift) {
                            var oneRepMax = 0;
                            if (mainLift.maxReps != undefined
                                && mainLift.maxWeight != undefined) {
                                oneRepMax = parseFloat(mainLift.maxReps * mainLift.maxWeight * 0.0333 + mainLift.maxWeight).toFixed(1);
                            }
                            mainLift.oneRepMax = oneRepMax;
                        },

                        calculateNinetyPercentOfOneRepMax: function (mainLift) {
                            mainLift.ninetyPercentOfOneRepMax = 0;
                            if (mainLift.oneRepMax != undefined)
                                mainLift.ninetyPercentOfOneRepMax = parseFloat(mainLift.oneRepMax * 0.9).toFixed(1);
                            return mainLift.ninetyPercentOfOneRepMax;
                        },

                        getAlreadyAddedPlate: function (weight, availablePlate) {
                            var alreadyAddedPlate = null;
                            var alreadyAddedPlates = $.grep(weight.platesToUse, function (item) {
                                return item.plateWeight == availablePlate.weight;
                            });
                            if (alreadyAddedPlates.length > 0)
                                alreadyAddedPlate = alreadyAddedPlates[0];
                            return alreadyAddedPlate;
                        },

                        clearMainLifts: function (mainLifts) {
                            for (var mainLiftIndex = 0; mainLiftIndex < mainLifts.length; mainLiftIndex++) {
                                var mainLift = mainLifts[mainLiftIndex];
                                mainLift.cycleWeights = new Array();
                            }
                        },

                        areAllMainLiftsValid: function (mainLifts) {
                            var invalidLifts = $.grep(mainLifts, function (item) {
                                return item.ninetyPercentOfOneRepMax == null
                                    || (item.ninetyPercentOfOneRepMax != null && item.ninetyPercentOfOneRepMax <= 0);
                            });
                            return invalidLifts.length == 0;
                        },
                        atLeastOnePlateCanBeUsedForCalculations: function (availablePlates) {
                            var platesUsedForCalculations = $.grep(availablePlates, function (item) {
                                return item.usedForCalculations;
                            });

                            return platesUsedForCalculations != undefined
                                && platesUsedForCalculations.length > 0;
                        },
                        accessoryWorkTemplatesHaveBeenChanged: function (mainLifts, storedMainLifts) {
                            for (var mainLiftIndex = 0; mainLiftIndex < mainLifts.length; mainLiftIndex++) {
                                var mainLift = mainLifts[mainLiftIndex];
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
                        }
                    }
                );
                return plannerService;
            }
        ]
    );

})
();