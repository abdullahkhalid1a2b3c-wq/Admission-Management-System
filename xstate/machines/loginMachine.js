import { createMachine, assign, fromPromise } from "xstate";
import { loginStudent } from "../services/authService.js";

export const loginMachine = createMachine({

    id: "loginMachine",

    initial: "Idle",

    context: {

        email: "",
        password: "",

        token: null,
        student: null,

        error: null,

        result: null

    },

    states: {

        Idle: {

            on: {

                LOGIN: {

                    target: "Authenticating",

                    actions: assign({

                        email: ({ event }) => event.email,

                        password: ({ event }) => event.password

                    })

                }

            }

        },

        Authenticating: {

            invoke: {

                src: fromPromise(async ({ input }) => {

                    return await loginStudent(

                        input.email,

                        input.password

                    );

                }),

                input: ({ context }) => ({

                    email: context.email,

                    password: context.password

                }),

                onDone: {

                    target: "Authenticated",

                    actions: assign({

                        token: ({ event }) => event.output.data.token,

                        student: ({ event }) => event.output.data.student,

                        result: ({ event }) => event.output.data,

                        error: () => null

                    })

                },

                onError: {

                    target: "Failed",

                    actions: assign({

                        error: ({ event }) =>

                            event.error?.response?.data?.message ||

                            "Invalid Email or Password",

                        result: ({ event }) =>

                            event.error?.response?.data ||

                            {

                                message: "Invalid Email or Password"

                            }

                    })

                }

            }

        },

        Authenticated: {

            on: {

                LOGOUT: {

                    target: "Idle",

                    actions: assign({

                        token: () => null,

                        student: () => null,

                        email: () => "",

                        password: () => "",

                        error: () => null,

                        result: () => null

                    })

                }

            }

        },

        Failed: {

            on: {

                RETRY: {

                    target: "Idle",

                    actions: assign({

                        error: () => null,

                        result: () => null

                    })

                }

            }

        }

    }

});