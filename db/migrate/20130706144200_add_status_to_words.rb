class AddStatusToWords < ActiveRecord::Migration
  def change
    add_column :words, :status, :string
  end
end
