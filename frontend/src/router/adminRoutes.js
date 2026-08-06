
import AdminLayout from "@/Layouts/AdminLayout.vue";

export default {
    path: "/admin",
    component: AdminLayout,

    children: [

        {
            path: "dashboard",
            component: () => import("@/views/admin/Dashboard.vue")
        },

        {
            path: "admissions",
            component: () => import("@/views/admin/AdmissionList.vue")
        },

        {
            path: "admissions/:id",
            component: () => import("@/views/admin/AdmissionDetails.vue")
        },

        {
            path: "reports",
            component: () => import("@/views/admin/Reports.vue")
        },

        {
            path: "settings",
            component: () => import("@/views/admin/Settings.vue")
        },

        {
            path: "login",
            component: () => import("@/views/admin/AdminLogin.vue")
        },

        {
            path: "merit-list",
            component: () => import("@/views/admin/MeritList.vue")
        },

        {
            path: "profile",
            component: () => import("@/views/admin/Profile.vue")
        }

    ]
}