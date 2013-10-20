Needwant::Application.routes.draw do

  root  to: 'static_pages#home'
  resources :users
  resources :sessions
  get '/help' => 'users#help'
  get '/signup' =>  'users#new'
  get '/signin' => 'sessions#new'
  get '/signout' => 'sessions#destroy'
 
end
