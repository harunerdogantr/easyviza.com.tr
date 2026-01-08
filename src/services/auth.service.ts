/**
 * Authentication Service
 * 
 * Bu dosya authentication ile ilgili business logic'i içerir.
 * API çağrıları ve authentication işlemleri burada toplanabilir.
 */

export interface RegisterData {
  email: string
  password: string
  name?: string
}

export interface LoginData {
  email: string
  password: string
}

/**
 * Kullanıcı kayıt işlemi
 */
export async function registerUser(data: RegisterData) {
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Kayıt sırasında bir hata oluştu')
  }

  return response.json()
}













