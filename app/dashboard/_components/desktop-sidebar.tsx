import SidebarMenuItems, { routesProps } from "./sidebar-menu-items";

function DesktopSidebar({ routes }: routesProps) {
  return (
    <div className=" hidden md:block  dark:bg-root  h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-4 bg-slate-1 px-4 pb-6 dark:border-slate-700 ">
      <div className="space-y-4 ">
        <div className="px-3 py-2">
          <h2 className=" px-4 pb-7 pt-4 text-3xl font-semibold">Dashboard</h2>

          <SidebarMenuItems routes={routes} />
        </div>
      </div>
    </div>
  );
}

export default DesktopSidebar;
