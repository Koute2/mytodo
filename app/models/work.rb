class Work < ApplicationRecord
	has_many :subscribes
	has_many :categories, through: :subscribes
	has_many :tasks
	belongs_to :user

	accepts_nested_attributes_for :subscribes
	accepts_nested_attributes_for :tasks
end
