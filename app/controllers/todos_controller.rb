class TodosController < ApplicationController
	def index
		@todos = current_user.todos.includes(:tasks, :categories)
		@categories = current_user.categories + Category.where(created_by: nil)
	end

	def create
		@todo = Todo.create(user_id: current_user.id)
	end

	def update
		@todo = Todo.find(params[:id])
		@todo.update(todo_params)
	end

	def destroy
		todo = Todo.find(params[:id])
		todo.destroy
	end

	private
		def todo_params
			params.require(:todo).permit(:title, :body, :status)
		end
end
