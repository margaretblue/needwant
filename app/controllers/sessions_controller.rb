class SessionsController < ApplicationController
	def new
	end

	def create #creates user session
		user = User.find_by_email(params[:session][:email].downcase)
		if user && user.authenticate(params[:session][:password])
			sign_in(user)
			redirect_to user
			#sign the user in and redirect to user's show page
		else
			#Create an error message and re-render the signup form
			flash.now[:error] = 'Invalid email/password combination'
			render 'new'
		end
	end

	def create_from_bookmark #creates user session from bookmarklet
		user = User.find_by_email(params[:session][:email].downcase)
		if user && user.authenticate(params[:session][:password])
			sign_in(user)
			# This needs to call the javascriptlet again
			redirect_to user
		else
			flash.now[:error] = 'Invalid email/password combination'
			render 'new'
		end
	end

	def destroy
		sign_out
		redirect_to root_url
	end

end
