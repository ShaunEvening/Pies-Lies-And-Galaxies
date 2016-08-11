class Alien

  attr_reader :honest, :game

  def initialize(is_honest, game)
    @honest = is_honest
    @game = game
  end

  def ask(query)
    translate(game.evaluate(query))
  end

  private

    def translate(response)
      if honest
        response ? "Yes" : "No"
      else
        response ? "No" : "Yes"
      end
    end
end
