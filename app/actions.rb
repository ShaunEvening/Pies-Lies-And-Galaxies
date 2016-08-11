require 'json'

get '/' do
  session[:game] = Game.new
  erb :index
end

post '/ask' do
  session[:game].evaluate(params[:query])
end
