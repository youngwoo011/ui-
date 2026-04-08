import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Employees } from "./components/Employees";
import { VacationRequest } from "./components/VacationRequest";
import { Calendar } from "./components/Calendar";
import { Search } from "./components/Search";
import { Chat } from "./components/Chat";
import { Evaluation } from "./components/Evaluation";
import { OrgChart } from "./components/OrgChart";
import { HeartLetter } from "./components/HeartLetter";
import { Community } from "./components/Community";
import { Handover } from "./components/Handover";
import { Approval } from "./components/Approval";
import { Notice } from "./components/Notice";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "notice", Component: Notice },
      { path: "employees", Component: Employees },
      { path: "vacation", Component: VacationRequest },
      { path: "calendar", Component: Calendar },
      { path: "search", Component: Search },
      { path: "chat", Component: Chat },
      { path: "evaluation", Component: Evaluation },
      { path: "approval", Component: Approval },
      { path: "org-chart", Component: OrgChart },
      { path: "heart-letter", Component: HeartLetter },
      { path: "community", Component: Community },
      { path: "handover", Component: Handover },
    ],
  },
]);