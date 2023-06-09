export default function RiSystemMenuUnfoldLine(props: { class?: string }) {
  return (
    <svg
      fill="currentColor"
      stroke-width="0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      style="overflow: visible;"
      // class={`${props.class} inline-block h-full w-full`}
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M21 18v2H3v-2h18zM17.404 3.904 22 8.5l-4.596 4.596-1.414-1.414L19.172 8.5 15.99 5.318l1.414-1.414zM12 11v2H3v-2h9zm0-7v2H3V4h9z"></path>
    </svg>
  );
}
