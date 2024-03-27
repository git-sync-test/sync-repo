"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@useparagon/core");
const googleCalendar_1 = require("@useparagon/integrations/googleCalendar");
class default_1 extends core_1.Workflow {
    constructor() {
        super(...arguments);
        this.name = 'New Workflow';
        this.description = 'Add a user-facing description of this workflow';
        this.inputs = (0, googleCalendar_1.createInputs)({});
        this.defaultEnabled = false;
        this.hidden = false;
        this.id = '4ee4af41-246d-443f-8a45-dc4c598a44d1';
    }
    define(integration, context, connectUser) {
        const triggerStep = integration.triggers.googleCalendarTriggerEventCreated({
            collapseRecurringEventUpdates: 'false',
        });
        const functionStep = new core_1.FunctionStep({
            autoRetry: false,
            description: 'description',
            code: function yourFunction(parameters, libraries) {
                return 1;
            },
            parameters: {},
        });
        triggerStep.nextStep(functionStep);
        return this.register({ triggerStep, functionStep });
    }
    definePermissions(connectUser) {
        return undefined;
    }
}
exports.default = default_1;
//# sourceMappingURL=newWorkflow.js.map