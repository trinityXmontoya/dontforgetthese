require 'sinatra'
require 'sinatra/reloader'
require 'haml'
require 'mongo'
require 'json'

DB = Mongo::Connection.new.db("todo_app", :pool_size => 5,
  :timeout => 5)
todos = DB.collection('todos')
def to_bson_id(id) BSON::ObjectId.from_string(id) end

  get '/' do
    # LOGIN
    "Welcome to dontforgetthese"
    haml :layout
  end

  post '/todo' do
    todo_description = params[:description]
    new_todo = {
      description: todo_description,
      done: false
    }
    todos.insert(new_todo)
  end

  put '/todo/:id' do
    todo = todos.find('id' => tobson_id(params[:id]))
    # todos.update({ _id: todo_id }, { $set: {
    #     description: params[:description] }
    #   });
  end

  delete '/todo/:id' do
    todos.remove('_id' => tobson_id(params[:id]))
  end


