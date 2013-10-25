Needwant::Application.routes.draw do
 
  root  to: 'users#new'

  get '/help' => 'users#help'
  get '/signup' =>  'users#new'

  get '/signin' => 'sessions#new'
  get '/signout' => 'sessions#destroy'
  delete '/signout' => 'sessions#destroy'

  get '/item_form/' =>'items#item_form'
  delete '/items/:id', to: 'itemss#destroy'

  get '/getbookmark' => 'items#getbookmark' 

  resources :users
  resources :sessions, only: [:new, :create]
  resources :wishlists

  resources :items

 
 
end
