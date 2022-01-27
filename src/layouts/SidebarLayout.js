import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, forwardRef, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import clsx from 'clsx'
import { Dialog } from '@headlessui/react'

import arrow from '../assets/menu-arrow/menu-arrow.svg'

export const SidebarContext = createContext()

/**
 * Find the nearst scrollable ancestor (or self if scrollable)
 *
 * Code adapted and simplified from the smoothscroll polyfill
 *
 *
 * @param {Element} el
 */
function nearestScrollableContainer(el) {
  /**
   * indicates if an element can be scrolled
   *
   * @param {Node} el
   */
  function isScrollable(el) {
    const style = window.getComputedStyle(el)
    const overflowX = style['overflowX']
    const overflowY = style['overflowY']
    const canScrollY = el.clientHeight < el.scrollHeight
    const canScrollX = el.clientWidth < el.scrollWidth

    const isScrollableY = canScrollY && (overflowY === 'auto' || overflowY === 'scroll')
    const isScrollableX = canScrollX && (overflowX === 'auto' || overflowX === 'scroll')

    return isScrollableY || isScrollableX
  }

  while (el !== document.body && isScrollable(el) === false) {
    el = el.parentNode || el.host
  }

  return el
}

const NavTreeElement = forwardRef(({ element, depth = 0 }, ref) => {
  const router = useRouter()

  const { type, title, link } = element

  if (type === 'collapsable') {
    return <Collapsable subElements={element.links} title={title} ref={ref} depth={depth} />
  } else if (type === 'page') {
    const isActive = element.link === router.pathname

    return <Page title={title} link={element.link} isActive={isActive} ref={ref} depth={depth} />
  } else if (type === 'section') {
    return <Section title={title} link={link} depth={depth} />
  } else {
    return null
  }
})

const Collapsable = forwardRef(({ title, subElements = [], depth = 0 }, ref) => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <li
        href="#"
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center cursor-pointer my-[10px]"
      >
        <div className="mr-[10px]">
          <img src={arrow} className={`${showMenu ? 'rotate-90' : null}`}></img>
        </div>
        <a
          href="#"
          className={clsx({
            'font-bold text-nav-subdirectory text-dark-purple': showMenu && depth > 0,
            'text-nav-subdirectory font-normal text-dark-purple': !showMenu && depth > 0,
            'text-dark-blue font-semibold text-nav-directory': depth === 0,
          })}
        >
          {title}
        </a>
      </li>
      <ul className={`duration-300 ml-[10px] ${showMenu ? 'block' : 'hidden'}`}>
        {subElements.map((navElement, index) => (
          <NavTreeElement key={index} element={navElement} ref={ref} depth={depth + 1} />
        ))}
      </ul>
    </>
  )
})

const Page = forwardRef(({ title, link, isActive, depth = 0 }, ref) => {
  return (
    <li ref={ref}>
      <Link href={link}>
        <a
          className={clsx('block my-[10px] cursor-pointer text-nav-link', {
            'text-orange border-orange border-r-[2px] font-bold': isActive,
            'hover:border-r-[2px] hover:text-dark-purple border-blue': !isActive,
            'text-dark-blue font-semibold text-nav-directory': depth === 0,
          })}
        >
          {title}
        </a>
      </Link>
    </li>
  )
})
const Section = ({ title }) => {
  return (
    <a className="my-[10px] uppercase text-dark-blue font-normal text-nav-subdirectory">{title}</a>
  )
}

function Nav({ nav, mobile = false }) {
  const router = useRouter()
  const activeItemRef = useRef()
  const previousActiveItemRef = useRef()
  const scrollRef = useRef()

  useIsomorphicLayoutEffect(() => {
    function updatePreviousRef() {
      previousActiveItemRef.current = activeItemRef.current
    }

    if (activeItemRef.current) {
      if (activeItemRef.current === previousActiveItemRef.current) {
        updatePreviousRef()
        return
      }

      updatePreviousRef()

      const scrollable = nearestScrollableContainer(scrollRef.current)

      const scrollRect = scrollable.getBoundingClientRect()
      const activeItemRect = activeItemRef.current.getBoundingClientRect()

      const top = activeItemRef.current.offsetTop
      const bottom = top - scrollRect.height + activeItemRect.height

      if (scrollable.scrollTop > top || scrollable.scrollTop < bottom) {
        scrollable.scrollTop = top - scrollRect.height / 2 + activeItemRect.height / 2
      }
    }
  }, [router.pathname])

  return (
    <nav ref={scrollRef} id="nav" className="lg:text-sm lg:leading-6 relative font-roboto">
      <ul>
        {nav.map((el, index) => {
          return <NavTreeElement element={el} key={index} ref={activeItemRef} router={router} />
        })}
      </ul>
    </nav>
  )
}

function Wrapper({ allowOverflow, children }) {
  return <div className={allowOverflow ? undefined : 'overflow-hidden'}>{children}</div>
}

export function SidebarLayout({
  children,
  navIsOpen,
  setNavIsOpen,
  nav,
  sidebar,
  layoutProps: { allowOverflow = true } = {},
}) {
  return (
    <SidebarContext.Provider value={{ nav, navIsOpen, setNavIsOpen }}>
      <Wrapper allowOverflow={allowOverflow}>
        <div className="max-w-[96.993rem] 2xl:max-w-[104rem] mx-auto pl-4 sm:pl-6 md:pl-8 2xl:pl-[5.43rem] pr-4 sm:pr-6 md:pr-8">
          <div className="hidden lg:block fixed z-20 inset-0 top-[4.375rem] right-auto w-[20.875rem] pb-10 pl-[20px] overflow-y-auto">
            <Nav nav={nav}>{sidebar}</Nav>
          </div>
          <div className="lg:pl-[20.875rem]">{children}</div>
        </div>
      </Wrapper>
      <Dialog
        as="div"
        open={navIsOpen}
        onClose={() => setNavIsOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto lg:hidden"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" />
        <div className="relative bg-white w-[21.25rem] max-w-[calc(100%-3rem)] p-6 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setNavIsOpen(false)}
            className="absolute z-10 top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <span className="sr-only">Close navigation</span>
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 overflow-visible">
              <path
                d="M0 0L10 10M10 0L0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <Nav nav={nav} mobile={true}>
            {sidebar}
          </Nav>
        </div>
      </Dialog>
    </SidebarContext.Provider>
  )
}
