import { Tab, TabPanel, Tabs, TabList } from 'react-tabs'

export function TabsNew({ children }) {
  return (
    <Tabs className="">
      <TabList className="flex">
        {children.map((obj) => {
          return <Tab>{obj.props.label}</Tab>
        })}
      </TabList>
      <div>
        {children.map((obj) => {
          return <TabPanel>{obj.props.children}</TabPanel>
        })}
      </div>
    </Tabs>
  )
}
