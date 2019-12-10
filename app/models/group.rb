class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups
  validates :name, presence: true, uniqueness: true

  has_many :user_groups
  has_many :groups, through: :user_groups
end
