import { Tab, TabPanel, Tabs, TabList } from 'react-tabs'

export function TabsItem({ children }) {
  return <TabPanel>{children}</TabPanel>
}

export function TabsComponent({ children }) {
  return (
    <Tabs>
      <TabList className="flex not-prose">
        {children.map((tabItem, i) => {
          return (
            <Tab
              key={i}
              className="w-[9.188rem] text-center hover:bg-smoke hover:rounded-md py-2 font-roboto text-[0.875rem] font-semibold cursor-pointer"
              selectedClassName="border-orange border-b-2 text-orange hover:rounded-b-none"
            >
              {tabItem.props.title}
            </Tab>
          )
        })}
      </TabList>
      <div>{children}</div>
    </Tabs>
  )
}
