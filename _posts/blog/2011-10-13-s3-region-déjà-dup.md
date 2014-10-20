---
layout: post
title:  "Changing the S3 bucket region with Déjà Dup"
date:   2011-10-13 18:03:00
categories:
 - scripts
 - software
 - blog
---

[Déjà Dup](https://launchpad.net/deja-dup) is a simplified back-up tool for
Gnome that lets you use a variety of storage options for backing up your
computer. However, its handling of Amazon [S3](http://aws.amazon.com/s3/) is a
little simplistic as it does not let you set the region of the bucket that it
will automatically create for you or use a pre-existing bucket. Amazon charges
based on where data is sent and got from, so if you do not live in the US Déjà
Dup will cost you extra. There is a [bug
report](https://bugs.launchpad.net/deja-dup/+bug/548632) of course, but that
does not seem to be getting attention, so below are instructions for a work
around.

I have not tested the instructions exhaustively, but it works for me on Fedora
16 Beta with Déjà Dup version 19.90, having initially let Déjà Dup create a
default bucket. They are based on an
[answer](https://answers.launchpad.net/deja-dup/+question/81409) to a different
problem. Essentially the fix is to manually specify the bucket used in the
dconf data for Déjà Dup, after which it just magically carries on working.

* Using an S3 tool…
   1. Create a bucket with the correct region specified
   2. If applicable, copy the contents from the default Déjà Dup bucket into the new one
* On your computer…
   1. You will need to use the dconf tool, which is probably already installed
   2. <code>$ dconf write /org/gnome/deja-dup/s3/bucket \'bucket-name\'</code>
   3. Also, you may want to change or reset the folder key, <code>$ dconf reset /org/gnome/deja-dup/s3/folder</code>

Note that the escaped quote marks are required but I have no idea why. If you
are not comfortable putting magic incantations into the terminal there is a GUI
editor for dconf which you should be able to find in a package with a name like
dconf-editor, or dconf-tools.
