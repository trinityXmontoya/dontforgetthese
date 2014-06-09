require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'haml'
require 'mongo'
require 'json'

DB = Mongo::Connection.new.db("todo_app", :pool_size => 5,
  :timeout => 5)
todos = DB.collection('todos')

  get '/' do
    # LOGIN
    "Welcome to dontforgetthese"
    haml :layout
  end

  get '/api/todos' do
    todos.find.to_a.map{|t| from_bson_id(t)}.to_json
  end

  post '/api/todo' do
    todo_description = params[:description]
    new_todo = {
      description: todo_description,
      done: false
    }
    todos.insert(new_todo)
  end

  put '/api/todo/:id' do
    todo = todos.find('id' => tobson_id(params[:id]))
    # todos.update({ _id: todo_id }, { $set: {
    #     description: params[:description] }
    #   });
  end

  delete '/api/todo/:id' do
    todos.remove('_id' => tobson_id(params[:id]))
  end

  def to_bson_id(id)
    BSON::ObjectId.from_string(id)
  end

  def from_bson_id(obj)
    obj.merge({'_id' => obj['_id'].to_s})
  end

