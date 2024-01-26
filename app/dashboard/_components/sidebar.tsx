"use client";

import { useMemo } from "react";
import MobileSidebar from "./mobile-sidebar";
import DesktopSidebar from "./desktop-sidebar";
import { Icons } from "@/components/icons";

function Sidebar() {
  const routes = useMemo(
    () => [
      {
        href: `/dashboard/project`,
        label: "Project",
        icons: Icons.project,
      },
      {
        href: `/dashboard/skills`,
        label: "Skills",
        icons: Icons.billboard,
      },
      {
        href: `/dashboard/experience`,
        label: "Experience",
        icons: Icons.size,
      },
    ],
    []
  );

  return (
    <>
      <DesktopSidebar routes={routes} />
      <MobileSidebar routes={routes} />
    </>
  );
}

export default Sidebar;
