require 'json'

get '/' do
  session[:game] = Game.new
  erb :index
end

post '/ask' do
  begin
    session[:game].evaluate(params[:query].to_s) ? "Yes" : "No"
  rescue Game::InvalidQueryError => e
    e.message
  rescue NameError => e
    "I don't know this language?"
  end
end
