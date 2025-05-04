class Api::V1::MessagesController < ApplicationController
  module Api
    module V1
      class MessagesController < ApplicationController
        before_action :authenticate_company!  # 企業のみ送信可能
  
        # POST /api/v1/messages
        def create
          msg = current_company.messages.build(message_params)
          if msg.save
            render json: msg, status: :created
          else
            render json: { errors: msg.errors.full_messages }, status: :unprocessable_entity
          end
        end
  
        # GET /api/v1/messages?student_id=#
        def index
          msgs = Message.where(student_id: params[:student_id])
          render json: msgs, include: [:company], status: :ok
        end
  
        private
  
        def message_params
          params.require(:message).permit(:content, :student_id)
        end
      end
    end
  end
end
