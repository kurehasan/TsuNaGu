class Message < ApplicationRecord
  belongs_to :company
  belongs_to :student

  validates :content, presence: true
end