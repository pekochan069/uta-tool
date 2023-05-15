const OctalIcon = (props: { class?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      class={`inline-block h-full w-full ${props.class}`}
    >
      <path
        fill="currentColor"
        d="M7 7c-1.1 0-2 .9-2 2v6a2 2 0 0 0 2 2h2c1.11 0 2-.89 2-2V9a2 2 0 0 0-2-2H7m0 2h2v6H7V9M14.5 10 c-1.1 0-2 .9-2 2v3a2 2 0 0 0 2 2h2c1.11 0 2-.89 2-2V12a2 2 0 0 0-2-2H14.5m0 2h2v3H14.5Z"
      />
    </svg>
  );
};

export default OctalIcon;
