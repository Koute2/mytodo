class CreateSubscribes < ActiveRecord::Migration[5.1]
  def change
    create_table :subscribes do |t|
    	t.integer :work_id, index: true
    	t.integer :category_id, index: true
      t.timestamps
    end
  end
end
