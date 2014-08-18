#Dont Forget To

Sinatra, Backbone, Mongo, and HAML powered todo-list with word-icon substitution.

My first Backbone, Mongo, and HAML project.
## Installation

App is currently configured for Heroku deployment and requires a `MONGOHQ_URL` environment variable which you can get by adding the [Mongo HQ add-on](https://devcenter.heroku.com/articles/mongohq).

If running locally:
  1. `git clone git@github.com:trinityXmontoya/dontforgetthese.git`
  2. `cd dontforgetthese`
  3. In the server.rb file under the MONGO SETUP section, comment out the HEROKU SETUP section and uncomment the LOCAL
    Your Mongo setup should look as such:
    ```
    # MONGO SETUP
    # LOCAL
    DB = Mongo::Connection.new.db("todo_app", :pool_size => 5,
      :timeout => 5)

    # HEROKU SETUP
    # uri = URI.parse(ENV['MONGOHQ_URL'])
    # db_name = uri.path.gsub(/^\//, '')
    # DB = Mongo::Connection.new(uri.host,uri.port).db(db_name)
    # DB.authenticate(uri.user,uri.password)
    ```
    
  4. Run `server.rb`
The app will now be running on [localhost:4567](http://localhost:4567/)
