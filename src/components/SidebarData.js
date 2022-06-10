import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as TbIcons from "react-icons/tb";

export const sidebarData = [
  {
    title: "DIP",
    path: "/",
    icon: <FaIcons.FaHubspot />,
    cName: "nav-text",
  },
  {
    title: "TCH Availability",
    path: "/tch",
    icon: <TbIcons.TbReportAnalytics />,
    cName: "nav-text",
  },
  {
    title: "Complaints",
    path: "/complaints",
    icon: <IoIcons.IoIosPeople />,
    cName: "nav-text",
  },
];
