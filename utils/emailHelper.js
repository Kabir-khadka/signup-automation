const imaps = require('imap-simple');

async function fetchOtpFromEmail(imapConfig) {
  try {
    const connection = await imaps.connect(imapConfig);
    
    // Try INBOX first, then Spam if not found
    const boxesToCheck = ['INBOX', '[Gmail]/Spam'];
    
    for (const boxName of boxesToCheck) {
      console.log(`   Checking ${boxName}...`);
      
      try {
        await connection.openBox(boxName);
      } catch (boxError) {
        console.log(`   Could not open ${boxName}, trying next...`);
        continue;
      }

      // Search for UNSEEN (unread) emails from the sender
      const searchCriteria = [
        ['FROM', 'no-reply@theauthorizedpartner.com'],
        'UNSEEN'
      ];
      
      const fetchOptions = { 
        bodies: ['TEXT', ''], 
        markSeen: false
      };

      const results = await connection.search(searchCriteria, fetchOptions);
      
      if (results.length === 0) {
        console.log(`   No unread OTP emails found in ${boxName}`);
        continue;
      }

      console.log(`   Found ${results.length} unread email(s) in ${boxName}`);

      // Get the most recent unread email
      const sortedResults = results.reverse();
      
      for (const message of sortedResults) {
        let emailBody = '';
        
        // Try TEXT part first
        const textPart = message.parts.find(part => part.which === 'TEXT');
        if (textPart && textPart.body) {
          emailBody = textPart.body;
        }
        
        // If no TEXT part, try full body
        if (!emailBody) {
          const fullPart = message.parts.find(part => part.which === '');
          if (fullPart && fullPart.body) {
            emailBody = fullPart.body;
          }
        }
        
        // Convert to string if it's a buffer or object
        if (typeof emailBody !== 'string') {
          emailBody = String(emailBody);
        }
        
        console.log('   Email body length:', emailBody.length);
        console.log('   Email preview:', emailBody.substring(0, 200).replace(/\n/g, ' '));
        
        // Extract 6-digit OTP using regex
        const otpMatch = emailBody.match(/\b\d{6}\b/);
        
        if (otpMatch) {
          console.log(`   ✓ Found OTP in ${boxName}: ${otpMatch[0]}`);
          await connection.end();
          return otpMatch[0];
        }
        
        console.log('   No 6-digit OTP pattern found');
      }
      
      console.log(`   No OTP code found in ${boxName}`);
    }
    
    console.log('   No OTP found in any mailbox');
    await connection.end();
    return null;
    
  } catch (error) {
    console.error('   Email connection error:', error.message);
    if (error.stack) {
      console.error('   Stack:', error.stack);
    }
    return null;
  }
}

module.exports = { fetchOtpFromEmail };