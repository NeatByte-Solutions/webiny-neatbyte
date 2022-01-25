import { Tab, TabPanel, Tabs, TabList } from 'react-tabs'
import clsx from 'clsx'

import styles from './TabsNew.module.css'

export function TabsNew({ children, labels }) {
  return (
    <Tabs>
      <TabList className='flex not-prose'>
        {labels.map((obj) => {
          return <Tab className="" selectedClassName="">{obj.label}</Tab>
        })}
      </TabList>
      <div className="bg-smoke rounded-xl p-8">
        {children.map((obj) => {
          return <TabPanel>{obj.props.children}</TabPanel>
        })}
      </div>
    </Tabs>
  )
}
