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
		@title=params[:title]
		@url = params[:url]
		# @price = params[:price]
		@image = params[:image]
		@user = current_user
		@wishlist_id = @user.wishlist.id
		render 'item_form.html.erb'
	end

end
