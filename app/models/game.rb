require_relative "alien"

class Game

  class InvalidQueryError < StandardError
  end

  attr_reader :pie_of_life, :pie_of_vague_discomfort, :misinformian, \
              :veritopian, :zip, :zap, :red_pie, :purple_pie

  def initialize
    randomize_pies
    randomize_aliens
  end

  def evaluate(query)
    return eval(query) unless query.empty?
    raise InvalidQueryError, "nothing"
  end

  def winner?(solution)
    eval(solution) == pie_of_life
  end

  private
    def randomize_pies
      @red_pie = 0
      @purple_pie = 1
      random_number = (rand(100) % 2)
      @pie_of_life = random_number
      @pie_of_vague_discomfort = 1 - random_number
    end

    def randomize_aliens
      alien_array = [Alien.new(false, self), Alien.new(true, self)]
      @misinformian = alien_array[0]
      @veritopian = alien_array[1]
      random_number = (rand(100) % 2)
      @zip = alien_array[random_number]
      @zap = alien_array[1 - random_number]
    end
end
