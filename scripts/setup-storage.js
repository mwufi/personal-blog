require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function setupStorage() {
  try {
    console.log('Setting up Supabase Storage...')

    // Create documents bucket
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket('documents', {
      public: true,
      allowedMimeTypes: [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ],
      fileSizeLimit: 10485760 // 10MB
    })

    if (bucketError && bucketError.message !== 'Bucket already exists') {
      throw bucketError
    }

    console.log('✅ Documents bucket created/verified')

    // Set up RLS policies
    console.log('Setting up RLS policies...')

    // This would typically be done via SQL in Supabase dashboard
    console.log('⚠️  Please set up these RLS policies in your Supabase dashboard:')
    console.log('')
    console.log('For storage.objects table:')
    console.log('1. Allow authenticated users to insert documents:')
    console.log('   CREATE POLICY "Users can upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = \'documents\' AND auth.role() = \'authenticated\');')
    console.log('')
    console.log('2. Allow users to select their own documents:')
    console.log('   CREATE POLICY "Users can view their documents" ON storage.objects FOR SELECT USING (bucket_id = \'documents\' AND auth.uid()::text = (storage.foldername(name))[1]);')
    console.log('')
    console.log('3. Allow users to delete their own documents:')
    console.log('   CREATE POLICY "Users can delete their documents" ON storage.objects FOR DELETE USING (bucket_id = \'documents\' AND auth.uid()::text = (storage.foldername(name))[1]);')

    console.log('')
    console.log('✅ Storage setup complete!')

  } catch (error) {
    console.error('❌ Error setting up storage:', error.message)
    process.exit(1)
  }
}

setupStorage() 