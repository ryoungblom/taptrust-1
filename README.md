# Taptrust API

For development:

1. Set `DATABASE_URL` to your postgres development database. ([ElephantSQL](https://www.elephantsql.com/) has a sandbox postgres option if you don't want to run it locally).
2. `npm install` to install dependencies.
3. Run `sequelize db:migrate`.
4. Initialize dev server with `npm run start:dev`, which starts at localhost:8000.

Frontend:

The frontend is in the `view` folder. `cd view` and run `npm install` and `npm start`. (Frontend has it's own package.json.)

Then, using [Postman](https://www.getpostman.com/), you can `GET, POST, PUT, DELETE` at these routes:

POST:

* `/api/tokens` to create a new Token
* `/api/tokens/:tokenId/reviews` to create a new review for a token (:tokenId is the id of the token you want to add a review of)

GET:

* `/api/tokens` to GET all tokens and their reviews
* `/api/tokens/:name` to GET a specific coin, and it's reviews (Will add separate GET for `api/tokens/:tokenId` if needed)
* `/api/tokens/:tokenId/review` to GET all of a specific token's reviews
* `/api/reviews/:reviewId` to GET a specific review

PUT:

* `/api/tokens/:tokenId` to update a specific coin
* `/api/reviews/:reviewId` to update a specific review

DELETE:

* `/api/tokens/:tokenId` to delete a coin
* `/api/tokens/:tokenId/reviews/:reviewId` to delete a review

As of first commit, parameters for Tokens are:

* name
* category
* description
* symbol
* website
* founders

(all scores automatically entered once a review for the coin is entered)

* score_overall
* score_transparency
* score_governance
* score_legal
* score_functionality

NOTE: Token's score attributes are supposed to update each time a new review is created as the average. Currently, each attribute updates with the scores of the latest reviews. Code to fix this is in progress.

Parameters for Reviews are:

* name
* review
* url
* score_overall (entered automatically)
* score_transparency
* score_governance
* score_legal
* score_functionality

NOTE: score_overall is an average of the other scores.