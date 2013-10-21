class Item < ActiveRecord::Base
  attr_accessible :brand, :category, :domain, :domain_url, :image, 
  					:price, :title, :url, :wishlist_id
  belongs_to :wishlist
  

end
