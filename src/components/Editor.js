import { TabBar } from '@/components/TabBar'

export function Editor({ filename, children }) {
  return (
    <div className="mt-[3.75rem] mb-[3.75rem] first:mt-0 last:mb-0 bg-[#7979f7] rounded-xl shadow-lg overflow-hidden dark:ring-1 dark:ring-white/10 dark:ring-inset">
      <TabBar primary={{ name: filename }} showTabMarkers={false} />
      <div className="children:my-0 children:!shadow-none children:bg-transparent children:rounded-none children:p-8">{children}</div>
    </div>
  )
}
