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

get '/game/give-up' do
  output = "Zip was "
  output += if session[:game].zip == session[:game].veritopian
      "the Veritopian.<br/>Zap was the Misinformian.<br/>"
    else
      "the Misinformian.<br/>Zap was the Veritopian.<br/>"
    end
  output += if session[:game].red_pie == session[:game].pie_of_life
      "The red pie was the pie of life.<br/>The purple pie was the pie of vague discomfort.<br/>"
    else
      "The red pie was the pie of vague discomfort.<br/>The purple pie was the pie of life.<br/>"
    end
  return output
end
