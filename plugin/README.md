## Webpack flat bundle

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
import { globEntries, preventEmitPlugin } from 'webpack-flat-bundle'
```

##### Add following to your config
```
{
  entries: globEntries(['./js/src/*.js', './sass/*.scss'])
}
```  
How it works?

* Helper method construct webpack entry object out of files that are matched by glob pattern.

By default this search tree and construct output directly from file names.
If you want to make nested output tree you can override this behaviour by adding parameter to config object.

```
{
  entries: globEntries(['./js/src/*.js', './sass/*.scss'], { nestingLevel: 2 })
}
```

This will result in nested output tree.


```
{
  plugins: [
    new preventEmitPlugin(globEntries(['./sass/*.scss']))
  ]
}
```

How it works?

* Default behaviour of webpack is to make one output point from one entry point, but in case of CSS this is not welcomed, as plugins such as ExtractTextPlugin will make another output point leaving initial entry with empty file. This behavior is being overriden by preventEmitPlugin that will stop webpack from emitting files that match given glob pattern.


### Additional Configuration

By default globEntires search input tree and construct outputs directly from file names.
If you want to make nested output tree you can override this behaviour by adding parameter to config object.

```
{
  entries: globEntries(['./js/src/*.js', './sass/*.scss'], { nestingLevel: 2 })
}
```

This will make output paths consist of file name and folder in which each file in placed.