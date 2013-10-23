class UserMailer < ActionMailer::Base
  default from: "margaretblue@gmail.com"

  def welcome_email(user)
  	@user = user@url = "http://localhost:3000/signin"
  	mail(to: @user.email, subject: "Welcome to The Need/Want")
  end

end
