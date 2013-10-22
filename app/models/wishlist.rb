class Wishlist < ActiveRecord::Base
  attr_accessible :user_id
 
  belongs_to :user
  has_many :items, dependent: :destroy
  validates :user_id, presence: true
end
