class Item < ActiveRecord::Base
  attr_accessible :brand, :category, :domain, :domain_url, :image, 
  					:price, :title, :url, :wishlist_id
  belongs_to :wishlist
  belongs_to :user
  default_scope -> { order('created_at DESC') }
  validates :wishlist_id, presence: true

end
