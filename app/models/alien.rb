class Alien

  attr_reader :honest, :game

  def initialize(is_honest, game)
    @honest = is_honest
    @game = game
  end

  def ask(query)
    game.evaluate(rephrase(query).to_s)
  end

  private
    def rephrase(response)
      honest ? response : !response
    end
end
