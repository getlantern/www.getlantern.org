.. _translating-lantern:

Translating Lantern
===================


Introduction
-----------

One of the best ways to help Lantern grow is by translating it to your local language. 
Our hope is to have Lantern available in as many languages as possible. 
We've started a `forum <https://groups.google.com/group/lantern-i18n>`__ coordinating localization ("l10n") / internationalization ("i18n") of Lantern. 
If you'd like to get involved don't hesitate to introduce yourself there. 
You can also just start on translations and get in touch there when you need help. 
Also feel free to look for us in our IRC channel, `#lantern on Freenode <http://webchat.freenode.net/?channels=lantern>`__, to chat with us in real time.

There are a few different aspects of Lantern that need translation. 
We list them below in sections, roughly ordered by importance. 
And the more important ones are the ones we've spent more time on making it easy to translate.

Transifex for Lantern Application and Video
-------------------------------------------

The two easiest and most important things to translate are Lantern itself and captions for the `video <https://www.youtube.com/watch?v=aiPkCugE-RY>`__ (featured at http://getlantern.org).

`Transifex <http://transifex.com>`__ is the platform we use to manage the most important translations. 
If you've not used it before you can check out their `explanation <http://support.transifex.com/customer/portal/articles/869950-what-is-transifex->`__.
And then just head to the `Lantern Transifex Project <https://www.transifex.com/projects/p/lantern/>`__.

.. image:: https://www.evernote.com/shard/s209/sh/d2b67dcd-c1c0-420c-87e5-0f374b0b714d/a1aa1697af0dc827888cc81559bc1780/deep/0/Lantern%20localization.png
   :alt: lantern on transifex

If you're not already a Transifex user you can easily `sign up <https://www.transifex.com/signup/>`__. 
It's totally free for any translator, and they generously provide their full toolset to open source projects like Lantern. 
Their tools are quite intuitive to use, and they provide a nice `overview <http://support.transifex.com/customer/portal/articles/972120-introduction-to-the-web-editor>`__.

The `Lantern Project <https://www.transifex.com/projects/p/lantern/>`__ on transifex lists the status of all the languages. 
To translate just select your language and get started. 
If your language is not listed there then just hit 'Request Language' and the admins will get it created.

After you click on your language you'll see a number of different 'language resources':

.. image:: https://www.evernote.com/shard/s209/sh/e396390c-acce-4ea8-9bd5-05ae3e75686f/941ba9184932bba96b6e38b9953029fa/deep/0/Turkish%20Translation%20for%20Lantern%20%7C%20Transifex.png
   :alt: transifex

Hit 'join team' to get started, and the admins should approve you quickly. 
We **highly** recommend hitting the 'watch this language' button (at the top of 'history'), as you'll know immediately when there are new translation tasks. 
After you've started watching, pick which uncompleted resource to contribute to:

**ui** is the most important one. 
This is Lantern's User Interface - the main application. 
There are about 500 strings with under 2000 words total. 
As Lantern is still in beta these change relatively often, as we figure out the exact wording. 
So if you see this at less than 100% please jump on translations so the next release of Lantern will be up to date with your language.

**email** is the second most important, as it is how all new users will first interact with Lantern. 
So having this translated will ensure that people will see that text in their language instead of english.

**Lantern Video Captions** is probably the easiest, with only 224 words.
It's a great way to get started, and has a big impact as we can more easily communicate what lantern is. 
Your translated words will show up as Captions in the `Lantern Video <https://www.youtube.com/watch?v=aiPkCugE-RY>`__. 
Notify the `internationalization forum <https://groups.google.com/group/lantern-i18n>`__ when you reach 100%, so someone can update the captions. Unlike the UI it won't get pulled in automatically.

**www** is the website at https://www.getlantern.org. We have not yet fully set it up to easily change languages, but it is coming soon, so translations are very much appreciated.

**Documentation** The rest of the strings are all pages of documentation like this one.
Translation help on them is much appreciated.

If all are at 100% then just be sure to hit 'watch this language' and you'll be notified as soon as there is more to translate. 
As Lantern is continually evolving there will definitely be new strings to translate before long.

Start a forum for your language
-------------------------------

If you'd like to help other users in your language we encourage you to create a language specific forum. 
Right now we only have an English one, but can help create one for you and promote it on Lantern. 
Just send an email to `internationalization forum <https://groups.google.com/group/lantern-i18n>`__ and we can get you set up.

Documentation
-------------

**TODO: Finish this section to reflect how to translate the docs now**

Our documentation just recently moved to GitHub, in its own repo at https://github.com/getlantern/lantern-docs/ 
Docs are done in ReStructuredText and built with Sphinx.
To translate the docs just go to Transifex and get working there.
The strings translated should be pulled automatically to the website.
