class Category < ApplicationRecord
	has_many :subscribes, dependent: :destroy
	belongs_to :user
end
