import { Box, Card, Text, Tooltip } from '@sanity/ui'
import { motion, useMotionValue } from 'framer-motion'
import get from 'lodash/get'
import React, { CSSProperties, ReactElement, useEffect } from 'react'
import { FnHotspotMove, TSpot } from './HotspotArray'

const dragStyle: CSSProperties = {
  width: '1rem',
  height: '1rem',
  position: 'absolute',
  top: 0,
  left: 0,
  margin: '-0.5rem 0 0 -0.5rem',
  cursor: 'pointer',
}

const dragStyleWhileDrag: CSSProperties = {
  cursor: 'none',
}

const dotStyle: CSSProperties = {
  width: 'inherit',
  height: 'inherit',
  borderRadius: '50%',
  textAlign: 'center',
  lineHeight: 1,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'black',
  // make sure pointer events only run on the parent
  pointerEvents: 'none',
}

const round = (num) => Math.round(num * 100) / 100

interface IHotspot {
  spot: TSpot
  bounds: DOMRectReadOnly
  update: FnHotspotMove
  hotspotDescriptionPath?: string
  tooltip?: ReactElement
}

export default function Spot({spot, bounds, update, hotspotDescriptionPath = ``, tooltip}: IHotspot) {
  const [isDragging, setIsDragging] = React.useState(false)
  // x/y are stored as % but need to be converted to px
  const x = useMotionValue(round(bounds.width * (spot.x / 100)))
  const y = useMotionValue(round(bounds.height * (spot.y / 100)))

  /**
   * update x/y if the bounds change when resizing the window
   */
   useEffect(() => {
    x.set(round(bounds.width * (spot.x / 100)))
    y.set(round(bounds.height * (spot.y / 100)))
  }, [bounds])

  const handleDragEnd = React.useCallback(
    (event) => {
      setIsDragging(false)

      // get current values for x/y in px
      const currentX = x.get()
      const currentY = y.get()

      if (!Number(currentX) || !Number(currentY)) {
        return console.warn(`Missing or non-number X or Y`, {currentX, currentY}, event.srcElement)
      }

      if (!bounds.width || !bounds.height) {
        return console.warn(`Rect width/height not yet set`, { bounds })
      }

      // Which we need to convert back to `%` to patch the document
      const newX = round((currentX * 100) / bounds.width)
      const newY = round((currentY * 100) / bounds.height)

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
      portal
      content={
        tooltip && typeof tooltip === 'function' ? (
          React.createElement(tooltip, {spot})
        ) : (
          <Box padding={2} style={{maxWidth: 200, pointerEvents: `none`}}>
            <Text textOverflow="ellipsis">{hotspotDescriptionPath ? get(spot, hotspotDescriptionPath) as string : `${spot.x}% x ${spot.y}%`}</Text>
          </Box>
        )
      }
    >
      <motion.div
        drag
        dragConstraints={bounds}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onDragStart={() => setIsDragging(true)}
        style={isDragging ? { ...dragStyle, ...dragStyleWhileDrag, x, y } : { ...dragStyle, x, y }}
      >
        <Card tone="primary" shadow={3} style={dotStyle}>
          ・
        </Card>
      </motion.div>
    </Tooltip>
  )
}
