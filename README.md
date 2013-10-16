# www.getlantern.org

[![build status](https://secure.travis-ci.org/getlantern/www.getlantern.org.png)](https://travis-ci.org/getlantern/www.getlantern.org)

This is the code that powers https://www.getlantern.org.

## OSX Quick Start

The easiest path to get up and running on OSX is to do the following in Terminal:

```
$ ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go)"
$ brew install npm
$ npm install -g yo grunt-cli bower generator-angular
$ gem install compass
$ pip install transifex-client (you may need sudo pip install transifex-client)
$ brew install phantomjs
$ git clone git@github.com:<username>/www.getlantern.org.git
$ cd www.getlantern.org
$ npm install
$ bower install
$ grunt server
```

Once you do all of that, the site should be up and running. If you experience errors, there's
likely something wrong with an outdated version of some required prerequisite for your 
current step, and you'll need to fiddle!

You still won't be able to deploy to App Engine (see below), but the above will enable you get 
the site up and running quickly.

## Requirements

- [node](http://nodejs.org/)
- Global npm packages:
  - [yeoman](http://yeoman.io/)
  - [grunt](http://gruntjs.com/)
  - [bower](http://bower.io)
  - [generator-angular](https://github.com/yeoman/generator-angular)
  (npm install -g yo grunt-cli bower generator-angular)
- For building stylesheets:
  - [Ruby](http://www.ruby-lang.org/) (comes with OS X)
  - [Compass](http://compass-style.org/) (gem install compass)
- For deploying to App Engine:
  - [Python 2.7](http://python.org/) (comes with OS X)
  - [App Engine Python SDK](https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python)
- For managing translations:
  - [Python 2.7](http://python.org/) (comes with OS X)
  - [Transifex Client](https://pypi.python.org/pypi/transifex-client)
    (pip install transifex-client)
- For running tests:
  - [PhantomJS](http://phantomjs.org/) (brew install phantomjs)

## Setup

After ensuring the requirements above are installed, fork this repository, and
then run:

```
git clone git@github.com:<username>/www.getlantern.org.git
cd www.getlantern.org
npm install
bower install
```

## Tools

This site is built with the following tools:

- [Yeoman](http://yeoman.io/)
- [Grunt](http://gruntjs.com/)
- [Bower](http://bower.io/)
- [AngularJS](http://angularjs.org/)
- [AngularJS Yeoman Generator](https://github.com/yeoman/generator-angular)
- [Angular Google Analytics](https://github.com/revolunet/angular-google-analytics)
- [Angular Translate](https://github.com/PascalPrecht/angular-translate)
- [Angular Translate Loader Static Files](https://github.com/PascalPrecht/angular-translate-loader-static-files)
- [Compass](http://compass-style.org/)
- [Compass-Twitter-Bootstrap](https://github.com/vwall/compass-twitter-bootstrap)
- [Transifex](https://www.transifex.com)

Before jumping in, it's worth taking some time to get familiar with any of
these you may not have used before.

## Development

To start up a development session using grunt's default dev server, run
"grunt server". That will start watching the source files, start the dev
server, open a browser pointing to the dev server, and detect when any source
files are changed and automatically compile any reload them in the browser.

### i18n

Translated strings are fetched from json files in the "app/locale" directory
and interpolated into the app using
[Angular Translate](https://github.com/PascalPrecht/angular-translate).
To add or change a translated string, update the corresponding mapping
in "app/locale/en_US.json" and add or update any references to it in the app if
needed.

#### Transifex

All translatable content for Lantern has been uploaded to [the Lantern
Transifex project](https://www.transifex.com/projects/p/lantern/] to help
manage translations. Translatable strings from this code have been uploaded to
the [www](https://www.transifex.com/projects/p/lantern/resource/www/) resource
therein. Transifex has been set up to automatically pull updates to that
resource from [its GitHub
url](https://raw.github.com/getlantern/www.getlantern.org/master/app/locale/en_US.json)
(see
http://support.transifex.com/customer/portal/articles/1166968-updating-your-source-files-automatically
for more information).

After translators add translations of these strings to the Transifex project,
the [Transifex
client](http://support.transifex.com/customer/portal/articles/960804-overview)
can be used to pull them. See
http://support.transifex.com/customer/portal/articles/996157-getting-translations
for more.

## Testing

Add automated tests in the "tests" directory to make sure the site continues
to work as development progresses.

**Protip:** If you add a controller (service, filter, etc.) via "yo
angular:controller <newcontroller>" (or "yo angular:service <newservice>",
etc.), the Angular generator will stub out a test spec for you.

## Creating a production build

Run "grunt build" when ready to locally preview a production build of the site.
This should lint-check the code, run the automated tests, then compile, minify,
concatenate, and otherwise modify source files for production. The resulting
built site will be output to the "dist" directory. You can cd into it, run
"python -m SimpleHTTPServer", and then point a browser at the local built
version to make sure it looks the same as the development version.

## Deployment

Before you can deploy to App Engine, you must have permission to modify the
"getlanternhr" app when you go to https://appengine.google.com. Email
admin@getlantern.org if you need to request permission.

When ready to deploy, make sure the "version" field in app.yaml is set to where
you'd like to deploy to. For instance, if version is set to "dev", your build
will be deployed to https://dev-dot-getlanternhr.appspot.com/. If there is
an existing deployment there you don't want to overwrite, change "version" in
app.yaml to &lt;somenewversion&gt;, and then you'll be deploying to
https://&lt;somenewversion&gt;-dot-getlanternhr.appspot.com/.

Once version is set how you want it, and you have a successful build in
the "dist" directory, run "appcfg --oauth2 update ." The files in "dist" will be
uploaded to production. Once uploaded, open a browser to the newly deployed
version to make sure everything looks good on the production server.
