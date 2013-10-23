/**
 * @author kathrynbrisbin
 */

var giftyFunctions = function(){
	
	function getMaxImage() {
	  var maxDimension = 0;
	  var maxImage = null;

	  // Iterate through all the images.
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
	function giftySetIframe(){
		var iframe;
		
		if (navigator.userAgent.indexOf("Safari") != -1) {
			iframe = frames["giftyframe"];
		}
		else {
			iframe = document.getElementById("giftyframe").contentWindow;
		}
		
		if (!iframe) 
			return;
		
	//pass variables through search string, retrieve them as params in controller	
		
		// var product_defaults = null;
		//var default_price = encodeURIComponent(get_default_price());

		var biggest_image = getMaxImage();

		var url = 'http://localhost:3000/item_form/?'
		url += '&title=' + document.title;
		url += '&url=' + window.location.href;
		url += '&image=' + biggest_image;
	//	url += '&price=' + default_price;
		try {
			iframe.location.replace(url);
		} 
		catch (e) {
			iframe.location = url; // safari
		}
	}
	
	//check for a change in the URL
	function giftyFrameMessage(){
		var gCurScroll = giftyScrollPos();
		var hash = location.href.split('#');
		if (hash.length > 1 && hash[hash.length - 1].match('gifty') != null) {
			location.replace(hash[0] + "#");
			giftySetScroll(gCurScroll);
			giftyHandleMessage(hash[hash.length - 1]);
		}
	}
	
	//from friendfeed javascript
	//find the location of the scroll
	function giftyScrollPos(){
		if (self.pageYOffset !== undefined) {
			return {
				x: self.pageXOffset,
				y: self.pageYOffset
			};
		}
	}
	
	//get the scroll position
	//from friendfeed javascript
	function giftySetScroll(pos){
		var e = document.documentElement, b = document.body;
		e.scrollLeft = b.scrollLeft = pos.x;
		e.scrollTop = b.scrollTop = pos.y;
	}
	
	//show the message from the iframe
	function giftyHandleMessage(msg){
		giftyClose();
	}
	
	//close the box
	function giftyClose(){
		var giftybox = document.getElementById('giftybox');
		giftybox.parentNode.removeChild(giftybox);
		window.onscroll = null;
	}
	
	return {
		addGiftyDiv: function(){
			var container = document.createElement("div");
			container.style.padding = "0";
			container.style.margin = "0";
			container.style.border = "1px solid";
			container.id = "giftybox";
			container.style.position = "absolute";
			container.style.top = giftyScrollPos().y + "px";
			container.style.right = "0";
			container.style.zIndex = 100000;
			container.style.width = "350px";
			container.style.height = "210px";
			container.style.backgroundColor = "white";
			container.innerHTML = '<iframe style="width:100%;height:100%;border:0px;" id="giftyframe"></iframe>';
			document.body.appendChild(container);
			
			
			//set up message checking to run every so often
			var interval = window.setInterval(function(){
				giftyFrameMessage();
			}, 50);
			
			giftySetIframe();
			//when the window scrolls, change the location of the box
			window.onscroll = function(){
				document.getElementById('giftybox').style.top = giftyScrollPos().y + "px";
			};
		}
	}
}

giftyFunctions().addGiftyDiv();
