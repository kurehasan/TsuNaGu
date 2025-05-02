# app/models/company.rb
class Company < ApplicationRecord
  # DeviseTokenAuth 用の処理を include
  include DeviseTokenAuth::Concerns::User
end
