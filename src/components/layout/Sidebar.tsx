import { Button } from "@kobalte/core";
import CurrentPath from "./CurrentPath";
import SidebarItem from "./SidebarItem";
import { MenuIcon } from "~/components/icons";

const Sidebar = () => {

  return (
    <div class="border-t-[1px] border-stone-300">
      <div class="container mx-auto max-w-[96rem] p-2 md:px-4">
        <div class="flex items-center gap-4">
          <Button.Root class="rounded-md p-1 text-xl text-black outline-none transition hover:bg-gray-200 focus:ring-1 focus:ring-gray-900/30 focus:ring-offset-1 active:bg-gray-300 dark:text-white dark:hover:bg-stone-600 dark:focus:ring-gray-900/50 dark:active:bg-stone-500">
            <MenuIcon />
          </Button.Root>
          <CurrentPath />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
