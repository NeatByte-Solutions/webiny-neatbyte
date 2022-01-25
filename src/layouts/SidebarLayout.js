import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, forwardRef, useEffect, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import clsx from 'clsx'
import { Dialog } from '@headlessui/react'
import { documentationNav2 } from '@/navs/docjson'

import arrow from '../assets/menu-arrow/menu-arrow.png'

export const SidebarContext = createContext()

// const NavItem = forwardRef(({ href, children, isActive, isPublished, fallbackHref }, ref) => {
//   return (
//     <li ref={ref}>
//       <Link href={isPublished ? href : fallbackHref}>
//         <a
//           className={clsx('block border-l pl-4 -ml-px', {
//             'text-sky-500 border-current font-semibold dark:text-sky-400': isActive,
//             'border-transparent hover:border-slate-400 dark:hover:border-slate-500': !isActive,
//             'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300':
//               !isActive && isPublished,
//             'text-slate-400': !isActive && !isPublished,
//           })}
//         >
//           {children}
//         </a>
//       </Link>
//     </li>
//   )
// })

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

const NavTreeElement = ({ element, ref, router, fallbackHref }) => {
  const { type, title, link } = element
  if (type === 'collapsable') {
    return <Collapsable subElements={element.links} title={title} router={router} />
  } else if (type === 'page') {
    let isActive = element.match
      ? element.match.test(router.pathname)
      : element.link === router.pathname
    return (
      <Page
        title={title}
        link={element.link}
        isActive={isActive}
        ref={ref}
        fallbackHref={fallbackHref}
      />
    )
  } else if (type === 'section') {
    return <Section title={title} link={link} />
  } else {
    return null
  }
}

const Collapsable = ({ title, subElements = [], router, ref }) => {
  const [showMenu, setShowMenu] = useState(true)
  return (
    <>
      <li
        href="#"
        onClick={() => setShowMenu(!showMenu)}
        className={`flex items-center cursor-pointer my-[10px]`}
      >
        <div className="mr-[10px]">
          <img src={arrow} className={`duration-300 ${showMenu ? 'rotate-90' : null}`}></img>
        </div>
        <a href="#" className="font-roboto font-semibold text-[18px] text-dark-blue">
          {title}
        </a>
      </li>
      <ul className={`duration-300 ml-[10px] ${showMenu ? 'block' : 'hidden'}`}>
        {subElements.map((navElement, index) => (
          <NavTreeElement key={index} element={navElement} router={router} ref={ref} />
        ))}
      </ul>
    </>
  )
}

const Page = forwardRef(({ title, link, isActive, fallbackHref }, ref) => {
  return (
    <Link href={link} ref={isActive ? ref : fallbackHref}>
      <a
        className={`block h-[30px] my-[10px] cursor-pointer font-roboto text-[16px] ${
          isActive
            ? 'text-orange border-orange border-r-[2px]'
            : 'hover:border-r-[2px] hover:text-blue border-blue'
        }`}
      >
        {title}
      </a>
    </Link>
  )
})
const Section = ({ title }) => {
  return <a className="my-[10px] uppercase text-dark-blue font-roboto text-[16px]">{title}</a>
}

function Nav({ nav, children, fallbackHref, mobile = false }) {
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
    <nav ref={scrollRef} id="nav" className="lg:text-sm lg:leading-6 relative">
      <ul>
        {nav.map((el, index) => {
          return (
            <NavTreeElement
              element={el}
              key={index}
              ref={activeItemRef}
              router={router}
              fallbackHref={fallbackHref}
            />
          )
        })}

        {/* {nav &&
          Object.keys(nav)
            .map((category) => {
              let publishedItems = nav[category].filter((item) => item.published !== false)
              if (publishedItems.length === 0 && !fallbackHref) return null
              return (
                <li key={category} className="mt-12 lg:mt-8">
                  <h5
                    className={clsx('mb-8 lg:mb-3 font-semibold', {
                      'text-slate-900 dark:text-slate-200': publishedItems.length > 0,
                      'text-slate-400': publishedItems.length === 0,
                    })}
                  >
                    {category}
                  </h5>
                  <ul
                    className={clsx(
                      'space-y-6 lg:space-y-2 border-l border-slate-100',
                      mobile ? 'dark:border-slate-700' : 'dark:border-slate-800'
                    )}
                  >
                    {(fallbackHref ? nav[category] : publishedItems).map((item, i) => {
                      let isActive = item.match
                        ? item.match.test(router.pathname)
                        : item.href === router.pathname
                      return (
                        <NavItem
                          key={i}
                          href={item.href}
                          isActive={isActive}
                          ref={isActive ? activeItemRef : undefined}
                          isPublished={item.published !== false}
                          fallbackHref={fallbackHref}
                        >
                          {item.shortTitle || item.title}
                        </NavItem>
                      )
                    })}
                  </ul>
                </li>
              )
            })
            .filter(Boolean)} */}
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
  fallbackHref,
  layoutProps: { allowOverflow = true } = {},
}) {
  return (
    <SidebarContext.Provider value={{ nav, navIsOpen, setNavIsOpen }}>
      <Wrapper allowOverflow={allowOverflow}>
        <div className="max-w-[96.993rem] mx-auto pl-4 sm:pl-6 md:pl-8 2xl:pl-[5.43rem] pr-4 sm:pr-6 md:pr-8">
          <div className="hidden lg:block fixed z-20 inset-0 top-[4.375rem] right-auto w-[20.875rem] pb-10 pl-[20px] overflow-y-auto">
            <Nav nav={documentationNav2} ref={fallbackHref}>
              {sidebar}
            </Nav>
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
          <Nav nav={documentationNav2} ref={fallbackHref} mobile={true}>
            {sidebar}
          </Nav>
        </div>
      </Dialog>
    </SidebarContext.Provider>
  )
}
