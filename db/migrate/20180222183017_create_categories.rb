class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
    	t.string :name
    	t.integer :created_by, index: true, default: ""
    	t.integer :color, default: 0
      t.timestamps
    end
  end
end
