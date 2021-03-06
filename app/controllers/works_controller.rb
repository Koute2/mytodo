class WorksController < ApplicationController
	before_action :authenticate_user!, except: :index

	def index
		if user_signed_in?
			all_works = current_user.works.reverse_order
			@works = all_works.select{|work| work.finished_at == nil}
			@done = all_works.select{|work| work.finished_at != nil}
			if @works.blank?
				work = current_user.works.create
				@works = []
				@works.push(work)
			end
		end
	end

	def create
		work = current_user.works.new
		if work.save
			render json: work
		else
			head :no_content
		end
	end

	def update
		@work = current_user.works.find(params[:id])
		@work.update(work_params)
		head :no_content
	end

	def destroy
		work = current_user.works.find(params[:id])
		work.destroy
		head :no_content
	end

	private
		def work_params
			params.require(:work).permit(:title, :body, :user_id, :finished_at)
		end
end
