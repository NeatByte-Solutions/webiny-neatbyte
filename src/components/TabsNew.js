import { Tab, TabPanel, Tabs, TabList } from 'react-tabs'

export function TabsNew({ children, labels }) {
  return (
    <Tabs className="">
      <TabList className="flex">
        {labels.map((obj) => {
          return <Tab>{obj.label}</Tab>
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
