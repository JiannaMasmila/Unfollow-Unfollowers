# Unfollow-Unfollowers

A static web page that checks which accounts a public Instagram profile follows that do not follow back. It can be hosted on [GitHub Pages](https://pages.github.com/) for anyone to use online.

## Usage

1. Open the site (for local testing run `python -m http.server` and visit `http://localhost:8000`).
2. Enter a public Instagram profile link or username.
3. The page lists accounts that the profile follows but who don't follow back.

The scraper relies on public Instagram endpoints and may stop working if Instagram changes their interface or rate limits requests. If the page shows an error message, the profile may be private or Instagram may have blocked the request.

## Deploying to GitHub Pages

1. Commit your changes to the `main` branch.
2. In the repository settings, enable GitHub Pages and select `main` as the source.
3. Your site will be available at `https://<username>.github.io/Unfollow-Unfollowers/`.
