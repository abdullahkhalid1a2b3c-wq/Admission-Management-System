const { createMachine, assign, fromPromise } = require("xstate");
const { updateAdmissionStatus } = require("../services/admissionService");

const admissionMachine = createMachine({
    id: "admission",
    initial: "Pending",
    context: {
        admissionId: null,
        action: null,
        user: null,
        result: null,
        error: null
    },
    states: {
        Pending: {
            on: {
                APPROVE: {
                    target: "Updating",
                    actions: assign({
                        admissionId: ({ event }) => event.id,
                        action: () => "APPROVE",
                        user: ({ event }) => event.user || null
                    })
                },
                REJECT: {
                    target: "Updating",
                    actions: assign({
                        admissionId: ({ event }) => event.id,
                        action: () => "REJECT",
                        user: ({ event }) => event.user || null
                    })
                }
            }
        },
        Updating: {
            invoke: {
                src: fromPromise(async ({ input }) => {
                    return await updateAdmissionStatus(
                        input.id,
                        input.action,
                        input.user
                    );
                }),
                input: ({ context }) => ({
                    id: context.admissionId,
                    action: context.action,
                    user: context.user
                }),
                onDone: [
                    {
                        target: "Approved",
                        guard: ({ event }) =>
                            event.output && (event.output.status === "Approved" || event.output.status === "Approved Successfully"),
                        actions: assign({
                            result: ({ event }) => event.output,
                            error: () => null
                        })
                    },
                    {
                        target: "Rejected",
                        actions: assign({
                            result: ({ event }) => event.output,
                            error: () => null
                        })
                    }
                ],
                onError: {
                    target: "Pending",
                    actions: assign({
                        error: ({ event }) => event.error?.response?.data || event.error?.message || "Status update failed",
                        result: ({ event }) => event.error?.response?.data || { message: "Status update failed" }
                    })
                }
            }
        },
        Approved: {},
        Rejected: {}
    }
});

module.exports = { admissionMachine };