## Webpack flat bundle

### Idea

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

```
  entries: globEntries(['./js/src/*.js', './sass/*.scss']);
```  

```
  plugins: [
    new preventEmitPlugin(globEntries(['./sass/*.scss']))
    ...
  ]
}
```
