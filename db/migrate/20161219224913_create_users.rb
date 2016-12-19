class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :name
      t.string :phone_number
      t.string :country_code
      t.string :authy_id
      t.integer :authy_status, null: false, default: 0
      t.string :uuid

      t.timestamps null: false
    end
  end
end
