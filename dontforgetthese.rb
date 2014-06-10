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
    "Welcome to dontforgetthese"
    haml :layout
  end

  get '/api/todos' do
    todos.find.to_a.map{|t| from_bson_id(t)}.to_json
  end

  post '/api/todos' do
    # could do just JSON.parse(request.body.read) as the new_todo object but felt this was clearer for now as I'm learning!
    description = JSON.parse(request.body.read)['description']
    new_todo = {
      description: description,
      done: false
    }
    todos.insert(new_todo)
  end

  put '/api/todos/:id' do
    json = JSON.parse(request.body.read)
    description = json['description']
    done = json['done']
    todos.update({ :_id => to_bson_id(params[:id]) }, { '$set' => {description: description, done: done} }
    );
  end

  delete '/api/todos/:id' do
    todos.remove('_id' => to_bson_id(params[:id]))
  end

  def to_bson_id(id)
    BSON::ObjectId.from_string(id)
  end

  def from_bson_id(obj)
    obj.merge({'_id' => obj['_id'].to_s})
  end
