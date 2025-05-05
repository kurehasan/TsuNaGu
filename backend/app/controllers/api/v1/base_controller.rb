# app/controllers/api/v1/base_controller.rb
module Api
  module V1
    class BaseController < ApplicationController
      include DeviseTokenAuth::Concerns::SetUserByToken

      # すべての子コントローラで Company mapping を有効化
      before_action :set_company_devise_mapping

      private
      def set_company_devise_mapping
        request.env['devise.mapping'] = Devise.mappings[:company]
      end
    end
  end
end
