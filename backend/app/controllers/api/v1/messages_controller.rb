module Api
  module V1
    class MessagesController < ApplicationController
      # 企業だけが使えるように認証フィルタ
      before_action :authenticate_company!

      # （一覧が必要なら）
      def index
        messages = current_company.messages
        render json: messages, only: [:id, :student_id, :content, :created_at]
      end

      # メッセージ送信（登録）
      def create
        message = current_company.messages.build(message_params)
        if message.save
          render json: message, only: [:id, :student_id, :content, :created_at], status: :created
        else
          render json: { status: 'error', errors: message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # （個別取得が必要なら）
      def show
        message = current_company.messages.find(params[:id])
        render json: message, only: [:id, :student_id, :content, :created_at]
      end

      private

      def message_params
        params
        .require(:message).permit(:student_id, :content)
      end
    end
  end
end
