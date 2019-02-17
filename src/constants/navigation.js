import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ViewListIcon from "@material-ui/icons/ViewList";
import BookIcon from "@material-ui/icons/Book";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";

export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    href: "dashboard",
    icon: <DashboardIcon color={"secondary"} />
  },
  {
    title: "Customers",
    href: "customers",
    icon: <PersonIcon color={"secondary"} />
  },
  {
    title: "Catalogue",
    href: "catalogue",
    icon: <ViewListIcon color={"secondary"} />
  },
  {
    title: "Quotes",
    href: "catalogue",
    icon: <BookIcon color={"secondary"} />
  },
  {
    title: "Jobs",
    href: "catalogue",
    icon: <AssignmentIcon color={"secondary"} />
  },
  {
    title: "Purchase Orders",
    href: "catalogue",
    icon: <DescriptionIcon color={"secondary"} />
  }
];
