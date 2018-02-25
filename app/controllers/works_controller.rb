class WorksController < ApplicationController
	def index
		@work = Work.new
		@works = current_user.works.to_a
		#この行は動くかどうか怪しい
		#@categories = Category.where(created_by: nil || current_user.id).to_a
	end

	def create
		@work = current_user.works.create(work_params)
		index
	end

	def update
		@work = Work.find(params[:id])
		@work.update(work_params)
		index
	end

	def destroy
		work = Work.find(params[:id])
		work.destroy
		index
	end

	private
		def work_params
			params.require(:work).permit(
				:title, :body, :user_id, :status,
				task_attributes: [:user_id, :body, :status],
				subscribe_attributes: [:user_id, :category_id]
				)
		end
end
