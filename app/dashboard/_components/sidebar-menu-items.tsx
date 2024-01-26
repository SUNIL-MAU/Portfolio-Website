import { IconProps } from "@/components/icons";
import MenuItem from "./menu-item";

type route = {
  href: string;
  label: string;
  icons: (props: IconProps) => JSX.Element;
};

export type routesProps = {
  routes: route[];
};

const SidebarMenuItems = ({ routes }: routesProps) =>
  routes.map((route: route, index: number) => (
    <MenuItem key={index} {...route} />
  ));

export default SidebarMenuItems;
