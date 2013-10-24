class WishlistsController < ApplicationController
	before_filter :signed_in_user

	def create
		@wishlist = current_user.wishlists.build(wishlist_params)
		
		if @wishlist.save
			flash[:success] = "Wishlist created!"
			#????? should be able to redirect to user
			#redirect to user
			redirect_to root_url
		else 
			### change this to page that displays wishlists
			redirect_to root_url
		end
	end

	def index
	end

	def create
	end

	def destroy
	end

	def wishlist_params
		params.require(:wishlist.permit(:user_id))
	end


end
