var ManagementClient = require('auth0').ManagementClient;



export default function signupHandler(body) {
  console.log('inside signupHandler');
  console.log(body);
  var auth0 = new AuthenticationClient({
    domain: 'alex-testserverless.auth0.com',
    clientId: 'y8UiqFQHdNf70QwUxDVhEME26iHsjPsO',
    clientSecret: 'lB00lalW4_vyrM1q4RLhsZg4S65irIVkk_rmJ3b1ZjGWfHN6CiJrhJUZUTc1_2lq',
    scope: "read:users write:users",
  });
  console.log(auth0);
  auth0.signup({
    connection: 'Room-test1',
    email: 'test@erginergi.com',
    password: 'PASSWORD',
    user_metadata: { plan: 'silver', team_id: 'a111' }
  }, function (err) {
    if (err) return alert('Something went wrong: ' + err.message);
      console.log('success signup without login!')
  });

}
