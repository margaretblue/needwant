class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.integer :wishlist_id
      t.string :brand
      t.string :domain
      t.string :title
      t.string :price
      t.string :url
      t.string :domain_url
      t.string :image
      t.string :category

      t.timestamps
    end
    add_index :items, [:wishlist_id, :created_at]
  end
end
