# sanity-plugin-hotspot-array

> This is a **Sanity Studio v2** plugin. 
> For the v3 version, please refer to the [v3-branch](https://github.com/sanity-io/sanity-plugin-hotspot-array).

A configurable Custom Input for Arrays that will add and update items by clicking on an Image

<img src="https://user-images.githubusercontent.com/209129/174171697-57319ebc-03a7-4d82-a73e-b6effcb0b3ba.gif" width="600" />

## Installation

```sh
yarn add sanity-plugin-hotspot-array@studio-v2
```

Next, add `"hotspot-array"` to `sanity.json` plugins array:
```json
"plugins": [
  "hotspot-array"
]
```

## Setup

Import the `HotspotArray` component from this package, into your schema. And insert it as the `inputComponent` of an `array` field.

```js
import HotspotArray from 'sanity-plugin-hotspot-array'

export default {
  name: `product`,
  title: `Product`,
  type: `document`,
  fields: [
    {
      name: `hotspots`,
      type: `array`,
      inputComponent: HotspotArray,
      of: [
        // see `Spot object` setup below
      ],
      options: {
        // see `Image and description paths` setup below
        imageHotspotPathRoot: `document`,
        hotspotImagePath: `featureImage`,
        hotspotDescriptionPath: `details`,
        // see `Custom tooltip` setup below
        hotspotTooltip: undefined,
      },
    },
    // ...all your other fields
  ],
}
```

The plugin makes a number of assumptions to add and update data in the array. Including:

- The `array` field is an array of objects
- The object contains two number fields named `x` and `y`
- You'll want to save those values as % from the top left of the image
- The same document contains the image you want to add hotspots to

### Image and description paths

The custom input has the current values of all fields in the document by default, and so can "pick" the image out of the document by its path.

For example, if you want to add hotspots to an image, and that image is uploaded to the document field of `featuredImage`, your fields `options` would look like:

```js
options: {
  hotspotImagePath: `featureImage`
}
```

Alternatively, you may supply 'parent' to the `imageHotspotPathRoot` option to pick from the parent object instead. Using 'parent' as `imageHotspotPathRoot` in favor of the default 'document' may be required, e.g. if your schema of hotspots array is defined as a child of another array, and therefore you can not reference dynamically the correct field in a 'document' specified by `hotspotImagePath`.

In this case, if the image is uploaded to the parent object field of `featuredImage`, your fields `options` would look like:

```js
options: {
  imageHotspotPathRoot: `parent`,
  hotspotImagePath: `featureImage`
}
```

The custom input can also pre-fill a string or text field with a description of the position of the spot to make them easier to identify. Add a path **relative to the spot object** for this field.

```js
options: {
  hotspotDescriptionPath: `details`
}
```

### Spot object

Here's an example object schema complete with initial values, validation, fieldsets and a styled preview.

```js
{
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
}
```

## Custom tooltip

You can customise the Tooltip to display any Component, it will accept a single prop `spot` which contains the values of the object.

In this example our `spot` object has a `reference` field to the `product` schema type, and will show a Document Preview.

```js
// Setup a custom tooltip component
import Preview from 'part:@sanity/base/preview'
import schema from 'part:@sanity/base/schema'
import {Box} from '@sanity/ui'

export default function ProductPreview({spot}) {
  return (
    <Box padding={2} style={{minWidth: 200}}>
      {spot?.product?._ref ? (
        <Preview value={{_id: spot.product._ref}} type={schema.get(`product`)} />
      ) : (
        `No Reference Selected`
      )}
    </Box>
  )
}
```

Then back in your schema definition

```js
import HotspotArray from 'sanity-plugin-hotspot-array'
import ProductPreview from '../../components/ProductPreview'

options: {
 hotspotImagePath: `hotspotImage`,
 hotspotTooltip: ProductPreview,
},
```

## License

MIT ©
See LICENSE
