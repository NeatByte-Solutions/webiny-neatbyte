export function Alert({ type, children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[4.125rem__minmax(0,_auto)] gap-[0.625rem] lg:gap-0 bg-purple text-dark-purple py-5 lg:py-6 pl-[0.875rem] lg:pl-0 pr-[0.875rem] lg:pr-[4.125rem] rounded-[0.625rem]">
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        <path
          d="M11 0L14.2328 6.55041L21.4616 7.60081L16.2308 12.6996L17.4656 19.8992L11 16.5L4.53436 19.8992L5.76919 12.6996L0.538379 7.60081L7.76718 6.55041L11 0Z"
          fill="#3366FF"
        />
      </svg>
      <div className="first:children:mt-0 last:children:mb-0">{children}</div>
    </div>
  )
}
