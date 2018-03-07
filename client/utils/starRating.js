import React from 'react'

export function displayStarRating(rating) {
  const ratingValue = Number(rating)
  let starArray = []

  for (let i = 1; i <= 5; i++) {
    if (i <= ratingValue) {
      starArray.push(<i id={`star-${i}`} className="material-icons yellow-text half" key={i}>star</i>)
    }
    // else {
    //   starArray.push(<i id={`star-${i}`} className="material-icons" key={i}>star_border</i>)
    // }
  }

  return starArray
}

// export function starRatingButtons(rating) {
//   const ratingValue = Number(rating)
//   let starArray = []

//   for (let i = 1; i <= 5; i++) {
//     if (i <= ratingValue) {
//       starArray.push(
//         <button id={`star-${i}`} type="button" key={i} className="btn btn-default btn-grey btn-xs">
//         <span className="material-icons yellow-text half" >star_border</span>
//       </button>
//       )
//     }
//     else {
//       starArray.push(
//         <button id={`star-${i}`} type="button" key={i} className="btn btn-warning btn-xs">
//         <span className="material-icons yellow-text half" >star</span>
//         </button>
//       )
//     }
//   }
//   return starArray
// }
