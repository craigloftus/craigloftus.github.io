---
layout: post
title:  "Not so new look"
date:   2007-04-21 13:16
categories:
 - Information
 - Scripts
 - Website
---

I changed the look of the website a little while back, as you may have noticed.
It is quite a significant departure from the previous style and layout. The two
main changes are the new colour scheme and the inclusion of a number of feeds
on the index page.

Colour scheme
-------------

I was inspired to change to a much darker scheme having read an article on [how
the colours effect the energy required to display a
website](http://ecoiron.blogspot.com/2007/01/emergy-c-low-wattage-palette.html).
Essentially, bright and light colours require more energy from your monitor.

Feeds
-----

These feeds represent online content which I have created. Although in the case
of recommended posts and bookmarks this creation might be considered a bit
abstract. This was an idea I had a [long while
ago](http://craigloftus.net/blog/2006/12/25/what-am-i-reading-2/), and then not
so long ago came across a way of quickly and crudely implementing it.

Up until today the feeds have been read, parse and output each time the page
was called. This was causing significant delays in the page loading times. As
of today a static file containing the parsed feeds is generated every 12 hours.
The index page then calls on the static file when a request is made which means
that no time is wasted on parsing the feed and preparing the output.

For those interested I've done this quite simply by writing taking a php file
that was parsing the feeds and having it write the output to a static file. I
then have a [cron](http://en.wikipedia.org/wiki/Cron) job run the php file at
9am and 9pm everyday:

```0 9,21 * * * /usr/bin/php -q /PATH/generate_static_feeds.php > /dev/null```

The last bit of that command "/dev/null" sends the output into the ether.
Without it the server will e-mail the output of the script… which for some
purposes can be rather useful.

In time I'll be working on a more complex way of displaying the recommended
posts, which will allow me to write a little note to go with each explaining
why I have recommended them.
