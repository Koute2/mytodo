class CreateWorks < ActiveRecord::Migration[5.1]
  def change
    create_table :works do |t|
    	t.integer :user_id, index: true
    	t.string :title, default: ""
    	t.text :body, default: ""
    	t.datetime :finished_at, index: true
      t.timestamps
    end
  end
end
