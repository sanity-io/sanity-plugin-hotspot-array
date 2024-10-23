import {Box, Text, Tooltip} from '@sanity/ui'
import {motion, useMotionValue} from 'framer-motion'
import {get} from 'lodash-es'
import {
  ComponentType,
  createElement,
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {type ObjectSchemaType, type RenderPreviewCallback} from 'sanity'

import {FnHotspotMove, HotspotItem} from './ImageHotspotArray'

const dragStyle: CSSProperties = {
  width: '1.4rem',
  height: '1.4rem',
  position: 'absolute',
  boxSizing: 'border-box',
  top: 0,
  left: 0,
  margin: '-0.7rem 0 0 -0.7rem',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  background: '#000',
  color: 'white',
}

const dragStyleWhileDrag: CSSProperties = {
  background: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid #fff',
  cursor: 'none',
}

const dragStyleWhileHover: CSSProperties = {
  background: 'rgba(0, 0, 0, 0.1)',
  border: '1px solid #fff',
}

const dotStyle: CSSProperties = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  height: '0.2rem',
  width: '0.2rem',
  margin: '-0.1rem 0 0 -0.1rem',
  background: '#fff',
  visibility: 'hidden',
  borderRadius: '50%',
  // make sure pointer events only run on the parent
  pointerEvents: 'none',
}

const dotStyleWhileActive: CSSProperties = {
  visibility: 'visible',
}

const labelStyle: CSSProperties = {
  color: 'white',
  fontSize: '0.7rem',
  fontWeight: 600,
  lineHeight: '1',
}

const labelStyleWhileActive: CSSProperties = {
  visibility: 'hidden',
}

const round = (num: number) => Math.round(num * 100) / 100

export interface HotspotTooltipProps<HotspotFields = {[key: string]: unknown}> {
  value: HotspotItem<HotspotFields>
  schemaType: ObjectSchemaType
  renderPreview: RenderPreviewCallback
}

interface HotspotProps<HotspotFields = {[key: string]: unknown}> {
  value: HotspotItem
  bounds: DOMRectReadOnly
  update: FnHotspotMove
  hotspotDescriptionPath?: string
  tooltip?: ComponentType<HotspotTooltipProps<HotspotFields>>
  index: number
  schemaType: ObjectSchemaType
  renderPreview: RenderPreviewCallback
}

export default function Spot({
  value,
  bounds,
  update,
  hotspotDescriptionPath,
  tooltip,
  index,
  schemaType,
  renderPreview,
}: HotspotProps): ReactNode {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // x/y are stored as % but need to be converted to px
  const x = useMotionValue(round(bounds.width * (value.x / 100)))
  const y = useMotionValue(round(bounds.height * (value.y / 100)))

  /**
   * update x/y if the bounds change when resizing the window
   */
  useEffect(() => {
    x.set(round(bounds.width * (value.x / 100)))
    y.set(round(bounds.height * (value.y / 100)))
  }, [x, y, value, bounds])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)

    // get current values for x/y in px
    const currentX = x.get()
    const currentY = y.get()

    // Which we need to convert back to `%` to patch the document
    const newX = round((currentX * 100) / bounds.width)
    const newY = round((currentY * 100) / bounds.height)

    // Don't go below 0 or above 100
    const safeX = Math.max(0, Math.min(100, newX))
    const safeY = Math.max(0, Math.min(100, newY))

    update(value._key, safeX, safeY)
  }, [x, y, value, update, bounds])
  const handleDragStart = useCallback(() => setIsDragging(true), [])

  const handleHoverStart = useCallback(() => setIsHovering(true), [])
  const handleHoverEnd = useCallback(() => setIsHovering(false), [])

  if (!x || !y) {
    return null
  }

  return (
    <motion.div
      drag
      dragConstraints={bounds}
      dragElastic={0}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{
        ...dragStyle,
        x,
        y,
        ...(isDragging && {...dragStyleWhileDrag}),
        ...(isHovering && {...dragStyleWhileHover}),
      }}
    >
      <Tooltip
        key={value._key}
        disabled={isDragging}
        portal
        content={
          tooltip && typeof tooltip === 'function' ? (
            createElement(tooltip, {value, renderPreview, schemaType})
          ) : (
            <Box padding={2} style={{maxWidth: 200, pointerEvents: `none`}}>
              <Text textOverflow="ellipsis">
                {hotspotDescriptionPath
                  ? (get(value, hotspotDescriptionPath) as string)
                  : `${value.x}% x ${value.y}%`}
              </Text>
            </Box>
          )
        }
      >
        <div>
          {/* Dot */}
          <Box
            style={{
              ...dotStyle,
              ...((isDragging || isHovering) && {...dotStyleWhileActive}),
            }}
          />
          {/* Label */}
          <div
            style={{
              ...labelStyle,
              ...((isDragging || isHovering) && {...labelStyleWhileActive}),
            }}
          >
            {index + 1}
          </div>
        </div>
      </Tooltip>
    </motion.div>
  )
}
