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
npm run test-perf     // run performance/pageload tests
npm run test-health   // run service-level heealth pings
```

See `./results/` for output


## Overview

The test harness consists of 3 parts: tests, reporters, and aggregators.

<b>Tests</b> are are implemented using Jest.  The config files of interest are:
- `./jest.setup.js` config for service health
- `./jest.ui.setup.js` config for UI end-2-end tests
- `./jest.ui.perf.setup.js` config for UI page load performance

<b>Reporters</b> are implemented using Jest's [reporters](https://jestjs.io/docs/en/configuration#reporters-arraymodulename--modulename-options).  Files of interest are:
- `./reporter.config.js` config for output paths and more
- `./reporters/reporter.js` simply writes full output, or a more condensed format for things like a service health.


<b>Aggregators</b> are stop-gap scripts that can aggregate files into condensed, readily available data, such as a calendar of stats.

- `./reporters/aggregators/`


There are also <b>pollers</b>, which are simple scripts that that poll for data and currently write logs to a single file.



## Author(s)

[nconrad](https://github.com/nconrad)


