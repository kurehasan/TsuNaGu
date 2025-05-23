Rails.application.routes.draw do
  # Student 用の認証エンドポイント
  mount_devise_token_auth_for  'Student', at: 'student_auth', controllers: {           # 必要ならコントローラをカスタム
      registrations: 'auth/registrations',
      sessions:      'auth/sessions'
  }
  
  

  # Company 用の認証エンドポイント
  mount_devise_token_auth_for(
    'Company',
    at:      'company_auth',
    controllers: {
      registrations: 'auth/registrations',
      sessions:      'auth/sessions'
    }
  )

  # config/routes.rb
  namespace :api do
    namespace :v1 do
      get "students/index"
      get "students/show"
      get 'hello', to: 'hello#index'
      resources :users, only: [:index]
      resources :students, only: [:index, :show]
      resources :messages, only: [:index, :show, :create]
    end
  end

end
