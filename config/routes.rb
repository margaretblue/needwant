Needwant::Application.routes.draw do
 
  root  to: 'users#new'
  resources :users
  get '/help' => 'users#help'
  get '/signup' =>  'users#new'

  resources :sessions, only: [:new, :create]
  get '/signin' => 'sessions#new'
  delete '/signout' => 'sessions#destroy'

  resources :wishlists

  resources :items
 
end
