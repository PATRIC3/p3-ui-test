# p3-ui-test

End-to-end test harness for the PATRIC UI, built on [Puppeteer](https://github.com/GoogleChrome/puppeteer) and [Jest](https://jestjs.io/]).


## Installation

Requires [node.js](https://nodejs.org) v8.11.4+


Clone, then:

```
npm install
```


## Usage

#### Shortcuts


```
npm test              // run UI end-2-end tests
npm run test-perf     // run UI page performance tests
npm run test-health   // run service-level health pings
```

See `./results/` for output


## Overview

The test harness consists of 4 parts: tests, reporters, aggregators and mailers.

**Tests** are implemented using Jest.
- `jest.setup.js` config for service health
- `jest.ui.setup.js` config for UI end-2-end tests
- `jest.ui.perf.setup.js` config for UI page load performance

**Reporters** are implemented using Jest's [reporters](https://jestjs.io/docs/en/configuration#reporters-arraymodulename--modulename-options).
- `reporter.config.js` config for output paths and more
- `reporters/reporter.js` simply writes full output, or a more condensed format for things like a service health.

**Aggregators** are stop-gap scripts that can aggregate files into condensed, readily available data, such as a calendar of stats.

- `aggregators/`

**Mailers** are scripts that send mail on failed and all-clear events.

- `mailers/health-mailer.js` mail config for health events
- `mailers/mailer.js` contains the transporter/config for mailing
- from/to mail-list file paths and more can be configured in `report.config.js`


There are also <b>pollers</b>, which are simple scripts that that poll for data and currently write logs to a single file.



## Author(s)

[nconrad](https://github.com/nconrad)


