import StudentLayout from "@/Layouts/StudentLayout.vue";

export default {

    path: "/student",

    component: StudentLayout,

    children: [

        {
            path: "dashboard",
            component: () => import("@/views/student/Dashboard.vue")
        },

        {
            path: "apply",
            component: () => import("@/views/student/ApplyAdmission.vue")
        },

        {
            path: "application",
            component: () => import("@/views/student/MyApplication.vue")
        },

        {
            path: "profile",
            component: () => import("@/views/student/Profile.vue")
        },

        {
            path: "register",
            component: () => import("@/views/Register.vue")
         },

         {
            path: "login",
            component: () => import("@/views/Login.vue")
         }

    ]

}

