# app/models/company.rb
class Company < ApplicationRecord
  has_many :messages, dependent: :destroy
  # DeviseTokenAuth 用の処理を include
  include DeviseTokenAuth::Concerns::User
end
