# SESSIONS
use Rack::Session::Pool, :expire_after => 2592000

# GEMS
require 'rubygems'
require 'sinatra'
require 'sinatra/reloader'
require 'haml'
require 'mongo'
require 'json'
require 'pry'

# MONGO SETUP
DB = Mongo::Connection.new.db("todo_app", :pool_size => 5,
  :timeout => 5)
TODOS = DB.collection('todos')

# ROUTES
  get '/' do
    haml :welcome
  end

  get '/list' do
    redirect "/list/#{generate_rand_id}"
  end

  get '/list/*:id' do
    session[:list_id] = params[:id]
    haml :list
  end

  get '/api/todos' do
    list_id = session[:list_id].to_i
    TODOS.find(_id: list_id)
          .to_a[0]["notes"]
          .map{|n| n}
          .to_json
  end

  post '/api/todos' do
    list_id = session[:list_id].to_i
    new_todo = JSON.parse(request.body.read)
    TODOS.update({ _id: list_id },
          {"$push"=>
            {notes:
              new_todo }}).to_json
  end

  put '/api/todos/:id' do
    list_id = session[:list_id].to_i
    json = JSON.parse(request.body.read)
    description = json['description']
    done = json['done']
    query =
    TODOS.update({ :_id => list_id },
          { '$set' => {description: description, done: done} }
    );
  end

  delete '/api/todos/:id' do
    list_id = session[:list_id].to_i
    TODOS.update({_id: list_id},
          {"$pull"=> {
            notes:{
              id: params[:id].to_i}}}).to_json
  end


# ADDITIONAL METHODS
def generate_rand_id
  id = SecureRandom.urlsafe_base64(23)
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
