import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./adminRoutes";
import studentRoutes from "./studentRoutes";

import AdmissionForm from "../views/AdmissionForm.vue";

const routes = [

    {
        path: "/",
        redirect: "/admin/dashboard"
    },

    {
        path: "/apply",
        component: AdmissionForm
    },

    adminRoutes,

    studentRoutes

];

const router = createRouter({

    history: createWebHistory(),

    routes

});

router.beforeEach((to, from, next) => {

    const studentToken = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");

    const studentPublic = [
        "/student/login",
        "/student/register"
    ];

    const adminPublic = [
        "/admin/login"
    ];

    // Student Routes
    if (to.path.startsWith("/student")) {

        if (!studentToken && !studentPublic.includes(to.path)) {
            return next("/student/login");
        }

        if (studentToken && studentPublic.includes(to.path)) {
            return next("/student/dashboard");
        }

    }
                                                
    // Admin Routes
    if (to.path.startsWith("/admin")) {

        if (!adminToken && !adminPublic.includes(to.path)) {
            return next("/admin/login");
        }

        if (adminToken && adminPublic.includes(to.path)) {
            return next("/admin/dashboard");
        }

    }

    next();

});
export default router;