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
    "Welcome to dontforgetto"
    haml :layout
  end

  get '/api/todos' do
    todos.find.to_a.map{|t| from_bson_id(t)}.to_json
  end

  post '/api/todos' do
    # could do just JSON.parse(request.body.read) as the new_todo object but felt this was clearer for now as I'm learning!
    description = filter_for_icons(JSON.parse(request.body.read)['description'])
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

  def keyword_list
    [
    "anchor","ambulance","android","apple","automobile","bell","bitcoin","bomb","book","briefcase","bug","cab","calendar","camera","car","child","cloud","coffee","cutlery","dollar","dropbox","drupal","envelope","facebook","fire-extinguisher","gear","gift","git","github","google","graduation-cap","heart","headphones","home","instagram","jsfiddle","laptop","list","microphone","minus","money","music","pencil","phone","pinterest","plane","plus","question","reddit","rocket","scissors","search","spoon","star","suitcase","taxi","ticket","tree","trophy","truck","twitter","unlock","wheelchair","youtube"
    ]
  end

  def filter_for_icons(string)
    result = ""
    string.split.each do |word|
      if keyword_list.include? word
        word.gsub! word,"<i class='fa fa-" + word + "'></i>"
      end
      result += " #{word}"
    end
    return result
  end
