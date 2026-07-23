import AdminLayout from "../layouts/AdminLayout.vue";

import Dashboard from "../views/admin/Dashboard.vue";
import AdmissionList from "../views/admin/AdmissionList.vue";
import AdmissionDetails from "../views/admin/AdmissionDetails.vue";
import Reports from "../views/admin/Reports.vue";
import Settings from "../views/admin/Settings.vue";
import AdminLogin from "../views/admin/AdminLogin.vue";
import MeritList from "../views/admin/MeritList.vue";
import Profile from "../views/admin/Profile.vue"
export default {
    path: "/admin",
    component: AdminLayout,

    children: [

        {
            path: "dashboard",
            component: Dashboard
        },

        {
            path: "admissions",
            component: AdmissionList
        },

        {
            path: "admissions/:id",
            component: AdmissionDetails
        },


        {
            path: "reports",
            component: Reports
        },

        {
            path: "settings",
            component: Settings
        },

        {
            path: "login",
            component : AdminLogin
        },

        {
            path: "merit-list",
            component: MeritList
        },

        {
            path: "Profile",
            component: Profile
        }

    ]
}