require 'sinatra'
require 'sinatra/reloader'
require 'haml'

get '/' do
  # LOGIN
  "Welcome to dontforgetthese"
end

get '/items' do
  haml :layout
end

post '/item' do
end

put '/item/:id' do
end

delete '/item/:id' do
end
