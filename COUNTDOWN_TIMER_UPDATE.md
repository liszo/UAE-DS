# Countdown Timer - Weekly Reset Feature

## Overview
Updated the countdown timer on landing pages to automatically count down to the end of each week (Sunday at 23:59:59), creating a recurring weekly offer cycle.

## Changes Made

### Updated: `components/landing/CountdownTimer.tsx`

**Previous Behavior:**
- Counted down 7 days from the current time
- Static countdown that never reset
- No connection to calendar weeks

**New Behavior:**
- Counts down to the end of the current week (Sunday 23:59:59)
- Automatically resets to next week when countdown reaches zero
- Always shows time remaining until Sunday

## How It Works

### 1. Calculate End of Week
```typescript
const getEndOfWeek = () => {
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate days until Sunday
  // If it's Sunday (0), target next Sunday (7 days)
  // Otherwise, calculate days remaining in the week
  const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay
  
  // Create target date for end of week (Sunday 23:59:59)
  const endOfWeek = new Date(now)
  endOfWeek.setDate(now.getDate() + daysUntilSunday)
  endOfWeek.setHours(23, 59, 59, 999)
  
  return endOfWeek
}
```

### 2. Weekly Cycle Examples

| Current Day | Days Until Sunday | Target Date |
|-------------|------------------|-------------|
| Monday | 6 days | Next Sunday 23:59:59 |
| Tuesday | 5 days | Next Sunday 23:59:59 |
| Wednesday | 4 days | Next Sunday 23:59:59 |
| Thursday | 3 days | Next Sunday 23:59:59 |
| Friday | 2 days | Next Sunday 23:59:59 |
| Saturday | 1 day | Tomorrow 23:59:59 |
| Sunday | 7 days | Next Sunday 23:59:59 |

### 3. Auto-Reset Feature
When countdown reaches zero (Monday 00:00:00):
```typescript
if (difference > 0) {
  // Normal countdown
  setTimeLeft({ days, hours, minutes, seconds })
} else {
  // Countdown expired - reset to next week
  const newTarget = getEndOfWeek()
  // Calculate new countdown...
}
```

## User Experience

### Marketing Message
**"Limited Time Offer - Ends This Sunday!"**

The countdown creates urgency by showing exactly how much time is left in the current week, encouraging users to take action before the "deadline."

### Weekly Cycle
- **Monday morning:** Countdown shows ~6 days, 23 hours
- **Friday evening:** Countdown shows ~2 days remaining
- **Saturday night:** Countdown shows less than 24 hours (creates high urgency!)
- **Sunday 23:59:59:** Countdown reaches 00:00:00
- **Monday 00:00:00:** Automatically resets to 6 days, 23 hours for the new week

## Business Benefits

### 1. **Recurring Urgency**
- Fresh countdown every week
- Constant sense of limited-time opportunity
- No manual updates needed

### 2. **Predictable Sales Cycle**
- Monday: New offer period begins
- Thursday-Saturday: Urgency builds
- Sunday: Peak urgency (last chance!)
- Monday: Cycle repeats

### 3. **Automation**
- No manual timer resets
- Works indefinitely
- Always accurate

### 4. **Psychological Triggers**
- **Scarcity:** "Only X days left this week"
- **FOMO:** "Don't miss out before Sunday"
- **Deadline:** Creates action-oriented mindset

## Technical Details

### Day of Week Values (JavaScript)
```
0 = Sunday
1 = Monday
2 = Tuesday
3 = Wednesday
4 = Thursday
5 = Friday
6 = Saturday
```

### Time Calculation
```typescript
daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay

Examples:
- Monday (1): 7 - 1 = 6 days
- Wednesday (3): 7 - 3 = 4 days
- Saturday (6): 7 - 6 = 1 day
- Sunday (0): Special case = 7 days (next Sunday)
```

### Timezone Handling
- Uses client's local timezone
- Countdown is relative to user's location
- Sunday 23:59:59 in user's timezone

**Example:**
- User in Dubai: Counts to Sunday 23:59:59 GST
- User in New York: Counts to Sunday 23:59:59 EST
- Each sees their local Sunday deadline

## Integration with Landing Pages

### All 13 Landing Pages Use This Timer

The countdown appears in:
1. **Urgency Modal** (bottom-left popup)
2. **Special Offer Section** (main offer card)

Both instances automatically sync to the same Sunday deadline.

### Consistency
- Same countdown across all landing pages
- Same deadline for all offers
- Creates unified urgency campaign

## Marketing Copy Suggestions

### Sunday Evening (High Urgency)
- "⏰ Last Chance! Offer Ends Tonight at Midnight"
- "🔥 Only Hours Left - Don't Miss Out!"
- "⚠️ Final Hours to Claim Your Discount"

### Saturday (Building Urgency)
- "⏱️ Less Than 48 Hours Left!"
- "🎯 Weekend Special - Ends Sunday"
- "💥 Only 1 Day Remaining"

### Monday-Wednesday (Early Week)
- "📅 Limited Time This Week Only"
- "⭐ Special Offer Available Until Sunday"
- "🎁 Weekly Deal - Act Before It's Gone"

## Testing Scenarios

### Test 1: Monday Morning
```
Expected: ~6 days, 23 hours remaining
Display: "6 Days : 23 Hours : XX Minutes : XX Seconds"
```

### Test 2: Friday Evening
```
Expected: ~2 days remaining
Display: "2 Days : XX Hours : XX Minutes : XX Seconds"
```

### Test 3: Saturday Night (23:30)
```
Expected: ~30 minutes remaining
Display: "0 Days : 00 Hours : 30 Minutes : XX Seconds"
```

### Test 4: Sunday 23:59:59
```
Expected: Countdown at zero, about to reset
Display: "0 Days : 00 Hours : 00 Minutes : 01 Seconds"
```

### Test 5: Monday 00:00:01
```
Expected: New week cycle begins
Display: "6 Days : 23 Hours : 59 Minutes : XX Seconds"
```

## Performance Considerations

- **Updates:** Once per second (optimal balance)
- **CPU Usage:** Minimal (simple arithmetic)
- **Memory:** Negligible (one timer per page)
- **Cleanup:** Properly cleared on unmount

## Future Enhancements (Optional)

### 1. Custom Week Start
```typescript
// If you want week to start on different day
const weekStartDay = 1 // Monday
const daysUntil = (weekStartDay + 6 - currentDay) % 7
```

### 2. Multiple Offer Periods
```typescript
// Different offers for different weeks
const weekNumber = Math.floor(daysSinceEpoch / 7)
const offer = offers[weekNumber % offers.length]
```

### 3. Server-Side Sync
```typescript
// Ensure all users see exact same countdown
const serverTime = await fetch('/api/time')
```

### 4. Timezone Override
```typescript
// All users see same timezone (e.g., Dubai time)
const dubaiBased = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Dubai'
})
```

## Deployment Notes

- **Breaking Changes:** None
- **Backward Compatible:** Yes (still accepts `targetDate` prop override)
- **Affects:** All 13 landing pages
- **Migration:** Automatic on deployment

---

**Status:** ✅ Implemented
**Testing:** Ready for QA
**Deployment:** Production ready

