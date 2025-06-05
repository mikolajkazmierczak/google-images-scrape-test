# Google Images Scrape Test

This project is for educational purposes only, as it was used for a course on machine learning.

It's a simple script with definable set of queries and corresponding quantites of how many resulting images to scrape from Google Images.

# Running

## Scraping

Configure variables in `scrape.js`:
- `path` is the images output folder,
- `scrapes` is a list of tuples of the query and the amount to download.

`npm run scrape`

## Resizing

**Note:** You need [imagemagick](https://imagemagick.org/script/download.php) installed for resizing!

Configure variable `width` in `resize.js` to the amount of pixels.

`npm run resize`
