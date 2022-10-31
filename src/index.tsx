import {ImageHotspotArray, type HotspotItem} from './ImageHotspotArray'
import React, {ComponentType} from 'react'
import {ArrayOfObjectsInputProps, createPlugin} from 'sanity'
import {type HotspotTooltipProps} from './Spot'

export interface ImageHotspotOptions<HotspotFields = {[key: string]: unknown}> {
  pathRoot?: 'document' | 'parent'
  imagePath: string
  descriptionPath?: string
  tooltip?: ComponentType<HotspotTooltipProps<HotspotFields>>
}

declare module '@sanity/types' {
  export interface ArrayOptions {
    imageHotspot?: ImageHotspotOptions
  }
}

export {ImageHotspotArray}
export type {HotspotTooltipProps, HotspotItem}

export const imageHotspotArrayPlugin = createPlugin({
  name: 'image-hotspot-array',
  form: {
    components: {
      input: (props) => {
        if (props.schemaType.jsonType === 'array' && props.schemaType.options?.imageHotspot) {
          const imageHotspotOptions = props.schemaType.options?.imageHotspot
          if (imageHotspotOptions) {
            return (
              <ImageHotspotArray
                {...(props as unknown as ArrayOfObjectsInputProps<HotspotItem>)}
                imageHotspotOptions={imageHotspotOptions}
              />
            )
          }
        }
        return props.renderDefault(props)
      },
    },
  },
})
