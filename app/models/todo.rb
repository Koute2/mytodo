class Todo < ApplicationRecord
	has_many :subscribes, dependent: :destroy
	has_many :categories, through: :subscribes
	has_many :tasks, dependent: :destroy
	belongs_to :user

	accepts_nested_attributes_for :subscribes, :tasks
end
