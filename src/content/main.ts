import { handleNotesHomePage } from "@/app";

// const observer = new MutationObserver((_, obs) => {

//   // const iframes = document.querySelectorAll("iframe");
//   // console.log(iframes.length)
//   // if (iframes.length === 5) {
//   //   handleNotesHomePage();
//   //   obs.disconnect();
//   // }
// });

// observer.observe(document.body, { childList: true, subtree: true });

setTimeout(() => {
  handleNotesHomePage();
}, 2000);
