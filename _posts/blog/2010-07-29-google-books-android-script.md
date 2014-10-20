---
layout: post
title:  "Google Books android script"
date:   2010-07-29 08:49:00
categories:
 - scripts
 - distractions
 - books
 - blog
---

The script below lets you scan multiple book barcodes and add the books
directly to your Google Library.

Since getting a Nexus One I've been wanting to dabble with programming
something for it, Java seemed far too hard. However, I quickly came across
[Scripting Layer for Android](http://code.google.com/p/android-scripting/)
(SL4A) which lets you write quick scripts in a variety of languages; including
my favourite, Python. The next challenge was to actually come up with a simple
project to get my hands dirty.

Matt Cutts wrote a [simple
script](http://www.mattcutts.com/blog/android-barcode-scanner/) that scans a
barcode and pulls up its Google Books page, from which you can then click the
'add to my library' button, but this seemed far too clumsy and slow to me, so I
settled on improving it. The script now lets you scan multiple books in series
and then add them to your Google library by making use of the [Google Books
Search API](http://code.google.com/apis/books/).

See the code (public domain) below:

```
import android
from gdata.books.service import BookService
import gdata.books

email = 'youremail@gmail.com'
password = 'yourpassword'

droid = android.Android()

def dialog(items):
  title = 'Another?'
  droid.dialogCreateAlert(title)
  droid.dialogSetItems(items)
  droid.dialogSetPositiveButtonText('Add')
  droid.dialogSetNegativeButtonText('Exit')
  droid.dialogSetNeutralButtonText('Upload')
  droid.dialogShow()
  response = droid.dialogGetResponse().result
  return response['which']

def add_from_queue(self):
   for k,b in self.queue.items():
      self.add_item_to_library(b)
   return(True)

def get_by_barcode(self):
   (id, result, error) = droid.scanBarcode()
   if result is not True:
      return(False)
   isbn = int(result['extras']['SCAN_RESULT'])
   q = 'ISBN'+str(isbn)
   b = self.search(q, feed=self.ITEM_FEED).entry[0]
   self.queue[b.dc_title[0].text] = b
   return(True)

gdata.books.service.BookService.get_by_barcode = get_by_barcode
gdata.books.service.BookService.add_from_queue = add_from_queue
gdata.books.service.BookService.queue = {}
gdata.books.service.BookService.ITEM_FEED = gdata.books.service.ITEM_FEED

service = gdata.books.service.BookService()
service.ClientLogin(email, password)

service.get_by_barcode()

i = True
while i:
  response = dialog(service.queue.keys())

  if response == 'positive':
     service.get_by_barcode()

  elif response == 'neutral':
     service.add_from_queue()
     service.queue = {}

  else:
     i = False

droid.exit()
```

Updated: Thanks to sjb for pointing out a bug in the code; now fixed.
