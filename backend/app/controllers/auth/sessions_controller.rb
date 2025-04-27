class Auth::SessionsController < DeviseTokenAuth::SessionsController
  private

  def render_create_success
    render json: {
      status: 'success',
      data: resource_data
    }
  end
end
