export function getCurrentUser(request, response) {
  response.json({
    user: request.user.toJSON(),
    claims: {
      admin: request.firebaseToken?.admin === true,
    },
  })
}
