// Runs in <head> before first paint. Kept out of any "use client" module so
// the root layout can inline it.
// Light mode only for now: night tokens stay in globals.css for later.
// Marks the chat intro as seen for this session so it never flashes.

export const themeScript = `(function(){try{if(sessionStorage.getItem("400-intro"))document.documentElement.setAttribute("data-intro","seen")}catch(e){}})()`;
