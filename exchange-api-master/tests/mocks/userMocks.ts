export const userMock = {
  bodySuccess: {
    username: "user_mock",
    password: "mocked_password"
  },
  bodyValidationFailure: {
    username: "user_mock",
  },
  bodyConflictFailure: {
    username: "user_mock_failure",
    password: "new_mocked_password",
  },
  reponseSuccess: {
    id: 2,
    username: "user_mock",
    password: "c77b4b9c8f835fda0516472997e09f09"
  }
}