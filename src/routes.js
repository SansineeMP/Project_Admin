import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import UploadVideo from "views/UploadVideo.js";
import Package from "views/Package.js";
import VideoList from "views/VideoList.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User management",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/VideoList",
    name: "Video list",
    icon: "nc-icon nc-camera-20",
    component: VideoList,
    layout: "/admin"
  },
  {
    path: "/UploadVideo",
    name: "Upload video",
    icon: "nc-icon nc-cloud-upload-94",
    component: UploadVideo,
    layout: "/admin"
  },
  {
    path: "/Package",
    name: "Package",
    icon: "nc-icon nc-paper-2",
    component: Package,
    layout: "/admin"
  },
];

export default dashboardRoutes;
