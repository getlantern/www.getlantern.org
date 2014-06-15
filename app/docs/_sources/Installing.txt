Installing and Uninstalling
===========================
This section provides details on how to install and uninstall Lantern on multiple operating systems.

Once you are invited, you will receive an email with links to download the installer for your operating system.

.. image:: https://github-camo.global.ssl.fastly.net/6a8e1af9a0053337263343727132eacab1920d88/687474703a2f2f692e696d6775722e636f6d2f347652615436382e706e67
	:alt: Lantern Invitation

Linux
-----

Supported Versions
^^^^^^^^^^^^^^^^^^
Currently, installation on Linux is only available on Ubuntu.
We greatly appreciate any `contributions <../../developer/html/contributing.html>`_ for other Linux distributions or help with improvements to make better use of package managers. You can also `build from source <https://github.com/getlantern/lantern/blob/master/README.md#wiki-setting-up-a-development-environment>`_.

Installing
^^^^^^^^^^ 
The invitation to Lantern has a link to an installation script that: 

* Downloads a `.deb` file. 
* Creates the uninstall script in the `/opt/lantern-net-installer` directory.
* Creates a user preferences directory.
* Does *not* auto-launch a Lantern service.

#. Click **Ubuntu 12.04+** in the invitation email.
	A browser window opens and dialog appears asking you to open or save the installer. 

	.. image:: http://i.imgur.com/justLyz.png
		:alt: Open File Dialog

#. Open a new terminal window and change to the directory where you downloaded the installer.
	:: 
		
		cd Downloads/

#. Make the installation script executable.
	::
	
		chmod 700 lantern-net-installer_unix.sh

#. Run the installation script.
	::
		
		sudo ./lantern-net-installer_unix.sh
	
	The terminal window displays a message indicating the installer is starting and the Lantern Fetcher dialog appears.
	
	.. image:: http://i.imgur.com/S2hBiEY.png
		:alt: Terminal window and Lantern Fetcher dialog indicating the status of the download.
		
	.. note:: There is no status message indicating the installation is complete. 
		
		If you receive a message indicating there is no suitable Java Virtual Machine, you need to install Java. See the `Ubuntu documentation <https://help.ubuntu.com/community/Java>`_ for details.

5. Click the **Ubuntu** button and type Lantern.

6. Click the **Lantern** icon.
	The Lantern Setup window appears.
	
	.. image:: http://i.imgur.com/nnXoFjr.png
		:alt: The Lantern Setup window prompting you to click Give Access or Get Access.
	
	.. note:: If you receive a message about Google Chrome not being installed, you need to download it.
		
		See https://www.google.com/intl/en/chrome/browser/ for details. 

#. See :ref:`setting-up-lantern`.

.. _uninstalling-linux:
Uninstalling
^^^^^^^^^^^^

1. In a terminal window, change to the installation directory.
	::
	
		cd /usr/local/lantern-net-installer/
		
2. Run the uninstall program.
	::
	
		sudo ./uninstall
	
	The Lantern Uninstall window appears.
		
	.. image:: http://i.imgur.com/PW3hiCF.png
		:alt: A terminal window showing the command to uninstall Lantern.
		
3. Click **Next** to start uninstalling Lantern.
	A message appears when the uninstallation is complete.
	
	.. image:: http://i.imgur.com/7XZayjD.png
		:alt: The Lantern Uninstall window showing a message indicating that Lantern has been successfully uninstalled.
	
4. Click **Finish**.

.. _installing-mac:
Mac
---
Supported Versions
^^^^^^^^^^^^^^^^^^

Lantern supports OS/X version 10.6 and higher,
64-bit only. 

.. note:: During installation, Lantern checks if you have Java installed. If not, it will download the Java Runtime Environment from the web.

Installing
^^^^^^^^^^

#. Click the **Mac OS X 10.6+** link in the invitation email.

#. Double-click the downloaded **.dmg** file, then double-click on the **Lantern Installer** icon.
	The Lantern Fetcher window appears and starts downloading the most recent installation files.
	
	.. image:: https://www.evernote.com/shard/s209/sh/b39a5f0d-4aa9-4518-8a26-fd0a86de8737/9d3090f5eab319830f4510bc13bba90e/deep/0/Lantern%20Fetcher.png
		:alt: Lantern Downloader
		
	.. Important:: As of beta2 the installer will *not* work if you are not running as an admin user. If you are not the admin user, nothing will happen when you click the installer icon. We are `working <https://github.com/getlantern/lantern/issues/819>`_ on getting it to prompt for the admin password instead of not responding.

#. In the password dialog that appears, enter your administrator user name and password. This allows Lantern to install and make changes to your proxy settings so that your internet connection can be shared.
	.. image:: https://www.evernote.com/shard/s209/sh/c92df454-472a-4ce1-a578-fc06843802d7/04fd633f4deb9fbeecc44562dff2ea78/deep/0/Screenshot%208/16/13%207:52%20PM.png
		:alt: A window prompting you to enter a user name and password to allow changes.
	
	The installer downloads and extracts the files. When the installation is complete, the Lantern window appears.

	.. image:: https://dl.dropboxusercontent.com/u/253631/Installing_Mac_Setup_Window.png
		:alt: The Lantern window appears prompting you to start the setup process.
		
#. See :ref:`setting-up-lantern`.
	
Uninstalling
^^^^^^^^^^^^

1. Right-click on the **Lantern** status bar icon and select **Quit Lantern**.

2. In the **Applications** folder, move **Lantern** to the **Trash**.
	This also uninstalls Lantern's Java Runtime Environment.

3. To delete all your settings, open a terminal window and change to the directory in your **Home** directory.
	::
	
		cd ~
		
	.. note:: If you don't delete your settings, Lantern uses them the next time you install the application.
		
4. Delete the **./lantern** directory.
	::
	
		rm -r .lantern


.. _installing-windows:
Windows
-------

Supported Versions 
^^^^^^^^^^^^^^^^^^

Lantern supports Windows version XP and higher and requires that Google Chrome is installed. 
If you don't have Chrome you can get it `here <https://www.google.com/intl/en/chrome/browser/>`_.

Installing
^^^^^^^^^^

1. Click the **Windows XP+** link in the invitation email.
	.. warning:: It is important to follow the next steps to make sure that the `digital signature <http://en.wikipedia.org/wiki/Digital_signature>`_ is valid.

#. Right click the Lantern (**.exe**) file that downloaded and click the **Digital Signatures** tab. 

#. After clicking on **Details**, in the **General** tab, click **View Certificate**. 

#. Under **Details**, verify the signature.
	Each .exe file is digitally signed by Brave New Software Project, Inc. For June 11, 2013 to June 11, 2016, the SHA1 thumbprint should be ‎44:99:0c:72:fb:a0:e6:dd:f9:2a:b9:34:46:02:e7:56:00:d8:be:3c.

	.. image:: http://i.imgur.com/iTljBxR.jpg
		:alt: Certificate Details Window
	
#. Once you have verified the signature, double-click the Lantern icon (**.exe** file). If you are prompted to allow the installer to make changes to your computer, click **Yes**.
	When installation is complete, the Lantern window appears.

	.. image:: http://i.imgur.com/K6yBha5.png)
		:alt: The Lantern window appears prompting you to start the setup process.

#. See :ref:`setting-up-lantern`.


Uninstalling
^^^^^^^^^^^^

1. Open the **Control Panel** and click **Programs**.
	.. image:: http://i.imgur.com/lF9ldIE.png
		:alt: The Windows Control Panel.

#. In the list of installed programs, click the **Lantern**.
	
#. Click the **Uninstall/Change** button.
	.. image:: http://i.imgur.com/0fTDSYF.png
		:alt: Uninstall Lantern

#. Click **Next**.
	Lantern is uninstalled.

	.. image:: http://i.imgur.com/TGQeclS.png
		:alt: Uninstall Window




	
	
