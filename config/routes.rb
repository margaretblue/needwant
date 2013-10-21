Needwant::Application.routes.draw do

  root  to: 'static_pages#home'
  resources :users
  get '/help' => 'users#help'
  get '/signup' =>  'users#new'

  resources :sessions, only: [:new, :create, :destroy]
  get '/signin' => 'sessions#new'
  get '/signout' => 'sessions#destroy'

  resources :wishlists
  

  resources :items
 
end
