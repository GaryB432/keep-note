// import { handleNotesHomePage } from "@/app";

import { handleNotesHomePage } from "@/app";

let count = -1;

// const observer = new MutationObserver((_, obs) => {

//   // const iframes = document.querySelectorAll("iframe");
//   // console.log(iframes.length)
//   // if (iframes.length === 5) {
//   //   handleNotesHomePage();
//   //   obs.disconnect();
//   // }
// });

// observer.observe(document.body, { childList: true, subtree: true });

setInterval(() => {
  const c = handleNotesHomePage();

}, 5000);
