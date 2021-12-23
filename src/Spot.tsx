import React from 'react'
import {Box, Card, Text, Tooltip} from '@sanity/ui'
import {motion} from 'framer-motion'
import get from 'lodash/get'

const dragStyle = {
  width: `1rem`,
  height: `1rem`,
  position: `absolute`,
}

const dotStyle = {
  ...dragStyle,
  borderRadius: `50%`,
  // make sure pointer events only run on the parent
  pointerEvents: `none`,
}

const round = (num) => Math.round(num * 100) / 100

export default function Spot({spot, bounds = undefined, update, hotspotDescriptionPath = ``, tooltip}) {
  // x/y are stored as % but need to be displayed as px
  const [{x, y}, setXY] = React.useState({x: 0, y: 0})
  const [rect, setRect] = React.useState({width: 0, height: 0})
  const [isDragging, setIsDragging] = React.useState(false)

  React.useEffect(() => {
    const clientRect = bounds?.current?.getBoundingClientRect()

    if (clientRect) {
      // So convert % to px once we know the height/width of the image
      setXY({
        x: round(clientRect.width * (spot.x / 100)),
        y: round(clientRect.height * (spot.y / 100)),
      })

      setRect(clientRect)
    }
  }, [bounds, bounds.current])

  const handleDragEnd = React.useCallback(
    (event) => {
      setIsDragging(false)

      // I don't know why, but framer-motion doesn't give you the actual transform values
      // So we have to regex the `px` values off the inline styles
      const [currentX, currentY] = event.srcElement.style.transform.split(` `).map((v) => {
        return v
          ? v
              .match(/\(([^)]+)\)/)
              .pop()
              .replace(`px`, ``)
          : null
      })

      if (!Number(currentX) || !Number(currentY)) {
        return console.warn(`Missing or non-number X or Y`, {currentX, currentY}, event.srcElement)
      }

      // Which we need to convert back to `%` to patch the document
      const newX = round((currentX * 100) / rect.width)
      const newY = round((currentY * 100) / rect.height)

      // Don't go below 0 or above 100
      const safeX = Math.max(0, Math.min(100, newX))
      const safeY = Math.max(0, Math.min(100, newY))

      update(spot._key, safeX, safeY)
    },

    [spot]
  )

  if (!x || !y) {
    return null
  }

  return (
    <Tooltip
      key={spot._key}
      disabled={isDragging}
      boundaryElement={bounds.current}
      portal
      content={
        tooltip && typeof tooltip === 'function' ? (
          React.createElement(tooltip, {spot})
        ) : (
          <Box padding={2} style={{maxWidth: 200, pointerEvents: `none`}}>
            <Text textOverflow="ellipsis">{hotspotDescriptionPath ? get(spot, hotspotDescriptionPath) : `${spot.x}% x ${spot.y}%`}</Text>
          </Box>
        )
      }
    >
      <motion.div
        drag
        dragConstraints={bounds}
        dragMomentum={false}
        initial={{x, y}}
        onDragEnd={handleDragEnd}
        onDragStart={() => setIsDragging(true)}
        style={dragStyle}
      >
        <Card tone="primary" shadow={3} style={dotStyle} />
      </motion.div>
    </Tooltip>
  )
}