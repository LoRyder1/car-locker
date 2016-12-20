class MainController < ApplicationController
  def index
    @garages = Garage.all
  end
end
