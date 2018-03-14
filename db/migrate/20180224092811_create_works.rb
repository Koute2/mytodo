class CreateWorks < ActiveRecord::Migration[5.1]
  def change
    create_table :works, options: 'ENGINE=InnoDB ROW_FORMAT=DYNAMIC' do |t|
    	t.integer :user_id, index: true
    	t.string :title, default: ""
    	t.string :body, default: "", limit: 4096
    	t.datetime :finished_at, index: true
      t.timestamps
    end
  end
end
