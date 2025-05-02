class AddGraduationYearToStudents < ActiveRecord::Migration[7.2]
  def change
    add_column :students, :graduation_year, :integer
  end
end
