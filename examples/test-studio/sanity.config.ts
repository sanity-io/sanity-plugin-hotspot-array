import {defineConfig, defineField, defineType} from 'sanity'
import {structureTool} from 'sanity/structure'

import {imageHotspotArrayPlugin} from '../../dist/index.mjs'

export default defineConfig({
  name: 'default',
  title: 'Test Studio',
  projectId: 'ppsg7ml5',
  dataset: 'test',
  plugins: [structureTool(), imageHotspotArrayPlugin()],
  schema: {
    types: [
      defineField({
        name: 'hotspot',
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
      }),
      defineType({
        name: 'hotspotArrayTest',
        type: 'document',
        fields: [
          defineField({name: 'title', type: 'string'}),
          defineField({name: 'featureImage', type: 'image'}),
          defineField({
            name: 'hotspots',
            type: 'array',
            of: [{type: 'hotspot'}],
            options: {
              imageHotspot: {
                imagePath: 'featureImage',
                descriptionPath: 'details',
              },
            },
          }),
        ],
      }),
    ],
  },
})
