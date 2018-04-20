class Work < ApplicationRecord
	belongs_to :user

	validates :user_id, presence: true
	validates :title, length: { maximum: 255 }
	validates :body, length: { maximum: 4096 }
end
