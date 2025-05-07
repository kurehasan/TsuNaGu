# app/models/company.rb
class Company < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  has_many :messages, dependent: :destroy
end