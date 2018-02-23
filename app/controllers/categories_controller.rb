class CategoriesController < ApplicationController
	def create
		@category = Category.new(category_params)
		@category.created_by = current_user.id
		@category.save
	end

	def update
		@category = Category.find(params[:id])
		if @category.created_by == current_user.id
			@category.update(category_params)
		end
	end

	def destroy
		category = Category.find(params[:id])
		if category.created_by == current_user.id
			category.destroy
		end
	end

	private
		def category_params
			params.require(:category).permit(:name, :created_by, :color)
		end
end
