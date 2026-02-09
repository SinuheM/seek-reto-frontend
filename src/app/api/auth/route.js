import jwt from 'jsonwebtoken';

const ERROR_MESSAGE = 'Email o password incorrectos';

const VALID_USER = {
  email: 'user@seekglobal.co',
  password: '1234567aA@',
  name: 'Juan Pérez'
}

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;
 
  if (email === VALID_USER.email && password === VALID_USER.password) {
    const userData = {
      id: Date.now(),
      email,
      name: VALID_USER.name,
    };

    const token = jwt.sign({
      userData
    }, 'secret', { expiresIn: 60 * 60 * 24 * 30 });

    return new Response(JSON.stringify({ token, userData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ error: ERROR_MESSAGE }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' }
  });
}