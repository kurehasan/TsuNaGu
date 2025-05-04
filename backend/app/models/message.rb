class Message < ApplicationRecord
  belongs_to :company
  belongs_to :student

  valibates :content, presence: true
end
