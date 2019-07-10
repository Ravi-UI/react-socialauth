const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: 'mdtd9fbj',
    dataset: 'production',
    token:'skehKvmkxfRYjtGx0oF1wk8IUde5x3PoPzYzuzAEuAXAtfo2ynZosXaD6hfGs1m6dgJXr60zSL3nAILrNhNBbzJp3d7qiFGxGDQkrWErBt04Qb89mEPgOjEikD8QIVvE29nyBvwIcIIzKhpmqsyMIyTmdqR4P1Kovxf5K35uMDryxGarYf4f',
    useCdn: true,
    watchMode: true,
    overlayDrafts: true
});
export default client;