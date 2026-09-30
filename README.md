# 5D Storage website preview

Website content lives in `public/`. `server.mjs` requires HTTP Basic authentication for every request, including images and scripts. It refuses to start without a password of at least 16 characters. There are no third-party server dependencies.

## Render setup

Deploy this directory from a separate private GitHub repository as a **Web Service**, using the **Free** instance type. Use `npm test` for the build command and `npm start` for the start command. Set `PREVIEW_USERNAME` and a unique, randomly generated `PREVIEW_PASSWORD` directly in Render's environment settings. Never commit the real password. Render sets `PORT` automatically.

Keep the existing Under Construction service attached to `5dstorage.ph` during prelaunch. Access this preview through its HTTPS `onrender.com` address. Do not enter real credentials over unencrypted HTTP. Browser Basic authentication can retain credentials until the browser session is closed; use a private browsing window for shared-device reviews.

This server deliberately keeps password protection mandatory. Launch requires a reviewed change to remove the preview gate. The current contact configuration still has placeholder address and map values in `public/site-config.js`.
