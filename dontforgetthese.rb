require 'sinatra'
require 'sinatra/reloader'
require 'haml'

get '/' do
  # LOGIN
  "Welcome to dontforgetthese"
end

get '/items' do
  @items = ["i","hate","you"]
  # @item = Item.new
  haml :layout
end

post '/item' do
  item_content = params[:content]
  item_id = params[:id]
end

put '/item/:id' do
end

delete '/item/:id' do
end

