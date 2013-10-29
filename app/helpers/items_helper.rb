module ItemsHelper
	def price_to_int(strPrice)
 		@price_int = strPrice.gsub(/\D/, '').to_i
	end

	def get_price_from_api(url)
		request = Typhoeus.get("http://api.diffbot.com/v2/product?token=724c0cf09e8b60fed6bc864be0ce2205&url=#{url}")
		results = JSON.parse(request.body)
		if results["error"]
			nil
		else 
			results["products"][0]["offerPrice"]
		end
	end
end
