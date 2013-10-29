 var needyFunctions = function(){
	
	function getMaxImage() {
	  var maxDimension = 0;
	  var maxImage = null;

	  // Iterate through all the 'img' like $('img')
	  var imgElements = document.getElementsByTagName('img');
	  for (var index in imgElements) {
	    var img = imgElements[index];
	    var currDimension = img.width * img.height;
	    if (currDimension  > maxDimension){
	       maxDimension = currDimension
	       maxImage = img;
	    }
	  }
	  // Check if an image has been found.
	  if (maxImage) 
	    return maxImage.src;
	  else
	    return null;
	}

	// function get_default_price() {
 //      if (product_defaults && typeof product_defaults.price == 'function') {
 //        return jq.trim(product_defaults.price())
 //      } 

 //      var patt = /[\d,]{1,5}\.\d{2}[^\d"']/g
 //      var price_matches = jq('body').text().match(patt) || []
 //      if (price_matches.length > 0) {
 //        for (var i=0; i<price_matches.length; i++) {
 //          price_matches[i] = price_matches[i].substring(0, price_matches[i].length-1) // remove last char
 //        }
 //      }
 //      if (price_matches.length > 1) {
 //        // not jquery so can't call filter- want to remove all 0's
 //        //price_matches = price_matches.filter(function(v) { return v === '0.00'? false: true;});
 //        var price = price_matches[0]
 //        for (var i=1; i<price_matches.length; i++) {
 //          if (price != price_matches[i]) {
 //            return '';
 //          }
 //        }
 //        return price;
 //      } else if (price_matches.length == 1) {
 //        return price_matches[0];
 //      }
 //      return '';
 //    }
	

	//frankensteined from friendfeed js, sets location of iframe
	function needySetIframe(){
		var iframe;
		
		if (navigator.userAgent.indexOf("Safari") != -1) {
			iframe = frames["needyframe"];
		}
		else {
			iframe = document.getElementById("needyframe").contentWindow;
		}
		
		if (!iframe) 
			return;
		
	//pass variables through search string, retrieve them as params in controller	
		
		// var product_defaults = null;
		//var default_price = encodeURIComponent(get_default_price());

		var image = getMaxImage();
		var rawURL = window.location.href;
		var rawTitle = document.title;

		// var url = 'http://localhost:3000/item_form/?'
		var url = 'http://localhost:3000/items/new?'
		url += '&title=' + encodeURIComponent(rawTitle);
		url += '&url=' + encodeURIComponent(rawURL);
		url += '&image=' + image;
		url += "&bookmarklet=true"
	//	url += '&price=' + default_price;
		try {
			iframe.location.replace(url);
		}
		catch (e) {
			iframe.location = url; // safari
		}
	}
	
	//check for a change in the URL
	function needyFrameMessage(){
		var gCurScroll = needyScrollPos();
		var hash = location.href.split('#');
		if (hash.length > 1 && hash[hash.length - 1].match('needy') != null) {
			location.replace(hash[0] + "#");
			needySetScroll(gCurScroll);
			needyHandleMessage(hash[hash.length - 1]);
		}
	}
	
	//from friendfeed javascript
	//find the location of the scroll
	function needyScrollPos(){
		if (self.pageYOffset !== undefined) {
			return {
				x: self.pageXOffset,
				y: self.pageYOffset
			};
		}
	}
	
	//get the scroll position
	//from friendfeed javascript
	function needySetScroll(pos){
		var e = document.documentElement, b = document.body;
		e.scrollLeft = b.scrollLeft = pos.x;
		e.scrollTop = b.scrollTop = pos.y;
	}
	
	//show the message from the iframe
	function needyHandleMessage(msg){
		needyClose();
	}
	
	//close the box
	function needyClose(){
		var needybox = document.getElementById('needybox');
		needybox.parentNode.removeChild(needybox);
		window.onscroll = null;
	}
	
	return {
		addNeedyDiv: function(){
			var container = document.createElement("div");
			container.style.padding = "0";
			container.style.margin = "0";
			container.style.borderTopLeftRadius = '4px';
			container.style.borderTopRightRadius = '4px';
			container.style.borderBottomLeftRadius = '4px';
			container.style.borderBottomRightRadius = '4px';
			// container.style.border = "1px solid";
			container.id = "needybox";
			container.style.position = "absolute";
			container.style.top = needyScrollPos().y + "px";
			container.style.right = "0";
			container.style.zIndex = 100000;
			container.style.width = "350px";
			container.style.height = "250px";
			container.style.backgroundColor = "white";
			container.innerHTML = '<iframe style="width:100%;height:100%;border:0px;" id="needyframe"></iframe>';
			document.body.appendChild(container);
			
			
			//set up message checking to run every so often
			var interval = window.setInterval(function(){
				needyFrameMessage();
			}, 50);
			
			needySetIframe();
			//when the window scrolls, change the location of the box
			window.onscroll = function(){
				document.getElementById('needybox').style.top = needyScrollPos().y + "px";
			};
		}
	}
}

needyFunctions().addNeedyDiv();
