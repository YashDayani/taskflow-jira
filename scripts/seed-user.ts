import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:')
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Set' : 'MISSING')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set' : 'MISSING')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function seedUser() {
  console.log('Creating test user...')

  try {
    const { data: existingUser, error: checkError } = await supabase.auth.admin.listUsers()

    if (checkError) {
      console.error('Error checking existing users:', checkError)
      throw checkError
    }

    const testEmail = 'yashdayani0@gmail.com'
    const existingTestUser = existingUser?.users.find(u => u.email === testEmail)

    if (existingTestUser) {
      console.log('Test user already exists:', testEmail)
      console.log('User ID:', existingTestUser.id)
      return
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: testEmail,
      password: 'password123',
      email_confirm: true,
      user_metadata: {
        full_name: 'Test User'
      }
    })

    if (error) {
      console.error('Error creating user:', error)
      throw error
    }

    console.log('Test user created successfully!')
    console.log('Email:', testEmail)
    console.log('Password: password123')
    console.log('User ID:', data.user?.id)

    await supabase.from('profiles').upsert({
      id: data.user?.id,
      email: testEmail,
      full_name: 'Test User'
    })

    console.log('Profile created successfully!')
  } catch (error) {
    console.error('Seed failed:', error)
    process.exit(1)
  }
}

seedUser()
