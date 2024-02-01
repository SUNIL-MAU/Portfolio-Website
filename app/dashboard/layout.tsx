import SelectFileProvider from "@/context/select-file-context";
import Sidebar from "./_components/sidebar";

export const metadata = {
  title: "Sunil Maurya | Portfolio Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectFileProvider>
      <div
        className={`!scroll-smooth bg-gray-50 text-gray-950 relative  h-full w-full  dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

        <div className=" flex flex-col md:flex-row">
          <div>
            <Sidebar />
          </div>
          <div className=" flex-1 ">
            <div className=" mx-auto max-w-5xl px-6 pt-6 ">{children}</div>
          </div>
        </div>
      </div>
    </SelectFileProvider>
  );
}
