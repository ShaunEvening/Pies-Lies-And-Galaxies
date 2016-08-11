require_relative "alien"
require_relative "space_pie"

class Game

  attr_reader :pie_of_life, :pie_of_vague_discomfort, :misinformian, \
              :veritopian, :zip, :zap, :left, :right

  def initialize
    randomize_pies
    randomize_aliens
  end

  def evaluate(query)
    eval(query)
  end

  private

    def randomize_pies
      @left = SpacePie.new()
      @right = SpacePie.new()
      pie_array = [@left, @right]
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
