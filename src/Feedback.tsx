import {Card, Text} from '@sanity/ui'

export default function Feedback({children}: {children: React.ReactNode}): React.JSX.Element {
  return (
    <Card padding={4} radius={2} shadow={1} tone="caution">
      <Text>{children}</Text>
    </Card>
  )
}
