require 'sinatra'
require 'sinatra/reloader'
require 'haml'

get '/' do
  # LOGIN
  "Welcome to dontforgetthese"
  haml :layout
end

post '/item' do
  item_description = params[:description]
  item_id = params[:id]
end

put '/item/:id' do
end

delete '/item/:id' do
end

