# README

# chatspace DB設計
## users テーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|name|string|null: false|
### Association
- has_many :tweets
- has_many :user_groups
- has_many :groups, through: :user_groups

## tweets テーブル
|Column|Type|Options|
|------|----|-------|
|message|text||
|photo|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :tweets
- has_many :user_groups
- has_many :users,  through: :user_groups

## user_groups テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group