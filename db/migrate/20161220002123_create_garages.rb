class CreateGarages < ActiveRecord::Migration
  def change
    create_table :garages do |t|
      t.string :make
      t.string :model
      t.integer :year
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
