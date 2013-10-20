Needwant::Application.routes.draw do

  root  to: 'static_pages#home'
  resources :users
  get '/signup' =>  'users#new'
 
end
