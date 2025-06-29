import crypto from 'crypto'

/**
 * Hash a password using bcrypt-like algorithm
 * In production, use bcrypt or argon2
 */
export async function hashPassword(password: string): Promise<string> {
  // For demo purposes, using a simple hash
  // In production, use: return bcrypt.hash(password, 12)
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // For demo purposes, using a simple verification
  // In production, use: return bcrypt.compare(password, hashedPassword)
  const [salt, hash] = hashedPassword.split(':')
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
  return hash === verifyHash
}

/**
 * Generate a random token for email verification, password reset, etc.
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Generate a JWT token
 */
export function generateJWT(payload: any, expiresIn: string = '24h'): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (expiresIn === '24h' ? 86400 : 3600) // 24 hours or 1 hour
  
  const jwtPayload = {
    ...payload,
    iat: now,
    exp: exp
  }
  
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url')
  const encodedPayload = Buffer.from(JSON.stringify(jwtPayload)).toString('base64url')
  
  const signature = crypto
    .createHmac('sha256', process.env.JWT_SECRET || 'fallback-secret')
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64url')
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}

/**
 * Verify and decode a JWT token
 */
export function verifyJWT(token: string): any {
  try {
    const [encodedHeader, encodedPayload, signature] = token.split('.')
    
    const expectedSignature = crypto
      .createHmac('sha256', process.env.JWT_SECRET || 'fallback-secret')
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url')
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid signature')
    }
    
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString())
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired')
    }
    
    return payload
  } catch (error) {
    throw new Error('Invalid token')
  }
}

/**
 * Generate a session token
 */
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Generate a refresh token
 */
export function generateRefreshToken(): string {
  return crypto.randomBytes(64).toString('hex')
} 