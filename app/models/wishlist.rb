class Wishlist < ActiveRecord::Base
  attr_accessible :user_id

  belongs_to :user
  has_many :items 
end
