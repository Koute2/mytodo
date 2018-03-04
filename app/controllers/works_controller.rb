class WorksController < ApplicationController
	# skip_before_action :verify_authenticity_token, if: :json_request?
	# skip_before_action :authenticate_user!, if: :json_request?

  	# def json_request?
   #  	request.format.json?
   #  end

	def index
		@works = current_user.works.reverse_order.to_a
		#この行は動くかどうか怪しい
		#@categories = Category.where(created_by: nil || current_user.id).to_a
	end

	def create
		@work = current_user.works.create(title: "", body: "")
		@works = current_user.works.reverse_order
		render :index
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
