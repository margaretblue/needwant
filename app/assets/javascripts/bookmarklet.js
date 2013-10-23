/*
 * jQuery Bookmarklet - version 1.0
 * Originally written by: Brett Barros
 * Heavily modified by: Paul Irish
 *
 * If you use this script, please link back to the source
 *
 * Copyright (c) 2010 Latent Motion (http://latentmotion.com/how-to-create-a-jquery-bookmarklet/)
 * Released under the Creative Commons Attribution 3.0 Unported License,
 * as defined here: http://creativecommons.org/licenses/by/3.0/
 *
 */

window.bookmarklet = function(opts){fullFunc(opts)};
 
window.bookmarklet({
 
    css : 	["https://localhost:3000/assets/application-bookmarklet.css"],
    js  : 	[ "https://localhost:3000/assets/bookmarklet.js"],
    ready : function(){
 		
		var jq = $.noConflict(true);




    function baby_get_default_assets() {
      var has_set_image = product_defaults && typeof product_defaults.assets == 'function';
      if (has_set_image) {
        var assets = product_defaults.assets();
      } else {
        var assets = jq('img:visible');
      }
      assets = assets.filter(function (index) { return jq(this).width() >= 144 && jq(this).height() >= 144 })
                                   .map(function(){ return jq(this).attr('src'); })
                                   .get().join("|");
      fb_img_url = jq('meta[property="og:image"]').attr("content");
      if (fb_img_url && !has_set_image) {
        assets = fb_img_url + "|" + assets;
      }
      return assets;
    }

    function baby_get_default_price() {
      if (product_defaults && typeof product_defaults.price == 'function') {
        return jq.trim(product_defaults.price())
      } 

      var patt = /[\d,]{1,5}\.\d{2}[^\d"']/g
      var price_matches = jq('body').text().match(patt) || []
      if (price_matches.length > 0) {
        for (var i=0; i<price_matches.length; i++) {
          price_matches[i] = price_matches[i].substring(0, price_matches[i].length-1) // remove last char
        }
      }
      if (price_matches.length > 1) {
        // not jquery so can't call filter- want to remove all 0's
        //price_matches = price_matches.filter(function(v) { return v === '0.00'? false: true;});
        var price = price_matches[0]
        for (var i=1; i<price_matches.length; i++) {
          if (price != price_matches[i]) {
            return '';
          }
        }
        return price;
      } else if (price_matches.length == 1) {
        return price_matches[0];
      }
      return '';
    }

    function baby_get_default_title() {
      if (product_defaults && typeof product_defaults.title == 'function') {
        return product_defaults.title();
      } 
      var title = jq('title').text()
      if (title) {
        title.replace(/\s{2,}/g,' ');
        return title;
      }
      return '';
    }

    function baby_get_extras() {
      if (product_defaults && typeof product_defaults.extras == 'function') {
        return product_defaults.extras();
      }
      return false;
    }

    function baby_get_url() {
      var url = window.location;
      if (url == 'about:blank') {
        url = top.location.href;
      }
      if (url == 'about:blank') {
        alert("Sorry, we are unable to add item. This is an error with Chrome and Google is in the process of fixing it. In the meantime, you can use BabyList from another browser (Firefox or Safari) or email natalie@babyli.st for steps on how to fix this in Chrome.")
      }
      if (product_defaults && typeof product_defaults.url == 'function') {
        return product_defaults.url();
      }
      return url;
    }

    function ieStyleFix() {
      var doctype = document.doctype;
      if (doctype == null) {
        var browser = navigator.appName;
        if (browser.match('Microsoft')) {
          jq('#babylist_iframe').css('position', 'absolute');
        }
      }
    }

      var product_defaults = null;
		var baby_url = encodeURIComponent(baby_get_url());
    var baby_title = encodeURIComponent(baby_get_default_title());
    var baby_price = encodeURIComponent(baby_get_default_price());
    var baby_image_urls = encodeURIComponent(baby_get_default_assets());
    var baby_extras = encodeURIComponent(baby_get_extras());
    
		var query_string = "?url="+baby_url+"&title="+baby_title+"&price="+baby_price+"&imgs="+baby_image_urls;
    if (baby_extras) {
      query_string += "&extras="+baby_extras;
    }
	 	
		var iframe = jq(document.createElement('iframe')).attr('allowtransparency', 'true').attr('src', 'https://babyli.st/bookmarklet/'+query_string).attr('name', 'babylist_iframe').attr('id', 'babylist_iframe').attr('scrolling', 'no');
		jq("body").append(iframe);
    ieStyleFix();
		
		bufferpm.bind("buffermessage", function(data) {
			jq('#babylist_iframe').remove();
			return false;
		});
  }
})
 
function fullFunc(opts){
  opts.jqpath = opts.jqpath || "https://ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"
  function getJS(jsfiles){
    if (jsfiles.length === 0) {
      opts.ready();
      return false;
    }
    $.getScript(jsfiles[0],  function(){ 
      getJS(jsfiles.slice(1));
    })
  }
 
  function getCSS(csfiles){
    $.each(csfiles, function(i, val){
      $('<link>').attr({ href: val, rel: 'stylesheet' }).appendTo('head');
    });
  }
 
	function getjQuery(filename) {
		var fileref = document.createElement('script')
		fileref.type = 'text/javascript';
		fileref.src =  filename;
 
		// Once loaded, trigger other scripts and styles
		fileref.onload = function(){
			getCSS(opts.css);
			getJS(opts.js);
		};
		fileref.onreadystatechange = function(){
			getCSS(opts.css);
			getJS(opts.js);
		};	
		document.body.appendChild(fileref);
	}
 
	getjQuery(opts.jqpath); // kick it off
 
}; 