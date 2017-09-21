<p align="center">

<a href="https://github.com/generate/generate">
<img height="150" width="150" src="https://raw.githubusercontent.com/generate/generate/master/docs/logo.png">
</a>
</p>

Scaffold out a handlebars theme from a Jekyll theme using Hekyll.

# generate-hekyll

[![NPM version](https://img.shields.io/npm/v/generate-hekyll.svg?style=flat)](https://www.npmjs.com/package/generate-hekyll) [![NPM monthly downloads](https://img.shields.io/npm/dm/generate-hekyll.svg?style=flat)](https://npmjs.org/package/generate-hekyll) [![Build Status](https://img.shields.io/travis/generate/generate-hekyll.svg?style=flat)](https://travis-ci.org/generate/generate-hekyll)

![generate-hekyll demo](https://raw.githubusercontent.com/generate/generate-hekyll/master/docs/demo.gif)

## Usage

```js
var generateHekyll = require('generate-hekyll');
```

## Getting started

### Install

**Installing the CLI**

To run the `readme` generator from the command line, you'll need to install [Generate][] globally first. You can do that now with the following command:

```sh
$ npm install --global generate
```

This adds the `gen` command to your system path, allowing it to be run from any directory.

**Install generate-hekyll**

Install this module with the following command:

```sh
$ npm install --global generate-hekyll
```

### CLI

Run this generator's `default` [task](https://github.com/generate/generate/blob/master/docs/tasks.md#default) with the following command:

```sh
$ gen readme
```

**What you should see in the terminal**

If completed successfully, you should see both `starting` and `finished` events in the terminal, like the following:

```sh
[00:44:21] starting ...
...
[00:44:22] finished ✔
```

If you do not see one or both of those events, please [let us know about it](../../issues).

### Help

To see a general help menu and available commands for Generate's CLI, run:

```sh
$ gen help
```

## Available tasks

All available tasks for this generator.

### [default](generator.js#L50)

Scaffold out a new handlebars blog or site from a jekyll theme.

**Example**

```sh
$ gen hekyll
$ gen hekyll:default
```

### [delete](generator.js#L179)

Delete themes that have been cloned and cached by `generate-hekyll` from the `generate-hekyll/themes` directory. This does not delete your copy of the theme, only the cached version used by `generate-hekyll`.

**Example**

```sh
$ gen hekyll:delete
```

Visit Generate's [documentation for tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

## Next steps

### Running unit tests

It's never too early to begin running unit tests. When you're ready to get started, the following command will ensure the project's dependencies are installed then run all of the unit tests:

```sh
$ npm install && test
```

### Publishing your generator

If you're tests are passing and you're ready to publish your generator to [npm](https://www.npmjs.com), you can do that now with the following command:

**Are you sure you're ready?!**

Let's go!

```sh
$ npm publish
```

## About

### What is "Generate"?

Generate is a command line tool and developer framework for scaffolding out new GitHub projects using [generators](https://github.com/generate/generate/blob/master/docs/generators.md) and [tasks](https://github.com/generate/generate/blob/master/docs/tasks.md).

Answers to prompts and the user's environment can be used to determine the templates, directories, files and contents to build. Support for [gulp](http://gulpjs.com), [base](https://github.com/node-base/base) and [assemble](https://github.com/assemble/assemble) plugins, and much more.

**For more information**:

* Visit the [generate project](https://github.com/generate/generate/)
* Visit the [generate documentation](https://github.com/generate/generate/blob/master/docs/)
* Find [generators on npm](https://www.npmjs.com/browse/keyword/generate-generator) (help us [author generators](https://github.com/generate/generate/blob/master/docs/micro-generators.md))

### Related projects

* [generate-project](https://www.npmjs.com/package/generate-project): Scaffold out complete code projects from the command line, or use this generator as a… [more](https://github.com/generate/generate-project) | [homepage](https://github.com/generate/generate-project "Scaffold out complete code projects from the command line, or use this generator as a plugin in other generators to provide baseline functionality.")
* [generate](https://www.npmjs.com/package/generate): Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of Slush, and more powerful flow control and composability than either.")
* [hekyll-cli](https://www.npmjs.com/package/hekyll-cli): CLI for hekyll, the Jekyll to Handlebars theme converter. | [homepage](https://github.com/jonschlinkert/hekyll-cli "CLI for hekyll, the Jekyll to Handlebars theme converter.")
* [hekyll](https://www.npmjs.com/package/hekyll): Migrate Jekyll (gh-pages) themes to use handlebars instead of liquid. | [homepage](https://github.com/jonschlinkert/hekyll "Migrate Jekyll (gh-pages) themes to use handlebars instead of liquid.")

### Community

Bigger community means more plugins, better support and more progress. Help us make Generate better by spreading the word:

* Show your love by starring the project
* Tweet about Generate. Mention using `@generatejs`, or use the `#generatejs` hashtag
* Get implementation help on [StackOverflow](http://stackoverflow.com/questions/tagged/generate) with the `generatejs` tag
* Discuss Generate with us on [Gitter](https://gitter.im/generate/generate)
* If you publish a generator, to make your project as discoverable as possible, please add the unique keyword `generategenerator` to your project's package.json.

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on September 21, 2017._