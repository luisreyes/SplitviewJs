<img src="http://www.luisreyes.com/splitview/splitviewlogo.png" title="splitview.js"/>

>Pure JavaScript view splitter. Break the viewport into 4 resizable sections.

**Splitview v0.2.2** <a href="http://www.luisreyes.com/splitview/demo" target="_blank">View Demo</a>

**Initialization**
```javascript
Splitview.init({
  // Main wrapper for you containers
  main:'work-space', 
  
  // Force layout to this configuration
  // optional: default is 50,50,50
  layout: '30,50,70',
  
  // Sets the element to the sectioned selected
  containers:{
    // Top left
    tl:'container0',
    // Top Right
    tr:'container1',
    // Bottom Left
    bl:'container2',
    // Bottom Right
    br:'container3'
  }
});
```

If the **layout property** is not set in the **init options** it will read the layout configuration from the **query string** if present.
```javascript
query: layout= val0, val1, val2
____________________________
val0 =  int (0 - 100) | Height of the left horizontal divider.
val1 =  int (0 - 100) | Position of the vertical divider.
val2 =  int (0 - 100) | Height of the right horizontal container.
```

####DISCLAIMER
This is still work in progress. Not all features have been implemented and it has not been tested on older browsers at all.

####LICENSE
The MIT License (MIT)

Copyright (c) 2014 Luis Reyes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
