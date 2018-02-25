class WorksController < ApplicationController
	def index
		if user_signed_in?
			@works = current_user.works.includes(:tasks, :categories)
			#この行は動くかどうか怪しい
			@categories = Category.where(created_by: nil || current_user.id)
			@signed_in = true
		else
			@signed_in = false
		end
	end

	def create
		@work = Work.create(user_id: current_user.id)
	end

	def update
		@work = Work.find(params[:id])
		@work.update(work_params)
	end

	def destroy
		work = Work.find(params[:id])
		work.destroy
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
