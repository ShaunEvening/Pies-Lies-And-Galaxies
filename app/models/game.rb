require_relative "alien"
require_relative "space_pie"

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
      @red_pie = SpacePie.new()
      @purple_pie = SpacePie.new()
      pie_array = [@red_pie, @purple_pie]
      @pie_of_life = pie_array.delete_at(rand(1000) % pie_array.size)
      @pie_of_vague_discomfort = pie_array.pop
    end

    def randomize_aliens
      alien_array = [Alien.new(false, self), Alien.new(true, self)]
      @misinformian = alien_array[0]
      @veritopian = alien_array[1]
      alien_array.shuffle!
      @zip = alien_array[0]
      @zap = alien_array[1]
    end

end
