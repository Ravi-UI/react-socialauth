// import React, { Fragment } from 'react'
// import { buildUrl } from 'react-instafeed'

// // 🔥️ These are in your code (not this repo)
// import useAbortableFetch from '@hooks/useAbortableFetch'
// import Image from '@components/Image'

// const Instagram = () => {
//   const { json, loading, error, abort } = useAbortableFetch(buildUrl(options))
//   if (loading) return 'Loading...'
//   if (error) return `Error: ${error}`
//   if (!json) return null

//   const { data, meta, pagination } = json

//   return (
//     <Fragment>
//       {// eslint-disable-next-line no-unused-vars
//       data &&
//         data.map(({ caption, id, images, tags }, index) => {
//           const image = images[options.resolution]
//           return (
//               <Image
//                 key={index}
//                 url={image.url}
//                 title={caption.text}
//                 caption={caption.text}
//                 width={image.width}
//                 height={image.height}
//               />
//             </div>
//           )
//         })}
//     </Fragment>
//   )
// }