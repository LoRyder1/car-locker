require "net/http"
require "uri"

class User < ActiveRecord::Base
  has_secure_password
  has_many :garages

  enum authy_status: [:unverified, :onetouch, :sms, :token, :approved, :denied]
  validates :email,  presence: true, format: { with: /\A.+@.+$\Z/ }, uniqueness: true
  validates :name, presence: true
  validates :country_code, presence: true
  validates :phone_number, presence: true

end
