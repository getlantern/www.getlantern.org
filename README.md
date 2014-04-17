# www.getlantern.org

[![build status](https://secure.travis-ci.org/getlantern/www.getlantern.org.png)](https://travis-ci.org/getlantern/www.getlantern.org)
[![Code Climate](https://codeclimate.com/github/getlantern/www.getlantern.org.png)](https://codeclimate.com/github/getlantern/www.getlantern.org)

This is the code that powers https://www.getlantern.org.

## OS X Quick Start

For easy copy/paste into Terminal:

    # install homebrew if missing
    which brew || ruby -e "$(curl -fsSL https://raw.github.com/mxcl/homebrew/go/install)"

    # install git if missing
    which git || brew install git

    # clone the repo and cd into it
    git clone https://github.com/getlantern/www.getlantern.org.git
    cd www.getlantern.org

    # install npm if missing
    which npm || brew install npm

    # install required global node packages
    npm install -g grunt-cli bower

    # install required local node packages
    npm install

    # install required bower packages
    bower install

    # install compass if missing
    which compass || sudo gem install compass

    # start up the development web server
    grunt serve

    # setup and start ghost blog
    cd blog && npm install && bower install && npm start

## Dependencies

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
- For deploying to Nodejitsu:
  - [jitsu](https://github.com/nodejitsu/jitsu#one-line-jitsu-install)
- For deploying to S3:
  - [s3_website](https://rubygems.org/gems/s3_website) (gem install s3\_website)
- For managing translations:
  - [Python 2.7](http://python.org/) (comes with OS X)
  - [Transifex Client](https://pypi.python.org/pypi/transifex-client)
    (pip install transifex-client)
- For running tests:
  - [PhantomJS](http://phantomjs.org/) (brew install phantomjs)


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
"grunt serve". That will start watching the source files, start the dev
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


## Creating a production build

Run "grunt build" when ready to locally preview a production build of the site.
This should lint-check the code, run the automated tests, then compile, minify,
concatenate, and otherwise modify source files for production. The resulting
built site will be output to the "dist" directory. You can cd into it, run
"python -m SimpleHTTPServer", and then point a browser at the local built
version to make sure it looks the same as the development version.

## Deployment

First make sure you have the Nodejitsu credentials for the lantern\_www user in
~/.jitsuconf (if not run "jitsu login" to create it) as well as
https://github.com/getlantern/too-many-secrets checked out alongside this repo,
and then run "grunt deploy". This will create a fresh build in the "dist"
directory and then deploy it to Nodejitsu as well as S3.
