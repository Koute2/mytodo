class WorksController < ApplicationController
	# skip_before_action :verify_authenticity_token, if: :json_request?
	# skip_before_action :authenticate_user!, if: :json_request?

  	# def json_request?
   #  	request.format.json?
   #  end

	def index
		@works = current_user.works.reverse_order
		if @works.empty?
			work = current_user.works.create
			@works = []
			@works.push(work)
		end
	end

	def create
		@work = current_user.works.create
		@works = current_user.works.reverse_order
		render :index
	end

	def update
		@work = current_user.works.find(params[:id])
		@work.update(work_params)
	end

	def destroy
		work = current_user.works.find(params[:id])
		work.destroy
	end

	private
		def work_params
			params.require(:work).permit(:title, :body, :user_id, :status)
		end
end
