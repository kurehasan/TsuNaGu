class DeviseTokenAuthCreateCompanies < ActiveRecord::Migration[7.2]
  def change
    create_table(:companies) do |t|
      ## Required
      t.string :provider, null: false, default: "email"
      t.string :uid,      null: false, default: ""
      t.string :email,    null: false, default: ""

      ## Database authenticatable
      t.string :encrypted_password, null: false, default: ""

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      ## Tokens
      t.json :tokens

      t.string :company_name
      t.text   :description

      t.timestamps
    end

    add_index :companies, :email,                unique: true
    add_index :companies, [:uid, :provider],     unique: true
    add_index :companies, :reset_password_token, unique: true
  end
end
