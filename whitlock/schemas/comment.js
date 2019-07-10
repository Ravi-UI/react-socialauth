export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'firstName',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'commentedBy',
            title: 'Commented by',
            type: 'string'
        },
        {
            name: 'comment',
            title: 'Comment',
            type: 'text'
        },
        {
            name: 'postId',
            title: 'Post Id',
            type: 'string'
        },
        {
            name: 'noOfLikes',
            title: 'Likes',
            type: 'number',
        },
        {
            name: 'shares',
            title: 'Shares',
            type: 'number',
        },
        {
            name: 'publish',
            title: 'Publish',
            type: 'string',
        },
    ],
}