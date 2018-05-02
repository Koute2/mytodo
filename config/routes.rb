Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :works, only: [:index, :create, :update, :destroy]
  root "works#index"
  match "/offline", to: "errors#offline", via: :all
end