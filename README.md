# sanity-plugin-hotspot-array

>This is a **Sanity Studio v3** plugin.
> For the v2 version, please refer to the [v2-branch](https://github.com/sanity-io/sanity-plugin-hotspot-array/tree/studio-v2).

## What is it?

A configurable Custom Input for Arrays that will add and update items by clicking on an Image

<img src="https://user-images.githubusercontent.com/209129/174171697-57319ebc-03a7-4d82-a73e-b6effcb0b3ba.gif" width="600" />

## Installation

```
npm install --save sanity-plugin-hotspot-array
```

or

```
yarn add sanity-plugin-hotspot-array
```


## Usage

Add it as a plugin in sanity.config.ts (or .js):

```js
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";

export default defineConfig({
  // ...
  plugins: [
    imageHotspotArrayPlugin(),
  ] 
})
```

Now you will have `imageHotspot` available as an options on `array` fields:

```js
import {defineType, defineField} from 'sanity'

export const productSchema = defineType({
  name: `product`,
  title: `Product`,
  type: `document`,
  fields: [
    defineField({
      name: `hotspots`,
      type: `array`,
      of: [
        // see `Spot object` setup below
      ],
      options: {
        // plugin adds support for this option
        imageHotspot: {
          // see `Image and description path` setup below
          imagePath: `featureImage`,
          descriptionPath: `details`,
          // see `Custom tooltip` setup below
          tooltip: undefined,
        }
      },
    }),
    // ...all your other fields
    // ...of which one should be featureImage in this example
  ],
})
```
There is no need to provide an explicit input component, as that is handled by the plugin.

The plugin makes a number of assumptions to add and update data in the array. Including:

- The `array` field is an array of objects, with a single object type
- The object contains two number fields named `x` and `y`
- You'll want to save those values as % from the top left of the image
- The same document contains the image you want to add hotspots to

### Image path

The custom input has the current values of all fields in the document, and so can "pick" the image out of the document by its path.

For example, if you want to add hotspots to an image, and that image is uploaded to the field `featuredImage`, your fields `options` would look like:

```js
options: {
  imageHotspot: {
    imagePath: `featureImage`
  }
}
```

To pick the image out of the hotspot-array parent object, use
```js
options: {
  imageHotspot: {
    pathRoot: 'parent'
  }
}
```

### Description path

The custom input can also pre-fill a string or text field with a description of the position of the spot to make them easier to identify.
Add a path **relative to the spot object** for this field.

```js
options: {
  imageHotspot: {
    descriptionPath: `details`
  }
}
```

### Spot object

Here's an example object schema complete with initial values, validation, fieldsets and a styled preview.

```js
defineField({
  name: 'spot',
  type: 'object',
  fieldsets: [{name: 'position', options: {columns: 2}}],
  fields: [
    {name: 'details', type: 'text', rows: 2},
    {
      name: 'x',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    },
    {
      name: 'y',
      type: 'number',
      readOnly: true,
      fieldset: 'position',
      initialValue: 50,
      validation: (Rule) => Rule.required().min(0).max(100),
    },
  ],
  preview: {
    select: {
      title: 'details',
      x: 'x',
      y: 'y',
    },
    prepare({title, x, y}) {
      return {
        title,
        subtitle: x && y ? `${x}% x ${y}%` : `No position set`,
      }
    },
  },
})
```

## Custom tooltip

You can customise the Tooltip to display any Component, which will receive `value` (the hotspot value with x and y),
`schemaType` (schemaType of the hotspot value), and `renderPreview` (callback for rendering Studio preview).

### Example 1 - use default hotspot preview

```tsx
import { Box } from "@sanity/ui";
import { HotspotTooltipProps } from "sanity-plugin-hotspot-array";

export function HotspotPreview({
  value,
  schemaType,
  renderPreview,
}: HotspotTooltipProps) {
  return (
    <Box padding={2} style={{ minWidth: 200 }}>
      {renderPreview({
        value,
        schemaType,
        layout: "default",
      })}
    </Box>
  );
}
```

Then back in your schema definition

```js
options: {
  imageHotspot: {
    tooltip: HotspotPreview
  }
}
```

### Example 2 - reference value in hotspot
In this example our `value` object has a `reference` field to the `product` schema type, and will show a document preview.

```jsx
import {useSchema }from 'sanity'
import {Box} from '@sanity/ui'

export function ProductPreview({value, renderPreview}) {
  const productSchemaType = useSchema().get('product')
  return (
    <Box padding={2} style={{minWidth: 200}}>
      {value?.product?._ref ? (
        renderPreview({
           value,
           schemaType: productSchemaType,
           layout: "default"
        })
      ) : (
        `No reference selected`
      )}
    </Box>
  )
}
```

Then back in your schema definition

```js
options: {
  imageHotspot: {
    tooltip: ProductPreview
  }
}
```

## License

MIT-licensed. See LICENSE.

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/sanity-io/sanity-plugin-hotspot-array/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
