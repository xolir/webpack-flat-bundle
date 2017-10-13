## Webpack flat bundle

[![npm version](https://badge.fury.io/js/webpack-flat-bundle.svg)](https://badge.fury.io/js/webpack-flat-bundle)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/xolir/webpack-flat-bundle.svg?branch=master)](https://travis-ci.org/xolir/webpack-flat-bundle)
[![codecov](https://codecov.io/gh/xolir/webpack-flat-bundle/branch/master/graph/badge.svg)](https://codecov.io/gh/xolir/webpack-flat-bundle)

### Idea
Webpack being developed for SPA / application bundles is missing easy method to use it for big projects that are composed of multiple unrelated applications. Although you can use glob entries out of the box, you cannot create multiple output bundles using this pattern.

This project solves two dillemas.
* How to make independent sass/css files being transformed by webpack.
* How to point webpack compilation at multiple-unrelated entry points.

### Installation

```
yarn add webpack-flat-bundle
npm install webpack-flat-bundle
```

### Usage

##### Import plugin and helper method.
```
const { globEntries, preventEmitPlugin } = require('webpack-flat-bundle');

```

##### Add following to your config
```
{
  entries: globEntries(['./js/src/*.js'], { relativeRoot: './js/src' })
}
```  
How it works?

* Helper method construct webpack entry object out of files that are matched by glob pattern.

By default this search tree and construct nested output tree, matching pattern provided.

```
{
  plugins: [
    new preventEmitPlugin(globEntries(['./sass/*.scss'], { relativeRoot: './sass/'}))
  ]
}
```

How it works?

* Default behaviour of webpack is to make one output point from one entry point, but in case of CSS this is not welcomed, as plugins such as ExtractTextPlugin will make another output point leaving initial entry with empty file. This behavior is being overriden by preventEmitPlugin that will stop webpack from emitting files that match given glob pattern.
