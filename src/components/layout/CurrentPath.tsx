import { For, Show } from "solid-js";
import { Breadcrumbs } from "@kobalte/core";

const CurrentPath = () => {
  const path = window.location.pathname.split("/").filter((x) => x);
  console.log(path);

  return (
    <Breadcrumbs.Root>
      <ol class="flex gap-1 text-lg">
        <For each={path}>
          {(part, i) => (
            <>
              <li>
                <span
                  class={`${
                    i() === path.length - 1
                      ? "font-semibold text-stone-900 truncate dark:text-stone-200"
                      : ""
                  }`}
                >
                  {part}
                </span>
              </li>
              <Show when={i() < path.length - 1}>
                <Breadcrumbs.Separator />
              </Show>
            </>
          )}
        </For>
      </ol>
    </Breadcrumbs.Root>
  );
};

export default CurrentPath;
