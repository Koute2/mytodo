class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
    	t.integer :user_id, index: true
    	t.string :title, index: true
    	t.text :body
    	t.integer :status, index: true, default: 0
      t.timestamps
    end
  end
end
