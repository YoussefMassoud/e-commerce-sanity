export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Product',
    },
    {
      name: 'price',
      type: 'string',
      title: 'Price of Product',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description of product',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'sale',
      type: 'object',
      title: 'Sale',
      fields: [
        {
          name: 'on',
          type: 'boolean',
          title: 'On Sale',
        },
        {
          name: 'from',
          type: 'string',
          title: 'Sale From',
        },
        {
          name: 'to',
          type: 'string',
          title: 'Sale To',
        },
        {
          name: 'saved',
          type: 'string',
          title: 'Saved Amount',
        },
      ],
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date',
      options: {
        defaultValue: new Date().toISOString().split('T')[0], // Sets the default value to today's date in YYYY-MM-DD format
      },
    },
  ],
}
