"use client";

import { useMemo } from "react";
import MobileSidebar from "./mobile-sidebar";
import DesktopSidebar from "./desktop-sidebar";
import { Icons } from "@/components/icons";
import { Image } from "lucide-react";

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
      {
        href: `/dashboard/media`,
        label: "Media",
        icons: () => <Image className=" h-4 w-4 mr-2" />,
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
