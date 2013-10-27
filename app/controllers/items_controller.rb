class ItemsController < ApplicationController
	def new
		@user = current_user
		@wishlist_id = @user.wishlist.id
	end

	def create
		newitem = Item.create(params[:item])
		@user_id = current_user.id
		redirect_to user_path(@user_id)
	end

	def item_form
		@url = params[:url]
		# @price = params[:price]
		@image = params[:image]
		@user = current_user
		# request = Typhoeus.get("http://api.diffbot.com/v2/product?token=724c0cf09e8b60fed6bc864be0ce2205&url=http://www.amazon.com/gp/product/B0088EDMMS/ref=s9_simh_gw_p74_d0_i3?pf_rd_m=ATVPDKIKX0DER&pf_rd_s=center-2&pf_rd_r=0T96BJNFWR6QC36PM96M&pf_rd_t=101&pf_rd_p=1630083502&pf_rd_i=507846")
		request = Typhoeus.get("http://api.diffbot.com/v2/product?token=724c0cf09e8b60fed6bc864be0ce2205&url=#{@url}")
		results = JSON.parse(request.body)
		@title = results["products"][0]["title"]
		if @title == nil
			@title = params[:title]
		end
		@price = results["products"][0]["offerPrice"]
		@wishlist_id = @user.wishlist.id
		render 'item_form.html.erb'
	end

	def destroy
		Item.find(params[:id]).destroy
		# or you can do this
		# Sample.delete(params[:id])
		redirect_to user_path(current_user.id)
	end

	def getbookmark
		render 'getbookmark.html.erb'
	end

end
