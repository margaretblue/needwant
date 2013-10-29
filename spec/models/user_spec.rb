require 'spec_helper'

describe User do
	let(:user) {User.create(email: "bungee@bungee.com", name: "Bungee Jumper", password: "booliss")}

	it 'should have an id' do
		user.should respond_to(:id)
		user.id.should_not == nil
	end

	it 'should have a password longer than 6 chars' do
		user = User.create(email: "bungee@bungee.com", name: "Bungee Jumper", password: "boo")
		user.should_not respond_to(:id)
	end

end
