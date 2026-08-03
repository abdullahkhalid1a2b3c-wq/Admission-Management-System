import { createMachine, assign, fromPromise } from "xstate";
import { updateAdmissionStatus } from "../services/admissionService.js";

export const admissionMachine = createMachine({

    id: "admission",

    initial: "Pending",

    context: {

        admissionId: null,

        action: null,

        result: null

    },

    states: {

        Pending: {

            on: {

                APPROVE: {

                    target: "Updating",

                    actions: assign({

                        admissionId: ({ event }) => event.id,

                        action: () => "APPROVE"

                    })

                },

                REJECT: {

                    target: "Updating",

                    actions: assign({

                        admissionId: ({ event }) => event.id,

                        action: () => "REJECT"

                    })

                }

            }

        },

        Updating: {

            invoke: {

                src: fromPromise(async ({ input }) => {

                    return await updateAdmissionStatus(

                        input.id,

                        input.action

                    );

                }),

                input: ({ context }) => ({

                    id: context.admissionId,

                    action: context.action

                }),

                onDone: [

                    {

                        target: "Approved",

                        guard: ({ event }) =>

                            event.output.status === "Approved",

                        actions: assign({

                            result: ({ event }) => event.output

                        })

                    },

                    {

                        target: "Rejected",

                        actions: assign({

                            result: ({ event }) => event.output

                        })

                    }

                ],

                onError: {

                    target: "Pending"

                }

            }

        },

        Approved: {},

        Rejected: {}

    }

});