Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :todos, only: [:index, :create, :update, :destroy]
  resources :caregories, only: [:create, :update, :destroy]
  root "todos#index"
end
