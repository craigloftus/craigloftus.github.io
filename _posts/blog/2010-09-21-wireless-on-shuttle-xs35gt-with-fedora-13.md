---
layout: post
title:  "Wireless on Shuttle XS35GT with Fedora 13"
date:   2010-09-21 17:18:00
categories:
 - blog
---

Wireless won’t work out of the box on the Shuttle XS35GT with Fedora 13 because
it does not include a kernel driver for the Realtek 8171 network controller.
The [instructions by Bill
Giannikos](http://www.linwik.com/wiki/using+the+realtek+8172+and+8192se+wireless+controller+with+fedora+12)
for 8172 and 8192se controllers work for the 8171 as well… using the same
driver as in the guide.

Also, remember to watch out for kernel upgrades because you will need to
recompile the module each time there is an upgrade.
