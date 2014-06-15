.. _config-proxied-sites:

Configuring Proxied Sites
=========================

.. image:: https://www.evernote.com/shard/s209/sh/a6ffd5ed-9f38-4a27-9e75-1b940be94582/2f741aad7056c2bccf76844e7814773c/deep/0/Lantern.png
   :alt: Proxied Sites

   Proxied Sites
The Proxied Sites screen is part of the configuration for people using Lantern to Get Access, and is available through the globe icon in the lower right.

.. image:: https://www.evernote.com/shard/s209/sh/9dd170e2-800d-412c-bfef-8fb21819f517/22b89c58ddadf34a4dee969b2e9fe9ff/deep/0/Lantern.png
   :alt: proxy sites

   proxy sites
This is where users Getting Access can set which sites to access through Lantern friends as opposed to accessing directly. 
By only accessing sites through Lantern that would otherwise be blocked, and accessing sites that aren't blocked directly, your experience will be faster, and Lantern will be harder to block and more efficient. The Proxied Sites screen controls what sites are routed through Lantern rather than accessed directly.

Initial Configuration
~~~~~~~~~~~~~~~~~~~~~

Right now the initial list is just a number of commonly blocked sites.
In the future we hope to build the list more dynamically based on what is actually blocked in each country. 
But for now we recommend adjusting it to your needs. 
If you run across a site that seems blocked, you can check if it's on the list, and add it if it's not. 
We also recommend removing sites from the list that are not actually blocked, as they will then load faster for you and help the network run more efficiently.

Using a crowd-sourced proxy list
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While we don't yet have a slick integration, we have set up a `Proxied Sites List Wiki <https://github.com/getlantern/lantern-proxied-sites-lists/wiki>`__ where you can find country specific lists of blocked sites. 
If you live in a country with a list and it's been updated recently then it will likely work better for you than the default list that ships with Lantern.

.. image:: https://www.evernote.com/shard/s209/sh/1410658e-531a-44aa-b01b-7867e074637c/b88cfe3ce617b30a394cf6c56b3ea20a/deep/0/Autoproxy%20list%20for%20china%20%C2%B7%20getlantern/lantern-proxied-sites-lists%20Wiki.png
   :alt: china autoproxy list

   china autoproxy list
Simply go to one of the lists, then select and copy the whole list, and paste it in to your list of domains to proxy in your Lantern. 
Be sure you delete your existing list (or copy over it), so you don't get duplicates and don't proxy sites you don't need to.

.. image:: https://www.evernote.com/shard/s209/sh/345d4873-a0b1-49e1-8188-c5356c2e5c56/d668a756c91454b8f1eaeaf79e6a79a3/deep/0/Lantern.png
   :alt: pasting in lantern.

   pasting in lantern.
   
If the list is really long it can be a pain to select it all by hand.
Many sites will have a link to the 'raw list', which should be a long file with just sites. 
If you go there you can use ctrl-a (select all), ctrl-c (copy), and ctrl-v (paste) shortcuts. 
You should delete the default list, so you don't get duplicates and don't proxy sites you don't need to.

Finding Sites
~~~~~~~~~~~~~

Before adding a new site, you can check to see if it is already on your proxy list. 
This can be done by scrolling through the list, but the search box on the right lets you find it more quickly:

.. image:: https://www.evernote.com/shard/s209/sh/f97bd235-eeeb-4e07-a6bd-a47f991254c1/f048f14a6d5d9aeae030ec1b00a445bb/deep/0/Lantern.png
   :alt: searching

   searching
Adding a new site
~~~~~~~~~~~~~~~~~

To add a new site, you just need to add it to a new line in the text box. 
You can do this anywhere you want. 
Just hit 'enter' to make a new line and add the site on that line.

.. image:: https://www.evernote.com/shard/s209/sh/d1cf2497-2202-4929-847d-7c8c725bbdda/0028e5ba5c860863e4ca3d72014822bf/deep/0/Lantern.png
   :alt: adding

   adding
Be sure to hit 'update' after you've entered it. 
Lantern will save your changes, and the next time you access that site, it will be routed through a Lantern user in your network to circumvent any blocking.

What parts of a site's address to use
'''''''''''''''''''''''''''''''''''''

Rather than having you specify individual pages on a site you'd like to access through Lantern, Lantern allows you to specify entire sites at a time. 
In other words, you should enter only the domain name of sites you want to access through Lantern. 
For example, you wouldn't enter the full address of the page ``nobelprize.org/nobel_prizes/peace/laureates/2010``; instead you should just add whole site: ``nobelprize.org``. 
Search terms are similar - just put the entire search engine, and all your searches on that search engine will go through Lantern.

Subdomains
          

If you have ``foo.blogspot.com`` and ``bar.blogspot.com`` in your list, they will both be accessed through Lantern, but ``baz.blogspot.com`` will not. 
However, if you have just ``blogspot.com`` in your list, then any blogspot.com site will be accessed through Lantern.

Bulk Adding of new sites
''''''''''''''''''''''''

If you've got a list of sites to proxy from another source that doesn't use Lantern's format, you will likely have to clean up the formatting.
For instance, if the list includes [comments](https://en.wikipedia.org/wiki/Comment\_(computer\_programming)), you will have to remove them, as Lantern currently does not support comments. 
Make sure that you meet all the formatting requirements above.
If you know `regular expressions <http://www.regular-expressions.info/>`__ then those can be quite useful in cleaning up the list.

Note that Lantern works well for bulk adding only of lists already in Lantern's format. 
If you paste in a long list of sites that are not in Lantern's format, you may get an 'invalid line' error. 
Lantern will report that line, so we recommend copying that and then searching for it with Ctrl-F or Edit > Find in the program you pasted the list from. 
In a pinch you can do this in Lantern too (in Windows and Ubuntu), but it's best to work on your list outside of Lantern, then paste it in and keep editing until there are no more errors.

Removing sites
~~~~~~~~~~~~~~

We recommend scrolling through the list and removing any sites that you know are not blocked in your country. 
To remove sites just select them in the text field and hit 'delete'. 
Be sure to hit 'update' when you're done.

.. image:: https://www.evernote.com/shard/s209/sh/81bd9e5b-808c-4b3a-bb8f-487fee2601fd/bf5af2b060b92a44336a9ccc7ff8988b/deep/0/Lantern.png
   :alt: update

   update
Sharing
~~~~~~~

If you would like to share your list of proxied sites with a friend who's using Lantern, simply select all the sites you'd like to share with your mouse, or click inside the text box and hit Ctrl-A (Command-A on OS X) to select them all. 
Then copy them to the clipboard with Ctrl-C (Command-C), and paste them into an email to your friend using Ctrl-V (Command-V). 
Your friend can then copy the sites you sent her and then paste them into her Proxied Sites screen in Lantern.

If you'd like to share your list of proxied sites publicly, feel free to add them to a new page on the `Lantern Proxied Sites List Wiki <https://github.com/getlantern/lantern-proxied-sites-lists/wiki>`__.
Just click the green 'New Page' button, give your page a name, then on the Create New Page screen, paste your list in between two lines containing only three back-tick characters, like so:

\`\`\`

site1.com

site2.com

site3.com

\`\`\`

Feel free to add a post to the `User Forums <https://groups.google.com/group/lantern-users-en>`__ with a link to the list you just created so other users can check it out!

Making a 'raw' list
'''''''''''''''''''

If your list is super long it can be a pain for people to copy and paste it from the wiki. 
Some lists are put in the GitHub repository, and then linked to from the wiki page, so they can be copied much more easily.

If you're not that comfortable with tech then feel free to email a Lantern user's group and someone can easily do it for you. 
If you are super comfortable with github just fork the repo and make a pull request. 
For everyone else read on.

To add a new list to the repository you need a GitHub account. 
There should be a link to 'sign up' in the upper right hand corner. 
Once you've done that go to https://github.com/getlantern/lantern-proxied-sites-lists and hit the 'plus' button.

.. image:: https://www.evernote.com/shard/s209/sh/f7185f3d-9ca5-45bf-aac5-8978f7fefb39/6868a4884f375bb854b24b4f663fab91/deep/0/getlantern/lantern-proxied-sites-lists.png
   :alt: add

   add
This will 'clone' the main repository, making a copy of all the files that are under your control. 
You can create and edit these files, and it won't affect the main repository - they're your private copy. 
You should then create a new file under a country folder. 
You can do this by just entering the folder name and then typing '/'. 
So just enter like \`china/my-folder/list.txt', and that will create it under the china folder.

.. image:: http://i.stack.imgur.com/9Ifmj.gif
   :alt: animated folders

   animated folders
After you've made your list you can propose the changes to the core contributors. 
To do this you create a 'pull request'. 
To do this you hit the green 'compare & review' button from your repository. 
And then hit 'create pull request'. 
The contributors on the main site will then review and pull it in.

Note you can also use pull requests to update or correct other lists.
Just make the edits from your repository and then create a pull request.
