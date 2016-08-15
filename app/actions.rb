require 'json'

get '/' do
  erb :'index'
end

get '/game' do
  session[:game] = Game.new
  erb :'game/index'
end

post '/game/ask' do
  begin
    session[:game].evaluate(params[:query].to_s) ? "Yes" : "No"
  rescue Game::InvalidQueryError => e
    e.message
  rescue NameError => e
    "not sure"
  end
end

post '/game/solve' do
  if session[:game].winner?(params[:solution])
    "Correct! The terrible burden of immortality is forever yours to bear. Congratulations!"
  else
    "Oh no! You were wrong! You frown before embarking on the long, mildly unpleasant ride home."
  end
end
