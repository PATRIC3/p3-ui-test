# p3-ui-test

End-to-end test harness for the PATRIC UI, built on [Puppeteer](https://github.com/GoogleChrome/puppeteer) and [Jest](https://jestjs.io/]).


## Installation

Requires [node.js](https://nodejs.org) v8.11.4+


Clone, then:

```
npm install
```


## Usage

To run tests and produce a report at the command line:

```
npm test
```

An HTML report is made available at `./report.html`.


## Config Notes

The configuration file for basic tests is `./jest.config.js`.

The configuration file for puppeteer tests is `./jest.ui.config.js`.


## Author(s)

[nconrad](https://github.com/nconrad)


