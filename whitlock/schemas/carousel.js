export default {
    name: 'carousel',
    title: 'Carousel Images',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'priority',
            title: 'Priority',
            type: 'number'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }
    ],
    orderings: [
        {
            title: 'Release Date, New',
            name: 'orderedCarousels',
            by: [
                { field: 'priority', direction: 'asc' }
            ]
        }
    ]
}
