class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
    	t.integer :work_id, index: true
    	t.string :body
    	t.integer :status, index: true, default: 0
      t.timestamps
    end
  end
end
