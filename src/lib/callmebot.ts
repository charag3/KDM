// CallMeBot WhatsApp notification helper
// Docs: https://www.callmebot.com/blog/free-api-whatsapp-messages/
//
// Setup required:
//   1. Send "I allow callmebot to send me messages" to +34 644 59 21 48 on WhatsApp
//   2. Bot replies with your apikey
//   3. Set CALLMEBOT_PHONE and CALLMEBOT_APIKEY in .env.local

const CALLMEBOT_BASE = 'https://api.callmebot.com/whatsapp.php'

/**
 * Sends a WhatsApp notification via CallMeBot.
 * Never throws — returns false on failure so form submissions aren't blocked.
 */
export async function sendWhatsAppNotification(message: string): Promise<boolean> {
  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY

  if (!phone || !apikey) {
    console.warn('[CallMeBot] Missing env vars: CALLMEBOT_PHONE or CALLMEBOT_APIKEY')
    return false
  }

  const encodedMessage = encodeURIComponent(message)
  const url = `${CALLMEBOT_BASE}?phone=${phone}&text=${encodedMessage}&apikey=${apikey}`

  try {
    const res = await fetch(url, { method: 'GET', cache: 'no-store' })
    if (!res.ok) {
      console.error(`[CallMeBot] Request failed: ${res.status} ${res.statusText}`)
      return false
    }
    return true
  } catch (err) {
    console.error('[CallMeBot] Network error:', err)
    return false
  }
}
