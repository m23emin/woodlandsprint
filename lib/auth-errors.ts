/** Map Supabase Auth errors to clearer customer-facing messages. */
export function mapAuthErrorMessage(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("rate limit") || lower.includes("too many")) {
    return "Too many emails were sent recently. Please wait about an hour before trying again, or call (936) 900-3250 for help.";
  }

  if (lower.includes("signup is disabled")) {
    return "Account sign-up is temporarily unavailable. Please contact us for assistance.";
  }

  return message;
}
