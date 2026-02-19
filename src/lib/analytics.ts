// Analytics utility - will be implemented in Phase 6
export function trackPageView(page: string) {
  // TODO: Implement with Supabase
  console.log("Page view:", page);
}

export function trackEvent(event: string, data?: Record<string, unknown>) {
  // TODO: Implement with Supabase
  console.log("Event:", event, data);
}
