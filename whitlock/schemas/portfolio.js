export default {
    name: 'portfolio',
    title: 'PortFolio',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string'
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'profileImage',
            title: 'Main image',
            type: 'image'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'portfolioImages',
            title: 'Portfolio Images',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'portfolioImages' } }]
        },
        {
            name: 'priority',
            title: 'Priority',
            type: 'number'
        },
    ],
    orderings: [
        {
            title: 'Release Date, New',
            name: 'orderedCarousels',
            by: [
                { field: 'priority', direction: 'asc' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            author: 'title',
            media: 'mainImage'
        },
        prepare(selection) {
            const { author } = selection
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`
            })
        }
    }
}