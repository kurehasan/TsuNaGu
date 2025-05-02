class Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  # サインアップ時に許可するパラメータ
  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :graduation_year)
  end

  # アカウント更新時に許可するパラメータ（必要なら追記）
  def account_update_params
    params.permit(:email, :password, :password_confirmation, :current_password, :role)
  end
end
