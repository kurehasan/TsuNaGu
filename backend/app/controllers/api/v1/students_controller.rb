# app/controllers/api/v1/students_controller.rb
module Api
  module V1
    class StudentsController < ApplicationController
      include DeviseTokenAuth::Concerns::SetUserByToken
      before_action -> { request.env['devise.mapping'] = Devise.mappings[:company] }
      before_action :authenticate_company!

      # 学生一覧を返す
      def index
        students = Student.all
        render json: students, only: [:id, :email, :graduation_year]
      end

      # 特定学生の詳細を返す
      def show
        student = Student.find(params[:id])
        render json: student, only: [:id, :email, :graduation_year]
      end
    end
  end
end
