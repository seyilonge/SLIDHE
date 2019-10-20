import { DataAggregator } from '../../data/DataAggregator.js';
import Review from '../../../components/Review.js';
import State from '../../../lib/State.js';

const reviews = DataAggregator().reviews;

// Instantiate
const AppState = new State();
const reviewList = new Review( AppState );

// Hydrate state with initial reviews
AppState.update({ reviews });

// Add the observers. These objects will re-render when state changes.
AppState.addObserver( reviewList );

// On load, perform initial render..
reviewList.render( AppState.get(), 'reviews-section-container' );
