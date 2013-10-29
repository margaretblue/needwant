class ItemsController < ApplicationController
	include ItemsHelper
	#https://github.com/jherrlin/needwant/compare/master...refactor
	def new
		@user = current_user
		@wishlist_id = @user.wishlist.id
		@url = params[:url]
		@image = params[:image]
		# if Diffbot doesn't return title get one from js scrape
		@title ||= params[:title]
		# if Diffbot doesn't return a price get one from js scrape
		# value = condition ? value_if_true : value_else
		@price = @url ? get_price_from_api(@url) : params[:price]
		@bookmarklet = params[:bookmarklet].present?
	end

	def create
		item = Item.create(params[:item])
		if item.errors.empty?
			redirect_to user_path(current_user.id)
		else
			flash[:errors] = item.errors.full_messages
			redirect_to new_items_path
		end	
	end

	def destroy
		Item.find(params[:id]).destroy
		# or you can do this
		# Sample.delete(params[:id])
		redirect_to user_path(current_user.id)
	end 

	def getbookmark
		render :bookmark
	end

end
