import Link from 'next/link'
import { SearchButton } from '@/components/Search'
import Router from 'next/router'
import { Logo } from '@/components/Logo'
import { Dialog } from '@headlessui/react'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ThemeSelect, ThemeToggle } from './ThemeToggle'
import styles from './Header.module.css'

function Featured() {
  return (
    <Link href="/blog/tailwindcss-v3">
      <a
        className={clsx(
          'ml-9 text-xs leading-5 font-medium bg-white rounded-full py-1 px-3 hidden xl:flex items-center',
          styles.headerGithubLink
        )}
      >
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
            strokeLinecap="round"
            strokeLinejoin="round"
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
            fillRule="evenodd"
            clipRule="evenodd"
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
        <Dialog.Overlay className="fixed top-[3.375rem] inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
        <div
          className={clsx(
            'fixed top-[4.3125rem] right-[0.875rem] w-full max-w-[16.4375rem] bg-white rounded-lg pt-5 text-base font-semibold text-slate-900 dark:text-slate-400 dark:highlight-white/5',
            styles.headerDialog
          )}
        >
          <div className={styles.whiteCorner}></div>
          <ul className="space-y-5 px-5">
            <NavItems />
          </ul>
          <div className="flex justify-between mt-5 py-2 px-11 border-t border-slate-200 dark:border-slate-200/10">
            <a>
              <svg
                width="51"
                height="46"
                viewBox="0 0 51 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 10C36 4.47715 31.5228 0 26 0C20.4772 0 16 4.47715 16 10C16 15.5228 20.4772 20 26 20C31.5228 20 36 15.5228 36 10Z"
                  fill="#94A3B8"
                />
                <path
                  d="M28.3939 4.79798C26.975 4.83394 25.8369 5.99524 25.8369 7.42298C25.8369 7.62851 25.8589 7.82945 25.9039 8.02198C23.7212 7.91233 21.7861 6.86688 20.4909 5.27798C20.2648 5.66566 20.1349 6.11725 20.1349 6.59898C20.1349 7.50997 20.5992 8.31316 21.3039 8.78398C20.8736 8.77021 20.468 8.65168 20.1139 8.45498C20.1137 8.4659 20.1139 8.47781 20.1139 8.48898C20.1139 9.76114 21.0194 10.8213 22.2209 11.063C22.0005 11.1227 21.7684 11.155 21.5289 11.155C21.3594 11.155 21.1952 11.1389 21.0349 11.108C21.3693 12.1512 22.3379 12.9109 23.4869 12.932C22.5881 13.6364 21.4574 14.056 20.2269 14.056C20.0151 14.056 19.8054 14.0444 19.5999 14.02C20.7624 14.7655 22.142 15.2 23.6249 15.2C28.4555 15.2 31.0969 11.1984 31.0969 7.72798C31.0969 7.61418 31.0948 7.49975 31.0899 7.38698C31.6028 7.01749 32.048 6.55467 32.3999 6.02798C31.9293 6.23715 31.4232 6.37884 30.8919 6.44198C31.4344 6.11719 31.8507 5.60272 32.0469 4.98898C31.5394 5.29013 30.9773 5.50902 30.3789 5.62698C29.9 5.11666 29.2172 4.79798 28.4619 4.79798C28.4392 4.79798 28.4164 4.79741 28.3939 4.79798V4.79798Z"
                  fill="white"
                />
                <path
                  d="M4.57617 28.4688V37H2.82422V28.4688H4.57617ZM7.20117 28.4688V29.8457H0.240234V28.4688H7.20117ZM10.3535 35.6465L12.0527 28.4688H13.002L13.2188 29.6641L11.4082 37H10.3887L10.3535 35.6465ZM9.48047 28.4688L10.8867 35.6465L10.7695 37H9.63281L7.74023 28.4688H9.48047ZM14.7129 35.6172L16.1016 28.4688H17.8418L15.9551 37H14.8184L14.7129 35.6172ZM13.5352 28.4688L15.2461 35.6758L15.1992 37H14.1797L12.3574 29.6582L12.5918 28.4688H13.5352ZM20.666 28.4688V37H18.9141V28.4688H20.666ZM25.9512 28.4688V37H24.1992V28.4688H25.9512ZM28.5762 28.4688V29.8457H21.6152V28.4688H28.5762ZM33.4863 28.4688V37H31.7344V28.4688H33.4863ZM36.1113 28.4688V29.8457H29.1504V28.4688H36.1113ZM42.8379 35.6289V37H38.2969V35.6289H42.8379ZM38.8711 28.4688V37H37.1133V28.4688H38.8711ZM42.2461 31.9434V33.2793H38.2969V31.9434H42.2461ZM42.832 28.4688V29.8457H38.2969V28.4688H42.832ZM43.8633 28.4688H47.0449C47.6973 28.4688 48.2578 28.5664 48.7266 28.7617C49.1992 28.957 49.5625 29.2461 49.8164 29.6289C50.0703 30.0117 50.1973 30.4824 50.1973 31.041C50.1973 31.498 50.1191 31.8906 49.9629 32.2188C49.8105 32.543 49.5938 32.8145 49.3125 33.0332C49.0352 33.248 48.709 33.4199 48.334 33.5488L47.7773 33.8418H45.0117L45 32.4707H47.0566C47.3652 32.4707 47.6211 32.416 47.8242 32.3066C48.0273 32.1973 48.1797 32.0449 48.2812 31.8496C48.3867 31.6543 48.4395 31.4277 48.4395 31.1699C48.4395 30.8965 48.3887 30.6602 48.2871 30.4609C48.1855 30.2617 48.0312 30.1094 47.8242 30.0039C47.6172 29.8984 47.3574 29.8457 47.0449 29.8457H45.6211V37H43.8633V28.4688ZM48.6328 37L46.6875 33.1973L48.5449 33.1855L50.5137 36.918V37H48.6328Z"
                  fill="#334155"
                />
              </svg>
            </a>
            <hr className={styles.verticalLine}></hr>
            <a>
              <svg
                width="44"
                height="46"
                viewBox="0 0 44 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 0.570679C16.475 0.570679 12 5.04568 12 10.5707C12 14.9957 14.8625 18.7332 18.8375 20.0582C19.3375 20.1457 19.525 19.8457 19.525 19.5832C19.525 19.3457 19.5125 18.5582 19.5125 17.7207C17 18.1832 16.35 17.1082 16.15 16.5457C16.0375 16.2582 15.55 15.3707 15.125 15.1332C14.775 14.9457 14.275 14.4832 15.1125 14.4707C15.9 14.4582 16.4625 15.1957 16.65 15.4957C17.55 17.0082 18.9875 16.5832 19.5625 16.3207C19.65 15.6707 19.9125 15.2332 20.2 14.9832C17.975 14.7332 15.65 13.8707 15.65 10.0457C15.65 8.95818 16.0375 8.05818 16.675 7.35818C16.575 7.10818 16.225 6.08318 16.775 4.70818C16.775 4.70818 17.6125 4.44568 19.525 5.73318C20.325 5.50818 21.175 5.39568 22.025 5.39568C22.875 5.39568 23.725 5.50818 24.525 5.73318C26.4375 4.43318 27.275 4.70818 27.275 4.70818C27.825 6.08318 27.475 7.10818 27.375 7.35818C28.0125 8.05818 28.4 8.94568 28.4 10.0457C28.4 13.8832 26.0625 14.7332 23.8375 14.9832C24.2 15.2957 24.5125 15.8957 24.5125 16.8332C24.5125 18.1707 24.5 19.2457 24.5 19.5832C24.5 19.8457 24.6875 20.1582 25.1875 20.0582C27.1727 19.388 28.8977 18.1121 30.1198 16.4102C31.3419 14.7083 31.9995 12.6659 32 10.5707C32 5.04568 27.525 0.570679 22 0.570679Z"
                  fill="#94A3B8"
                />
                <path
                  d="M7.52344 32.541V35.9219C7.39062 36.082 7.18555 36.2559 6.9082 36.4434C6.63086 36.627 6.27344 36.7852 5.83594 36.918C5.39844 37.0508 4.86914 37.1172 4.24805 37.1172C3.69727 37.1172 3.19531 37.0273 2.74219 36.8477C2.28906 36.6641 1.89844 36.3965 1.57031 36.0449C1.24609 35.6934 0.996094 35.2637 0.820312 34.7559C0.644531 34.2441 0.556641 33.6602 0.556641 33.0039V32.4707C0.556641 31.8145 0.640625 31.2305 0.808594 30.7188C0.980469 30.207 1.22461 29.7754 1.54102 29.4238C1.85742 29.0723 2.23438 28.8047 2.67188 28.6211C3.10938 28.4375 3.5957 28.3457 4.13086 28.3457C4.87305 28.3457 5.48242 28.4668 5.95898 28.709C6.43555 28.9473 6.79883 29.2793 7.04883 29.7051C7.30273 30.127 7.45898 30.6113 7.51758 31.1582H5.8125C5.76953 30.8691 5.6875 30.6172 5.56641 30.4023C5.44531 30.1875 5.27148 30.0195 5.04492 29.8984C4.82227 29.7773 4.5332 29.7168 4.17773 29.7168C3.88477 29.7168 3.62305 29.7773 3.39258 29.8984C3.16602 30.0156 2.97461 30.1895 2.81836 30.4199C2.66211 30.6504 2.54297 30.9355 2.46094 31.2754C2.37891 31.6152 2.33789 32.0098 2.33789 32.459V33.0039C2.33789 33.4492 2.38086 33.8438 2.4668 34.1875C2.55273 34.5273 2.67969 34.8145 2.84766 35.0488C3.01953 35.2793 3.23047 35.4531 3.48047 35.5703C3.73047 35.6875 4.02148 35.7461 4.35352 35.7461C4.63086 35.7461 4.86133 35.7227 5.04492 35.6758C5.23242 35.6289 5.38281 35.5723 5.49609 35.5059C5.61328 35.4355 5.70312 35.3691 5.76562 35.3066V33.7949H4.16016V32.541H7.52344ZM10.8105 28.4688V37H9.05859V28.4688H10.8105ZM16.0957 28.4688V37H14.3438V28.4688H16.0957ZM18.7207 28.4688V29.8457H11.7598V28.4688H18.7207ZM25.4121 31.9434V33.3145H20.959V31.9434H25.4121ZM21.4805 28.4688V37H19.7227V28.4688H21.4805ZM26.666 28.4688V37H24.9141V28.4688H26.666ZM32.9062 28.4688H34.6582V34.1055C34.6582 34.7617 34.5176 35.3145 34.2363 35.7637C33.959 36.2129 33.5742 36.5508 33.082 36.7773C32.5938 37.0039 32.0312 37.1172 31.3945 37.1172C30.7578 37.1172 30.1914 37.0039 29.6953 36.7773C29.2031 36.5508 28.8164 36.2129 28.5352 35.7637C28.2578 35.3145 28.1191 34.7617 28.1191 34.1055V28.4688H29.877V34.1055C29.877 34.4883 29.9375 34.8008 30.0586 35.043C30.1797 35.2852 30.3535 35.4629 30.5801 35.5762C30.8105 35.6895 31.082 35.7461 31.3945 35.7461C31.7148 35.7461 31.9863 35.6895 32.209 35.5762C32.4355 35.4629 32.6074 35.2852 32.7246 35.043C32.8457 34.8008 32.9062 34.4883 32.9062 34.1055V28.4688ZM39.4453 33.2559H37.2539L37.2422 32.0488H39.082C39.4062 32.0488 39.6719 32.0078 39.8789 31.9258C40.0859 31.8398 40.2402 31.7168 40.3418 31.5566C40.4473 31.3926 40.5 31.1934 40.5 30.959C40.5 30.6934 40.4492 30.4785 40.3477 30.3145C40.25 30.1504 40.0957 30.0312 39.8848 29.957C39.6777 29.8828 39.4102 29.8457 39.082 29.8457H37.8633V37H36.1055V28.4688H39.082C39.5781 28.4688 40.0215 28.5156 40.4121 28.6094C40.8066 28.7031 41.1406 28.8457 41.4141 29.0371C41.6875 29.2285 41.8965 29.4707 42.041 29.7637C42.1855 30.0527 42.2578 30.3965 42.2578 30.7949C42.2578 31.1465 42.1777 31.4707 42.0176 31.7676C41.8613 32.0645 41.6133 32.3066 41.2734 32.4941C40.9375 32.6816 40.498 32.7852 39.9551 32.8047L39.4453 33.2559ZM39.3691 37H36.7734L37.459 35.6289H39.3691C39.6777 35.6289 39.9297 35.5801 40.125 35.4824C40.3203 35.3809 40.4648 35.2441 40.5586 35.0723C40.6523 34.9004 40.6992 34.7031 40.6992 34.4805C40.6992 34.2305 40.6562 34.0137 40.5703 33.8301C40.4883 33.6465 40.3555 33.5059 40.1719 33.4082C39.9883 33.3066 39.7461 33.2559 39.4453 33.2559H37.752L37.7637 32.0488H39.873L40.2773 32.5234C40.7969 32.5156 41.2148 32.6074 41.5312 32.7988C41.8516 32.9863 42.084 33.2305 42.2285 33.5312C42.377 33.832 42.4512 34.1543 42.4512 34.498C42.4512 35.0449 42.332 35.5059 42.0938 35.8809C41.8555 36.252 41.5059 36.5312 41.0449 36.7188C40.5879 36.9062 40.0293 37 39.3691 37Z"
                  fill="#334155"
                />
              </svg>
            </a>
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

export function Header({ navIsOpen, onNavToggle, title, section }) {
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
      <div
        className={clsx(
          'sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 bg-smoke',
          styles.mainHeader
        )}
      >
        <div className="relative flex items-center h-[3.375rem] lg:h-16 pl-[0.875rem] md:pl-8 pr-[] md:pr-8">
          <button className="lg:hidden mr-5" onClick={() => onNavToggle(!navIsOpen)}>
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.33344 3.66413C0.597 3.66413 0 3.06713 0 2.33069C0 1.59425 0.597 0.997253 1.33344 0.997253H20.6666C21.403 0.997253 22 1.59425 22 2.33069C22 3.06713 21.403 3.66413 20.6666 3.66413H1.33344ZM0 8.9963C0 9.73256 0.596861 10.3294 1.33313 10.3294H20.6669C21.4031 10.3294 22 9.73256 22 8.9963C22 8.26003 21.4031 7.66317 20.6669 7.66317H1.33313C0.596861 7.66317 0 8.26003 0 8.9963ZM0 15.6619C0 16.3983 0.597 16.9953 1.33344 16.9953H20.6666C21.403 16.9953 22 16.3983 22 15.6619C22 14.9255 21.403 14.3285 20.6666 14.3285H1.33344C0.597 14.3285 0 14.9255 0 15.6619Z"
                fill="#334155"
              />
            </svg>
          </button>
          <Link href="/">
            <a
              className="flex-none w-[1.5925rem] lg:pr-[8.1875rem] lg:border-r border-border overflow-hidden lg:w-auto"
              onContextMenu={(e) => {
                e.preventDefault()
                Router.push('/brand')
              }}
            >
              <span className="sr-only">Tailwind CSS home page</span>
              <Logo className="w-auto h-[1.8025rem] lg:h-10" />
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.8597 14.386L17.9474 18.4737L13.8597 14.386C10.9179 17.3279 6.14823 17.3279 3.20642 14.386C0.264525 11.4442 0.264525 6.6745 3.20642 3.7327C6.14823 0.790801 10.9179 0.790801 13.8597 3.7327C16.8016 6.6745 16.8016 11.4442 13.8597 14.386V14.386Z"
                    stroke="#334155"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                  <path d="M17 1L1 17" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
                  <path d="M1 1L17 17" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
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
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M26 13C26 5.8203 20.1797 0 13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26C20.1797 26 26 20.1797 26 13Z" />
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8597 14.386L17.9474 18.4737L13.8597 14.386C10.9179 17.3279 6.14823 17.3279 3.20642 14.386C0.264525 11.4442 0.264525 6.6745 3.20642 3.7327C6.14823 0.790801 10.9179 0.790801 13.8597 3.7327C16.8016 6.6745 16.8016 11.4442 13.8597 14.386V14.386Z"
                stroke="#334155"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SearchButton>
          <NavPopover className="ml-[1.3781rem] -my-1" display="lg:hidden" />
        </div>
      </div>
      {!isSearchIcon && (
        <div
          className={clsx(
            'sticky z-40 top-16 hidden lg:flex items-center w-full py-6 pl-[2.375rem] pr-[1.875rem] bg-white',
            styles.searchHeader
          )}
        >
          <button
            type="button"
            onClick={() => onNavToggle(!navIsOpen)}
            className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 mr-5"
          >
            <span className="sr-only">Navigation</span>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8597 14.386L17.9474 18.4737L13.8597 14.386C10.9179 17.3279 6.14823 17.3279 3.20642 14.386C0.264525 11.4442 0.264525 6.6745 3.20642 3.7327C6.14823 0.790801 10.9179 0.790801 13.8597 3.7327C16.8016 6.6745 16.8016 11.4442 13.8597 14.386V14.386Z"
                stroke="#334155"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <input type="text" className="w-full focus:outline-0 pr-4" placeholder="Search..." />
          <div className="flex flex-row">
            <button>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="27.8627"
                  height="27.8627"
                  rx="3.5"
                  fill="white"
                  stroke="#E5E5E5"
                />
                <g clip-path="url(#clip0_15_978)">
                  <path
                    opacity="0.5"
                    d="M18.8236 8.15686C18.3244 8.15686 17.8456 8.35518 17.4926 8.70819C17.1396 9.0612 16.9413 9.53998 16.9413 10.0392V17.5686C16.9413 18.0679 17.1396 18.5466 17.4926 18.8996C17.8456 19.2527 18.3244 19.451 18.8236 19.451C19.3229 19.451 19.8016 19.2527 20.1547 18.8996C20.5077 18.5466 20.706 18.0679 20.706 17.5686C20.706 17.0694 20.5077 16.5906 20.1547 16.2376C19.8016 15.8846 19.3229 15.6863 18.8236 15.6863H11.2942C10.795 15.6863 10.3162 15.8846 9.96319 16.2376C9.61018 16.5906 9.41187 17.0694 9.41187 17.5686C9.41187 18.0679 9.61018 18.5466 9.96319 18.8996C10.3162 19.2527 10.795 19.451 11.2942 19.451C11.7934 19.451 12.2722 19.2527 12.6252 18.8996C12.9783 18.5466 13.1766 18.0679 13.1766 17.5686V10.0392C13.1766 9.53998 12.9783 9.0612 12.6252 8.70819C12.2722 8.35518 11.7934 8.15686 11.2942 8.15686C10.795 8.15686 10.3162 8.35518 9.96319 8.70819C9.61018 9.0612 9.41187 9.53998 9.41187 10.0392C9.41187 10.5384 9.61018 11.0172 9.96319 11.3702C10.3162 11.7232 10.795 11.9216 11.2942 11.9216H18.8236C19.3229 11.9216 19.8016 11.7232 20.1547 11.3702C20.5077 11.0172 20.706 10.5384 20.706 10.0392C20.706 9.53998 20.5077 9.0612 20.1547 8.70819C19.8016 8.35518 19.3229 8.15686 18.8236 8.15686Z"
                    stroke="#000E1A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15_978">
                    <rect
                      width="12.549"
                      height="12.549"
                      fill="white"
                      transform="translate(8.78442 7.52942)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button className="ml-[0.38375rem]">
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="28"
                  height="28"
                  rx="3.5"
                  fill="white"
                  stroke="#E5E5E5"
                />
                <path
                  opacity="0.5"
                  d="M11.7302 8.33087V19.7059H10.2224V8.33087H11.7302ZM18.5974 8.33087L13.8708 13.6356L11.2146 16.3934L10.9646 14.784L12.9646 12.5809L16.7849 8.33087H18.5974ZM17.1443 19.7059L12.9333 14.159L13.8318 12.9637L18.9412 19.7059H17.1443Z"
                  fill="#000E1A"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
