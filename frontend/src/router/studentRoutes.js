import StudentLayout from "../layouts/StudentLayout.vue"

import StudentDashboard from "../views/student/Dashboard.vue"
import ApplyAdmission from "../views/student/ApplyAdmission.vue"
import MyApplication from "../views/student/MyApplication.vue"
import Profile from "../views/student/Profile.vue"
import Register from "../views/Register.vue"
import login from "../views/Login.vue"
export default {

    path: "/student",

    component: StudentLayout,

    children: [

        {
            path: "dashboard",
            component: StudentDashboard
        },

        {
            path: "apply",
            component: ApplyAdmission
        },

        {
            path: "application",
            component: MyApplication
        },

        {
            path: "profile",
            component: Profile
        },

        {
            path: "register",
            component: Register
         },

         {
            path:"login",
            component:login
         }

    ]

}

