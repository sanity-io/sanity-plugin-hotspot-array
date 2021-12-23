import HotspotArray from "./HotspotArray"

export default {
  name: "hotspots",
  type: "array",
  inputComponent: HotspotArray,
  of: [
    {
      name: 'spot',
      type: 'object',
      fieldsets: [{name: 'position', options: {columns: 2}}],
      fields: [
        {
          name: 'x',
          type: 'number',
          readOnly: true,
          fieldset: 'position',
          initialValue: 50,
          validation: (Rule) => Rule.required().min(0).max(100).precision(2),
        },
        {
          name: 'y',
          type: 'number',
          readOnly: true,
          fieldset: 'position',
          initialValue: 50,
          validation: (Rule) => Rule.required().min(0).max(100).precision(2),
        },
      ],
      preview: {
        select: {
          title: 'description',
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
  ]
}