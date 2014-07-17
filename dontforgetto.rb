require 'rubygems'
require 'sinatra'
require 'haml'
require 'mongo'
require 'json'
require 'pry'
require 'rack'


# SESSIONS
use Rack::Session::Pool, :expire_after => 2592000

# MONGO SETUP
uri = URI.parse(ENV['MONGOHQ_URL'])
db_name = uri.path.gsub(/^\//, '')
DB = Mongo::Connection.new(uri.host,uri.port).db(db_name)
DB.authenticate(uri.user,uri.password)
LISTS = DB.collection('lists')
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
    LISTS.find(_id: session[:list_id])
          .to_a[0]["notes"]
          .map do |note_id|
            from_bson_id(TODOS.find(_id: note_id).to_a[0])
          end
          .to_json
  end

  post '/api/todos' do
    new_todo = JSON.parse(request.body.read)
    id = TODOS.insert(new_todo)
    LISTS.update({ _id: session[:list_id] },
          {"$push"=>
            {notes: id }}, upsert: true).to_json
  end

  put '/api/todos/:id' do
    json = JSON.parse(request.body.read)
    puts "JSON"
    puts json
    description = json['description']
    done = json['done']
    note_id = to_bson_id(json['_id'])
    TODOS.update({ :_id => note_id },
          { '$set' =>
            {description: description, done: done}
          }
    ).to_json;
  end

  delete '/api/todos/:id' do
    note_id = to_bson_id(params[:id])
    LISTS.update({_id: session[:list_id]},
      {"$pull"=>
        { notes: note_id}
    });
    TODOS.remove({_id: note_id}).to_json
  end

  get '/*' do
    redirect '/'
  end


# ADDITIONAL METHODS
def to_bson_id(id)
   BSON::ObjectId.from_string(id)
end

def from_bson_id(obj)
   obj.merge({'_id' => obj['_id'].to_s})
end

def generate_rand_id
  id = SecureRandom.urlsafe_base64(23)
  list_ids = LISTS.find().to_a.map {|l| l["_id"]}
  (list_ids.include? id) ? generate_rand_id : id
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
