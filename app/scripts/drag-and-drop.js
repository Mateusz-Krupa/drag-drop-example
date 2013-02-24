var addEvent = (function () {
  if (document.addEventListener) {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  } else {
    return function (el, type, fn) {
      if (el && el.nodeName || el === window) {
        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
      } else if (el && el.length) {
        for (var i = 0; i < el.length; i++) {
          addEvent(el[i], type, fn);
        }
      }
    };
  }
})();

var msie = /*@cc_on!@*/0; 

var links = document.querySelectorAll('.dragable-items'), el = null;


for (var i = 0; i < links.length; i++) {
    el = links[i];

    // even required? Spec says yes, browsers say no.
    el.setAttribute('draggable', 'true');

    addEvent(el, 'dragstart', function (e) {
      e.dataTransfer.setData('Text', this.id); // set *something* required otherwise doesn't work
    });
  }

  var box = document.querySelectorAll('.image-type-box, .item-container-box');
  
  for(var i=0;i<box.length;i++){
	  var bin = box[i];
	  addEventListeners(bin)
}


function addEventListeners(bin){
  addEvent(bin, 'dragover', function (e) {
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    return false;
  });

  addEvent(bin, 'dragleave', function () {
   
  });

  addEvent(bin, 'drop', function (e) {
    var localBox = e.target || e.srcElement;
    if (e.stopPropagation) e.stopPropagation();
    var element = document.getElementById(e.dataTransfer.getData('Text'));
    var clone = element.cloneNode(true);
    addEvent(clone, 'dragstart', function (e) {
      e.dataTransfer.setData('Text', this.id);
    });

    localBox.appendChild(clone);
    el.parentNode.removeChild(el);

    return false;
  });
}

var fileDrop = document.getElementById('drop_area');

function uploadFile (file) {
        var img,
            reader,
            xhr,
            fileInfo;                           

        if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
            img = document.createElement("img");
            createDocumentFragment(img);
            reader = new FileReader();
            reader.onload = (function (theImg) {
                return function (evt) {
                    theImg.src = evt.target.result;
                };
            }(img));
            reader.readAsDataURL(file);
        }
        
        //xhr = new XMLHttpRequest();
        //xhr.addEventListener("load", function () {
        //    progressBarContainer.className += " uploaded";
        //    progressBar.innerHTML = "Uploaded!";
        //}, false);

        //xhr.open("post", "upload/upload.php", true);
        
        //xhr.setRequestHeader("Content-Type", "multipart/form-data");
        //xhr.setRequestHeader("X-File-Name", file.name);
        //xhr.setRequestHeader("X-File-Size", file.size);
        //xhr.setRequestHeader("X-File-Type", file.type);

        //xhr.send(file);        
  }
  
function traverseFiles (files) {
        if (typeof files !== "undefined") {
            for (var i=0, l=files.length; i<l; i++) {
                uploadFile(files[i]);
            }
        }
        else {
            fileDrop.innerHTML = "No support for the File API in this web browser";
        }   
    }
    
function setAttribute(element,attrName, attrValue){
	var attr = document.createAttribute(attrName);
	attr.value = attrValue;
	element.setAttributeNode(attr);
}    
 
function createDocumentFragment(img){
	var fragment = document.createDocumentFragment();
	var container = document.createElement("div");
	setAttribute(container, 'class','container');
	var imageTypeBox = document.createElement("div");
	var attribute = document.createAttribute("class");
	setAttribute(imageTypeBox,'class','image-type-box');
	
	container.appendChild(img);
	addEventListeners(imageTypeBox);
	container.appendChild(imageTypeBox);
	fragment.appendChild(container);
	
	var newBox = document.getElementById('new-image-box');
	newBox.appendChild(fragment);	
}
  
addEvent(fileDrop,"drop", function (e) {
  traverseFiles(e.dataTransfer.files);
    this.className = "";
        e.preventDefault();
        e.stopPropagation();
}, false);  
  
addEvent(fileDrop, 'dragover', function (e) {
	if (e.preventDefault) e.preventDefault();
    return false;
});
    
addEvent(fileDrop, 'dragleave', function () {
   
});