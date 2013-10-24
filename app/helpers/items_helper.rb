module ItemsHelper
	def price_to_int(strPrice)
		@price_int = strPrice.gsub(/\D/, '').to_i
	end
end
