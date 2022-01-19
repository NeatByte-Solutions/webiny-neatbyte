import Link from 'next/link'
import { SearchButton } from '@/components/Search'
import Router from 'next/router'
import { Logo } from '@/components/Logo'
import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ThemeSelect, ThemeToggle } from './ThemeToggle'

function Featured() {
  return (
    <Link href="/blog/tailwindcss-v3">
      <a className="ml-9 text-xs leading-5 font-medium bg-white rounded-full py-1 px-3 hidden xl:flex items-center">
        <span className="ml-2">⭐️ If you like Webiny, give it a star on GitHub! ⭐</span>
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          className="ml-2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 10.748L5.36872 5.95182L1.03281 0.999808"
            stroke="#334155"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </Link>
  )
}

export function NavPopover({ display = 'md:hidden', className, ...props }) {
  let [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    function handleRouteChange() {
      setIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [isOpen])

  return (
    <div className={clsx(className, display)} {...props}>
      <button
        type="button"
        className="flex items-center justify-center mr-[1.6875rem] md:mr-0 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
        onClick={() => setIsOpen(true)}
      >
        <span className="sr-only">Navigation</span>
        <svg
          width="4"
          height="17"
          viewBox="0 0 4 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2 4.99725C3.1 4.99725 4 4.09725 4 2.99725C4 1.89725 3.1 0.997253 2 0.997253C0.9 0.997253 0 1.89725 0 2.99725C0 4.09725 0.9 4.99725 2 4.99725ZM2 6.99639C0.9 6.99639 0 7.89639 0 8.99639C0 10.0964 0.9 10.9964 2 10.9964C3.1 10.9964 4 10.0964 4 8.99639C4 7.89639 3.1 6.99639 2 6.99639ZM2 12.9955C0.9 12.9955 0 13.8955 0 14.9955C0 16.0955 0.9 16.9955 2 16.9955C3.1 16.9955 4 16.0955 4 14.9955C4 13.8955 3.1 12.9955 2 12.9955Z"
            fill="#334155"
          />
        </svg>
      </button>
      <Dialog
        as="div"
        className={clsx('fixed z-50 inset-0', display)}
        open={isOpen}
        onClose={setIsOpen}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
        <div className="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5">
          <button
            type="button"
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close navigation</span>
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible" aria-hidden="true">
              <path
                d="M0 0L10 10M10 0L0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <ul className="space-y-6">
            <NavItems />
          </ul>
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10">
            <ThemeSelect />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export function NavItems() {
  return (
    <>
      <li>
        <Link href="/docs/installation">
          <a className="hover:text-sky-500 dark:hover:text-sky-400">Webiny Home</a>
        </Link>
      </li>
      <li>
        <a href="https://tailwindui.com" className="hover:text-sky-500 dark:hover:text-sky-400">
          Loremipsum
        </a>
      </li>
      <li>
        <Link href="/blog">
          <a className="hover:text-sky-500 dark:hover:text-sky-400">Dolor</a>
        </Link>
      </li>
    </>
  )
}

export function Header({ hasNav = false, navIsOpen, onNavToggle, title, section }) {
  const [isSearchIcon, setIsSearchIcon] = useState(true)
  const onToggleSearch = () => {
    return setIsSearchIcon(!isSearchIcon)
  }
  return (
    <>
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
        <div className="w-[108rem] flex-none flex justify-end">
          <picture>
            <source srcSet={require('@/img/beams/docs@30.avif').default} type="image/avif" />
            <img
              src={require('@/img/beams/docs@tinypng.png').default}
              alt=""
              className="w-[71.75rem] flex-none max-w-none dark:hidden"
            />
          </picture>
          <picture>
            <source srcSet={require('@/img/beams/docs-dark@30.avif').default} type="image/avif" />
            <img
              src={require('@/img/beams/docs-dark@tinypng.png').default}
              alt=""
              className="w-[90rem] flex-none max-w-none hidden dark:block"
            />
          </picture>
        </div>
      </div>
      <div className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-smoke">
        <div className="relative flex items-center h-[3.375rem] lg:h-16 border-b border-slate-900/10 pl-[0.875rem] md:pl-8 pr-[] md:pr-8 lg:border-0 dark:border-slate-300/10">
          <Link href="/">
            <a
              className="flex-none w-[1.5925rem] md:pr-[8.1875rem] lg:border-r border-border overflow-hidden md:w-auto"
              onContextMenu={(e) => {
                e.preventDefault()
                Router.push('/brand')
              }}
            >
              <span className="sr-only">Tailwind CSS home page</span>
              <Logo className="w-auto h-[1.8025rem] md:h-10" />
            </a>
          </Link>
          <Featured />
          <div className="relative hidden lg:flex items-center ml-auto">
            <button onClick={onToggleSearch}>
              {isSearchIcon ? (
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.8597 14.386L17.9474 18.4737L13.8597 14.386C10.9179 17.3279 6.14823 17.3279 3.20642 14.386C0.264525 11.4442 0.264525 6.6745 3.20642 3.7327C6.14823 0.790801 10.9179 0.790801 13.8597 3.7327C16.8016 6.6745 16.8016 11.4442 13.8597 14.386V14.386Z"
                    stroke="#334155"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17 1L1 17" stroke="#334155" stroke-width="2" stroke-linecap="round" />
                  <path d="M1 1L17 17" stroke="#334155" stroke-width="2" stroke-linecap="round" />
                </svg>
              )}
            </button>
            <nav className="flex items-center h-[2.375rem] text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200 border-l border-slate-200 ml-[1.875rem] pl-[1.875rem]">
              <ul className="flex space-x-8">
                <NavItems />
              </ul>
            </nav>
            <div className="flex items-center h-[2.375rem] border-l border-slate-200 ml-[1.875rem] pl-[1.875rem] dark:border-slate-800">
              <a
                href="/"
                className="block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
              >
                <span className="sr-only">Tailwind CSS on GitHub</span>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a
                href="/"
                className="ml-5 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
              >
                <span className="sr-only">Tailwind CSS on GitHub</span>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26C20.1797 26 26 20.1797 26 13Z"
                    fill="#94A3B8"
                  />
                  <path
                    d="M16.1121 6.23764C14.2677 6.28437 12.788 7.79407 12.788 9.65014C12.788 9.91733 12.8167 10.1785 12.8751 10.4288C10.0377 10.2863 7.5221 8.92721 5.83823 6.86164C5.54436 7.36561 5.37543 7.95268 5.37543 8.57893C5.37543 9.76322 5.97905 10.8074 6.89513 11.4194C6.33576 11.4015 5.80854 11.2474 5.34813 10.9917C5.34787 11.0059 5.34813 11.0214 5.34813 11.0359C5.34813 12.6897 6.5253 14.068 8.08723 14.3821C7.80079 14.4598 7.49907 14.5017 7.18763 14.5017C6.96739 14.5017 6.75385 14.4808 6.54543 14.4406C6.98016 15.7969 8.23933 16.7845 9.73303 16.8118C8.56462 17.7276 7.09479 18.273 5.49503 18.273C5.21974 18.273 4.94712 18.258 4.67993 18.2262C6.19119 19.1954 7.98468 19.7602 9.91243 19.7602C16.1922 19.7602 19.626 14.5581 19.626 10.0466C19.626 9.89868 19.6233 9.74993 19.6169 9.60333C20.2837 9.123 20.8626 8.52133 21.3199 7.83664C20.7082 8.10855 20.0503 8.29275 19.3595 8.37483C20.0648 7.9526 20.606 7.28379 20.861 6.48593C20.2013 6.87743 19.4706 7.16198 18.6926 7.31533C18.0701 6.65192 17.1825 6.23764 16.2005 6.23764C16.1711 6.23764 16.1414 6.23689 16.1121 6.23764Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
          <SearchButton className="ml-auto text-slate-500 -my-1 flex items-center justify-center hover:text-slate-600 lg:hidden dark:text-slate-400 dark:hover:text-slate-300">
            <span className="sr-only">Search</span>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.8597 14.386L17.9474 18.4737L13.8597 14.386C10.9179 17.3279 6.14823 17.3279 3.20642 14.386C0.264525 11.4442 0.264525 6.6745 3.20642 3.7327C6.14823 0.790801 10.9179 0.790801 13.8597 3.7327C16.8016 6.6745 16.8016 11.4442 13.8597 14.386V14.386Z"
                stroke="#334155"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </SearchButton>
          <NavPopover className="ml-[1.3781rem] -my-1" display="lg:hidden" />
        </div>
      </div>
      {/* {hasNav && (
            <div className="flex items-center p-4 border-b border-slate-900/10 lg:hidden dark:border-slate-50/[0.06]">
              <button
                type="button"
                onClick={() => onNavToggle(!navIsOpen)}
                className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              >
                <span className="sr-only">Navigation</span>
                <svg width="24" height="24">
                  <path
                    d="M5 6h14M5 12h14M5 18h14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              {title && (
                <ol className="ml-4 flex text-sm leading-6 whitespace-nowrap min-w-0">
                  {section && (
                    <li className="flex items-center">
                      {section}
                      <svg
                        width="3"
                        height="6"
                        aria-hidden="true"
                        className="mx-3 overflow-visible text-slate-400"
                      >
                        <path
                          d="M0 0L3 3L0 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </li>
                  )}
                  <li className="font-semibold text-slate-900 truncate dark:text-slate-200">
                    {title}
                  </li>
                </ol>
              )}
            </div>
          )} */}
    </>
  )
}
