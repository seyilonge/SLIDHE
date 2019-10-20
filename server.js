const express = require( 'express' );
const app = express();
const port = 3000;

app.use( express.static( 'components' ) );
app.use( express.static( 'lib' ) );
app.use( express.static( 'public' ) );


app.listen( port, () => console.log( `Axium app listening on port ${port}...` ) );
