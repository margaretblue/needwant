/*PageImages - Bookmarklet*/
/*Based on Pinterest's bookmarklet*/ 
/*added my form*/

/*Todo: Add functions, show total number of images, filter between background and foreground, allow user to set max and min size. resize thumbnails. lightbox image. download all. */


if (typeof jQuery == 'undefined') {
        var jQ = document.createElement('script');
        jQ.type = 'text/javascript';
        jQ.onload=runthis;
        jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        document.body.appendChild(jQ);
}

else {
        runthis();
}

function runthis() {
        
        jQuery(document).ready(function(){
            
            jQuery('html, body').animate({scrollTop:0}, 'fast');
            
            /* Check whether Bookmarklet is already visible */        
                if(jQuery('#image-grabber-container').length == 0) {
                        
                        var numberOfImages = 0;
                        
                        /*Add css - Must change this if you want to use your own CSS*/
                        jQuery('<style type="text/css">@import url("http://dl.dropbox.com/u/5045906/imagesbookmarklet/style.css");</style>').appendTo("head");
                                                
                        /*Add toggle*/
                        jQuery('body').append('<div id="background-blocker"></div><div id="image-grabber-container"><div id="button-toggle"><span id="close">Close</span><span id="count"></span></div><ul id="list-of-images"></ul></div>');
                        
                        
                        /*Make toggle work*/
                        jQuery("#button-toggle").click(function() {
                                jQuery("#image-grabber-container, #background-blocker").remove();
                        });
        
                        /*Find images and add to list*/                        
                        jQuery('img').each(function() {
                                var _sudoThing = jQuery(this);                                                        
                                addImage(_sudoThing);
                        });
                                
                        /*Find background images and add to list*/
                        jQuery('*:visible').each(function() {
                                var _sudoBackground = jQuery(this);
                                var        backgroundImage = _sudoBackground.css('background-image');
                                
                                if (backgroundImage !== "none")
                                {
                                        addImage(_sudoBackground);
                                }                        
                        });
                
                jQuery('#count').text(numberOfImages);
                var myForm = $('<form accept-charset="UTF-8" action="/items" method="post"><br/>            <br/>           <div style="margin: 0px; padding: 0px; display: inline;"><br/>          <input name="utf8" type="hidden" value="&#x2713;"/><br/>            <input name="authenticity_token" type="hidden" value="GHsHAJ8069tXA/9VYN7XZ7Eh8KWTompDGt5LvESpxMg="/><br/>          </div><br/>         <br/>           <input id="item_wishlist_id" name="item[wishlist_id]" type="hidden" value="1"/><br/>            <label for="item_title">Title</label><br/>          :<br/>          <input id="item_title" name="item[title]" size="30" type="text"/><br/>          <br/><br/>          <label for="item_brand">Brand</label><br/>          :<br/>          <input id="item_brand" name="item[brand]" size="30" type="text"/><br/>          <br/><br/>          <label for="item_category">Category</label><br/>            :<br/>          <input id="item_category" name="item[category]" size="30" type="text"/><br/>            <br/><br/>          <label for="item_price">Price</label><br/>          :<br/>          <input id="item_price" name="item[price]" size="30" type="text"/><br/>          <br/><br/>          <label for="item_url">Url</label><br/>          :<br/>          <input id="item_url" name="item[url]" size="30" type="text"/><br/>          <br/><br/>          <label for="item_image">Image</label><br/>          :<br/>          <input id="item_image" name="item[image]" size="30" type="text"/><br/>          <br/><br/>          <input class="btn btn-small btn-primary" name="commit" type="submit" value="Add Item"/><br/>        </form>')
                $('body').prepend(myForm);
                
                   }
   

        function addImage( imageToAdd ) {
                
                                
                var imageURL = imageToAdd.attr('src');
                console.log(imageURL);
                
                if (imageURL === undefined)
                {
                        console.log(imageToAdd.css('background-image').slice(4,-1));
                        imageURL = imageToAdd.css('background-image').slice(4,-1);
                }
                
                // post imageURL back to my app
                // console.log("The url to this image is " + imageURL);
                // $.post('http://localhost:3000/images', {
                //     url: imageURL
                // })

                var beginLiTag = "<li><a href='";
                var endATag = "'>";
                var beginImageTag = "<img src='";
                var middleImageTag = "' style='margin-top:";
                var endImageTag = "px'>";
                var endLiTag = "</a></li>";
                var imageWidth = imageToAdd.width();
                var imageHeight = imageToAdd.height();
                
                var containData = imageURL.indexOf('data:');

                        
                /*Check whether image big enough*/
                if(imageWidth > 150 && imageHeight > 200 && containData === -1) {
                        /*Calculate margin to vertically center*/                
                        if (imageWidth > imageHeight) {
                                var calculatedMargin = (200 - (200 * (imageHeight / imageWidth))) * 0.5;
                        }
                                
                        else {
                                calculatedMargin = 0;
                                }
                        
                        var finalLink =  beginLiTag + imageURL + endATag + beginImageTag + imageURL + middleImageTag + calculatedMargin + endImageTag + "<span>" + imageWidth + " x " + imageHeight + "</span>" + endLiTag;
                        jQuery('#list-of-images').append(finalLink);
                        numberOfImages ++;
                        
                }
                
        }
        });        
}