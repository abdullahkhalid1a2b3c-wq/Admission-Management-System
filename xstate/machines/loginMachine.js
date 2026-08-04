const { createMachine, assign, fromPromise } = require("xstate");
const { loginUser } = require("../services/authService");

const loginMachine = createMachine({
    id: "loginMachine",
    initial: "Idle",
    context: {
        email: "",
        password: "",
        role: "student",
        token: null,
        user: null,
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
                        password: ({ event }) => event.password,
                        role: ({ event }) => event.role || "student"
                    })
                }
            }
        },
        Authenticating: {
            invoke: {
                src: fromPromise(async ({ input }) => {
                    return await loginUser(
                        input.email,
                        input.password,
                        input.role
                    );
                }),
                input: ({ context }) => ({
                    email: context.email,
                    password: context.password,
                    role: context.role
                }),
                onDone: {
                    target: "Authenticated",
                    actions: assign({
                        token: ({ event }) => event.output.data.token,
                        user: ({ event }) => event.output.data.student || event.output.data.admin,
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
                            event.error?.response?.data || {
                                message: "Invalid Email or Password"
                            }
                    })
                }
            }
        },
        Authenticated: {},
        Failed: {}
    }
});

module.exports = { loginMachine };