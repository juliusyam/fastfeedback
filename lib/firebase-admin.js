import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "fast-feedback-demo-f267b",
      private_key_id: "81921ac5834654415d75d40a5e25f28c8abbd5ea",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+k1yv1j+UFl4A\nwGRvr28lPEGCP78vjnjtcWsn78JIJqGjbTLC5HPMrxOXb9QIuO1jUJwUT45bhx0X\nskCZ7/S5ihdtVsIV8lUVmEySe8w+vla+wS3RTzmDtX69NVZ9rOtquI75tuwkXyOv\nX33vJe1Lb1xbs3N+hRVbTZGZs3HJoj/X6OwVW6jpkOZoT/3vK3AWJdiqDj7ZYQWJ\nsjIrrcbOVGUWR3zVi5lOonMRGNtuarNfIgYo7t5KZ7eIg5n8Vcuv57fNASfylxMw\nXOE+xnSJCm7+Nx0IAv5zVpl9N0ZowqvwmxkWyqyihmqxryhPMN0nnc6YYJbEz5w1\nkWbmdMLnAgMBAAECggEAE5T0uySal87Mjes25rryArN0T7vZGzvadRtoVUwvfFZr\n2W0JADmVJH0A2FinQtYtnjzULMoX6JOzi5HHTYn4bXAhBB0cCEFEONnTVGHgFLpe\nE2+qE42+bSgjA7INVxCDiA26szH2ha447nYzbHVLMqsYpFuGDIQEM8N+qHplwL/7\ningcjIVAlza3mnNgcHmVJs4LJEhPAlJidr4tg1g7F4QbC0bxiVHDmkiQDwaQ7x6Q\nh7M2E301fv6zdcdeEVEaZKVr9JE4Vwss7jl+EhM4ThERYEwC2qUnx+z+0fuRPSWX\n5y89sFA66dzpX9fNtaHVtofq+BavKeZRvDazfnOkoQKBgQD0oGTms1kg9qYHnRVn\nwZw0ObTyQ4sNaVy8lpBP/45qbVwECtzVOJrUa4jsB9Xg5HHZK+wDjunUBSJWsfY0\nQeHPv95ICBdiRUg5JSr5nJpulxXvtlhbsbc77VCsbP/6RyZ2ZEE2xmoZPw7G1V5B\n6M729YybYe25EnVY8YpPCCQaqQKBgQDHb6P96F26MDnCsZGcCb9gV33T1hKKXwIz\nxRvKi2aCoe6gLLgZuinViUyvHugyqZ7X/CxwSg+lrCKJzRfIFnvAHCR7LKb7RQKr\nJ51nJ90C7lRRnA+Zn5cq390RhYTNvSPi8qWUK4E5DxQRKoIcGZt6+fg0WllY/57v\nAH6gdEh7DwKBgQCZhSNtqPZxenkd5BYv5FCMcf6932efxhS+AduVaPNOlU0e+FY4\nteptDwOB5TTzi0prmWXnocPbHFG9iLfTedkmEOqF2BYcxRAbVNkQh5hfeQ/6PTxc\nZz5wLHHplApdXlOkDyziHEkviORUIkmiIWHpmJZiWWXgNNZSOFutV5WY6QKBgG1x\nOlEPvr95z3ij8P/r6XV5Dbe99haw5Ih8Vi/kJ7DwI/8KC00y99oSql4/W7TRmDV2\nUPyd59BGkf2E6tQGYoqd5vchHdEtobVC3AHLwmDlYKgYOAdZqJ8CklIXLzWn4ZWd\nCngxF4y0VZLF/PhmpQfrPOWd3wIT5KfLYbGznkLJAoGBAI3OIE5bMQi4PGRNZvE7\nvh+M2bMQZTgsgEX166dM7pFiCrN3lWjEj8eVT+F215YTbfJCYXVQH0uRTPXE2lMn\ngEQCYXGnAzllNZKN4BiDlyDFmGAurWRlME0TOX/zGc3WVnVxRrzdAI5piur4mw2e\n7zU3fNVZOtBGa2alTJOWnRns\n-----END PRIVATE KEY-----\n",
      client_email: "firebase-adminsdk-yq145@fast-feedback-demo-f267b.iam.gserviceaccount.com",
      client_id: "110073251599668860454",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yq145%40fast-feedback-demo-f267b.iam.gserviceaccount.com"
    }),
    databaseURL: "https://fast-feedback-demo-f267b-default-rtdb.firebaseio.com"
  });
}

const auth = admin.auth();
const adminDatabase = admin.firestore();

export { auth, adminDatabase };