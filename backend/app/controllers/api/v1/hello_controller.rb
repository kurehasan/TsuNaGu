class Api::V1::HelloController < ApplicationController
  def index
    render json: { message: "こんにちは from Rails API!" }
  end
end
