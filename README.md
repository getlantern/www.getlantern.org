# www.getlantern.org

[![build status](https://secure.travis-ci.org/getlantern/www.getlantern.org.png)](https://travis-ci.org/getlantern/www.getlantern.org)

This is prospective code that may soon power the new
https://www.getlantern.org.

In the meantime, a live demo is available at
https://getlanternsite.appspot.com/.

## Requirements

- [Node](http://nodejs.org/)
- [Yeoman](http://yeoman.io/), [Grunt](http://gruntjs.com/),
  [Bower](http://bower.io) (npm install -g yo grunt-cli bower)
- [Ruby](http://www.ruby-lang.org/) (comes with OS X)
- [Compass](http://compass-style.org/) (gem install compass)
- [Python](http://python.org/) (comes with OS X)
- [App Engine Python SDK](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)

## Setup

After forking this repository, run:

```
$ git clone git@github.com:<username>/www.getlantern.org.git
$ cd www.getlantern.org
$ npm install
$ bower install
```

npm and bower will fetch all the dependencies necessary to develop and run the
site.

## Tools

This site is built with the following tools:

- [Yeoman](http://yeoman.io/)
- [Grunt](http://gruntjs.com/)
- [Bower](http://bower.io/)
- [AngularJS](http://angularjs.org/)
- [AngularJS Yeoman Generator](https://github.com/yeoman/generator-angular)
- [Angular-Translate](https://github.com/PascalPrecht/angular-translate)
- [AngularUI Bootstrap](http://angular-ui.github.io/bootstrap/)
- [Compass](http://compass-style.org/)
- [Compass-Twitter-Bootstrap](https://github.com/vwall/compass-twitter-bootstrap)

Before jumping in, it's worth taking some time to get familiar with any of
these you may not have used before.

## Development

To start up a development session using grunt's default dev server, run
`grunt server`. That will start watching the source files, start the dev
server, open a browser pointing to the dev server, and detect when any source
files are changed and automatically compile any reload them in the browser.

To use the Google App Engine dev server, run the custom grunt task I hacked
together `grunt gae_devserver`.

Don't hardcode any text in the html; instead add it to the translations file in
`app/scripts/translations.js` and use
[Angular-Translate](https://github.com/PascalPrecht/angular-translate) to
translate it when the site is loaded.

Add automated tests in the `tests` directory to make sure the site continues
to work as development progresses.

**Protip:** If you add a controller (or service, etc.) via `yo
angular:controller <newcontroller>` (or `yo angular:service <newservice>`,
etc.), the Angular generator will stub out a test spec for you.

Run `grunt build` when ready to locally preview a production build of the site.
This should lint-check the code, run the automated tests, then compile, minify,
concatenate, and otherwise modify source files for production. The resulting
built site will be output to the `dist` directory. You can cd into it, run
`python -m SimpleHTTPServer`, and then point a browser at the local built
version to make sure it looks the same as the development version.

## Deployment

To deploy to App Engine, go to https://appengine.google.com and make sure you
can access the "getlanternsite" app there. Then open app.yaml and change the
version to <somenewversion>.

When ready to deploy, run `grunt deploy` (another custom grunt task I wrote).
This will run the `build` task mentioned above, and then
upload the files in `dist` to production. You can then go to
https://<somenewversion>-dot-getlanternsite.appspot.com/ to make sure
everything looks good on the production server.
