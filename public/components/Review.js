import { cacheKeys } from '../constants.js';
import Observer from '../lib/Observer.js';

class Review extends Observer {
    constructor( state = {} ) {
        super( state );
        this.appState = state;
        this.bindEvents();
    }

    createMarkup ( state ) {
        const { reviews } = state;
        return `
            <div class="reviews">
                <h3>Reviews</h3>
                <a id="review-modal-link" class="review-tagline" href="#review-modal" rel="modal:open">Write a review on this product</a>
                ${reviews.map( ( review, index ) => {
                    const { comment, date, name, rating, title } = review;
                    return `
                        <div class="user-review">
                            <div class="image-container">
                                <img src="./assets/images/${index <= 1 ? `reviewer${index+1}` : 'anonymous'}.png">
                                <div class="name">${name}</div>
                            </div>
                            <div class="comment">
                                <h4>${title}</h4>
                                <span class="date">${date}</span>
                                <span class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    ${rating} star
                                </span>
                                <p>${comment}</p>
                            </div>
                        </div>
                    `
                }).join( "\n" )}
            </div>
        `;
    }

    render ( state, selector ) {
        console.log( 'Review - render: ', state, selector );
        const markup = this.createMarkup( state );
        const parent = document.getElementById( selector );

        parent.innerHTML = markup;
    }

    bindEvents ( state ) {
        const reviewModalButton = document.getElementById( 'submit-review' );

        reviewModalButton.addEventListener( 'click', event => {
            event.preventDefault();

            const body = document.body;
            const title = document.getElementById( 'review-title' );
            const comment = document.getElementById( 'review-comment' );
            const reviewModal = document.getElementsByClassName( 'jquery-modal blocker current' )[0];
            const currentDate = new Date();
            const date = `${currentDate.getMonth()}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
            const userReview = {
                comment: comment.value,
                date,
                name: 'Anonymous',
                title: title.value
            };

            const state = this.appState.get();

            const reviews = [
                ...state.reviews,
                userReview
            ];

            // Save to browser session
            const sessionStorage = window.sessionStorage;
            const cachedReviews = sessionStorage.getItem( cacheKeys.PRODUCT_REVIEWS );
            console.log('Review - binder', cachedReviews, userReview)
            if ( cachedReviews == null ) {
                const cachedUserReview = JSON.stringify( [userReview] );
                sessionStorage.setItem( cacheKeys.PRODUCT_REVIEWS, cachedUserReview );
            } else {
                const parsedCachedReviews = JSON.parse( cachedReviews );
                const mergedReviews = [...parsedCachedReviews, userReview];
                sessionStorage.setItem( cacheKeys.PRODUCT_REVIEWS, JSON.stringify( mergedReviews ) );
            }

            // Clear form values
            title.value = '';
            comment.value = '';

            this.appState.update( {
                ...state,
                reviews
            } );

            // Close modal
            body.style.overflow = 'unset';
            reviewModal.style.display = 'none';

            console.log( 'Review - bindEvent:', userReview, this.appState.get() );
        } );

        // Add event for rating ( review-rating )
    }

    update ( state ) {
        this.render( state, "reviews-section-container" );
    }
}

export default Review;

