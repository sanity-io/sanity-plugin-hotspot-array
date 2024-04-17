import {Card, Text} from '@sanity/ui'
import {type ReactNode} from 'react'

export default function Feedback({children}: {children: ReactNode}): ReactNode {
  return (
    <Card padding={4} radius={2} shadow={1} tone="caution">
      <Text>{children}</Text>
    </Card>
  )
}
