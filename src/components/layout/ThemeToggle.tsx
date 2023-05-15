import { createSignal, createEffect, onMount } from "solid-js";
import { Switch } from "@kobalte/core";
import { SunIcon, MoonIcon } from "~/components/icons";

const ThemeToggle = () => {
  const [checked, setChecked] = createSignal(false);

  onMount(() => {
    if (localStorage.getItem("theme") === "dark") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  });

  createEffect(() => {
    if (checked()) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <div>
      <Switch.Root checked={checked()} onChange={setChecked}>
        <Switch.Label class="sr-only">Change Theme</Switch.Label>
        <Switch.Input id="theme-toggle" />
        <Switch.Control
          class={`relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition ease-func1 before:absolute before:z-10 before:block before:h-6 before:w-6 before:translate-x-0 before:rounded-full before:bg-white before:transition-transform before:ease-func1 ${
            checked()
              ? "bg-slate-200 text-slate-800 before:translate-x-8"
              : "bg-slate-800 text-slate-50"
          }`}
        >
          <div class="flex h-4 w-full items-center justify-between">
            <SunIcon />
            <MoonIcon />
          </div>
        </Switch.Control>
      </Switch.Root>
      <span class="sr-only">{checked() ? "Light theme" : "Dark theme"}</span>
    </div>
  );
};

export default ThemeToggle;
