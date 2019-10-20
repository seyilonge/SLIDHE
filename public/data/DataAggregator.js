import { cacheKeys } from '../constants.js';

/**
 * @typedef Review
 * @type {Object}
 * @property {string} comment
 * @property {date} date
 * @property {string} name
 * @property {number} rating
 * @property {string} title
 */


/**
 * Returns default predefined reviews
 *
 * @returns {Array.<Review>} reviews - An array of objects of reviews
 */
const getDefaultReviewData = () => {
    return [
        {
            "comment": "I picked up this jacket for use in San Francisco and the surrounding Bat Area (Lake Tahoe included). I use this jacket for everything. It is often cloudy/drizzly/cold in SF and this jacket deals with it all. I have not tried in heavy rain, but in drizzly conditions, the DWR treatment definitely makes small drops bead right off. It also has a nice",
            "date": "08/20/2013",
            "name": "Shaun White",
            "rating": 5,
            "title": "This thing is a monster!"
        },
        {
            "comment": "Loved this jacket so much from previous years I decided to buy a second in a different color. I'm tall and fairly slender and it's tailored silhouette fits me nicely. For perspective I'm around 6'3&#34; -150lbs, and a large does the trick. I'll wear this for all of fall and into the winter. Despite not being bulky or buggy I find it good and warm for anything down to 40 degrees and perhaps lower if you're keeping up on your layering. For weather at freezing or below you should consider something heavier.",
            "date": "01/12/2013",
            "name": "Jennie Lauren",
            "rating": 3,
            "title": "Luv it so much bought 2!"
        }
    ];
};

/**
 * Retrieves reviews saved to browser session storage if any
 *
 * @returns {Array.<Review>} reviews - An array of objects of reviews
 */
const getReviewDataFromCache = () => {
    const sessionStorage = window.sessionStorage;
    const cachedReviewData = sessionStorage.getItem( cacheKeys.PRODUCT_REVIEWS );
    return cachedReviewData != null ? JSON.parse( cachedReviewData ) : [];
};

export function DataAggregator() {
    return {
        reviews: [
            ...getDefaultReviewData(),
            ...getReviewDataFromCache()
        ]
    };
};
