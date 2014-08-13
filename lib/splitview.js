/*!
 * Splitview.js 0.2.1
 * <https://github.com/luisreyes/Splitview.js>
 * Luis Reyes © 2014 MIT License
 */

var Splitview = (function(){
  'use strict';
  
  var
  // Main Container for containers 
  _splitArea = null,

  _grip = null,
  
  // Grip element being dragged  
  _do = null,
  
  // 'v' for vertical or 'h' for hortizontal
  _dd = null,
  
  // Globalize mouse screen offset
  _mo = null,
  
  // Globalize mouse position offset
  _mp = null,
  
  // Globalize width and height to be updated with updateWH()
  _w = null,
  _h = null,

  // Globalize grips
  vGrip = null,
  hGripL = null,
  hGripR = null,

  // Globalize containers
  _containers = [];

  function init(options){
    var o = options || {};

    /** Setup Elements **/
    _splitArea = document.getElementById(o.main);
    _splitArea.className = 'lr-split-space';

    // Base grip element
    _grip = document.createElement('div');
    
    // Grip Clones 1 Vertical and 2 Horizontal for Left and Right
    vGrip = _grip.cloneNode();
    hGripL = _grip.cloneNode();
    hGripR = _grip.cloneNode();

    // Ids
    vGrip.id = 'vg';
    hGripL.id = 'hgl';
    hGripR.id = 'hgr';

    // Classes
    vGrip.className = 'lr-v lr-grip';
    hGripL.className = 'lr-hl lr-grip';
    hGripR.className = 'lr-hr lr-grip';

    // Add to the Main Container
    _splitArea.appendChild(vGrip);
    _splitArea.appendChild(hGripL);
    _splitArea.appendChild(hGripR);


    _containers[0] = document.getElementById(o.containers.tl);
    _containers[1] = document.getElementById(o.containers.tr);
    _containers[2] = document.getElementById(o.containers.bl);
    _containers[3] = document.getElementById(o.containers.br);

    _containers[0].className += ' lr-container lr-tl';
    _containers[1].className += ' lr-container lr-tr';
    _containers[2].className += ' lr-container lr-bl';
    _containers[3].className += ' lr-container lr-br';

    /** Mouse Events for size rendering **/
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('touchmove',mouseMove, false);
    document.addEventListener('touchend',mouseUp, false);
    

    makeDraggable(vGrip);
    makeDraggable(hGripR);
    makeDraggable(hGripL);


    var l; // Hold layout configuration
    if( o.layout ){ 
      // Get layout configuration from options and split into array
      l = o.layout.split(','); 
    } else { 
      // Get layout configuration from query string and split into array
      l = getParameterByName('layout').split(','); 
    }
    // Set layout from configuration
    forceLayout(l);
  }

  function mouseCoords(e) {
    if (e.pageX || e.pageY) {
      return {
        x: e.pageX,
        y: e.pageY
      };
    }
    return {
      x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
      y: e.clientY + document.body.scrollTop - document.body.clientTop
    };
  }

  function getMouseOffset(target, e) {
    e = e || window.event;
    var docPos = getPosition(target);
    _mp = mouseCoords(e);
    return {
      x: _mp.x - docPos.x,
      y: _mp.y - docPos.y
    };
  }

  function getPosition(e) {
    var left = 0;
    var top = 0;
    while (e.offsetParent) {
      left += e.offsetLeft;
      top += e.offsetTop;
      e = e.offsetParent;
    }
    left += e.offsetLeft;
    top += e.offsetTop;
    return {
      x: left,
      y: top
    };
  }

  function mouseMove(e) {
    e = e || window.event;
    e.preventDefault();
    
    updateWH();

    _mp = mouseCoords(e);
    if (_do) {
      var tp = ((_mp.y-_mo.y) / _h) * 100,
          lp = ((_mp.x - _mo.x) / _w) * 100;
      if (_dd === 'h') {
        _do.style.top = tp +'%';
      }
      else {
        _do.style.left = lp +'%';
      }

      redraw(_dd, _mp);
      return false;
    }
  }

  function mouseUp() { _do = null; }

  function makeDraggable(element) {
    if (!element) return;
    element.addEventListener('mousedown', touch);
    element.addEventListener('touchstart',touch);
  }

  function touch(e) {
    _do = this;
    _dd = this.classList[0].substr(3,1);
    _mo = getMouseOffset(this, e);
    return false;
  }

  function updateWH(){
    _w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    _h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  function redraw(dir, _mp) {
    updateWH();
    
    if (dir === 'h') {
      
      var pT = ((_mp.y-_mo.y) / _h) * 100 +'%',
          pB = (100 - ((_mp.y-_mo.y) / _h) * 100) +'%';

      if (_do.id === 'hgl') {
      
        _containers[0].style.height = pT;
        _containers[2].style.top = pT;
        _containers[2].style.height = pB;
      
      }else if (_do.id === 'hgr') {
      
        _containers[1].style.height = pT;
        _containers[3].style.top = pT;
        _containers[3].style.height = pB;
      
      }

    }
    else {
      var pL = ((_mp.x - _mo.x) / _w) * 100 +'%',
          pR = (100 - ((_mp.x - _mo.x) / _w) * 100) +'%';   
      
      _containers[0].style.width = pL;
      _containers[2].style.width = pL;
      hGripL.style.width = pL;
      hGripR.style.width = pR;
      _containers[1].style.width = pR;
      _containers[3].style.width = pR;
    }
  }

  function forceLayout(params){
    var h1 = params[0] || 50,
        w = params[1] || 50,
        h2 = params[2] || 50;

      // Set vertical bar
      var pL = w+'%', pR = 100 - w + '%';
      _containers[0].style.width = pL;
      _containers[2].style.width = pL;
      vGrip.style.left = pL;
      hGripL.style.width = pL;
      hGripR.style.width = pR;
      _containers[1].style.width = pR;
      _containers[3].style.width = pR;

      //Set Horizontal bars
      var hlTop = h1 +'%',
          hlBottom = 100 - h1 +'%',
          hrTop = h2 +'%',
          hrBottom = 100 - h2 +'%';

      _containers[0].style.height = hlTop;
      _containers[2].style.top = hlTop;
      _containers[2].style.height = hlBottom;
      _containers[1].style.height = hrTop;
      _containers[3].style.top = hrTop;
      _containers[3].style.height = hrBottom;

      hGripL.style.top = hlTop;
      hGripR.style.top = hrTop;
  }
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  return {
    init: function(options){
      init(options);
    },
    setLayout: function(options){
      forceLayout(options);
    }
  };

})();
