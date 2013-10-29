
class Rectangle 

	def initialize(height, width)
	@height = height
	@width = width	
	end


	def area
		@height * @width
	end

	def perimeter
		2 * (@height + @width)
	end

end

rectangle_side_1 = 5
rectangle_side_2 = 6

# puts area(rectangle_side_1, rectangle_side_2)
# puts perimeter(rectangle_side_1,rectangle_side_2)

r = Rectangle.new(rectangle_side_1, rectangle_side_2)

puts r.area

