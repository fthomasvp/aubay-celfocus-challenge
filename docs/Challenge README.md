# Frontend Project

This is an assessment project, its composed of a demo api and a demo website. With the demo api you should build a react version of the demo website to the best of your ability.

The website you have to build is simple:

in `/` the user should see the company list

![Companies](companies.png "Companies")

*clicking on a company should navigate to `/company/:companyId`*

in `/company/:companyId` the user should see a table of numbers that belong to that company

![Local Public Office](companynums.png "Local Public Office")

*clicking on a number should navigate to `/number/:numberId`*

in `/number/:numberId` the user should see the number details

![351910000000](num.png "351910000000")

in both `/number/:numberId` and `/companies/:companyId` there should be a `Go Back` button that goes to the previous page

We have provided no tooling for react so you can chose your own, don't forget to document the necessary steps to run, build and test your app.

# Prerequisites
Install [node.js](https://nodejs.org/en/) which includes [npm](https://npmjs.com)

## Running

1. Run `npm run static` to start the [demo](#demo)
1. Run `npm run api` to start the [API](#api)

## Demo

This project uses [http-server](https://www.npmjs.com/package/http-server) to serve the static demo website, the website is located in `/static-demo`.

```bash
npm run static
```

You should then have the demo website running in `http://localhost:8080`

## API

The REST API is based on [json-server](https://www.npmjs.com/package/), and the data is defined in [db.json](../data/db.json) file. To start it simply run:

```bash
npm run api
```

You should then have the API running in http://localhost:3000.
