"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconProps } from "@/components/icons";

type MenuItemProps = {
  label: string;
  href: string;
  icons: (props: IconProps) => JSX.Element;
};

const MenuItem = ({ label, href, icons: Icon }: MenuItemProps) => {
  const pathname = usePathname();

  const active = pathname === href;
  return (
    <Link href={href}>
      <Button
        variant={active ? "secondary" : "ghost"}
        className="w-full justify-start"
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  );
};

export default MenuItem;
