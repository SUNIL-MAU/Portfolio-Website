import SidebarMenuItems, { routesProps } from "./sidebar-menu-items";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

function MobileSidebar({ routes }: routesProps) {
  return (
    <div className=" block md:hidden ">
      <div className=" w-full flex justify-between items-center px-3 py-4">
        <h2>Dashboard</h2>

        <div>
          <Sheet>
            <SheetTrigger className=" flex gap-3 ">
              <AlignJustify />
            </SheetTrigger>
            <SheetContent>
              <div className="space-y-4 ">
                <div className="px-3 py-2">
                  <h2 className=" px-4 pb-7 pt-4 text-3xl font-semibold">
                    Dashboard
                  </h2>
                  <SidebarMenuItems routes={routes} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
