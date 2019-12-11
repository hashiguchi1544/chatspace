class Group < ApplicationRecord
  has_many :user_groups
  has_many :users, through: :user_groups
  validates :name, presence: true, uniqueness: true
  has_many :messages

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
