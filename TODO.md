# Changes TODO

## 1. Stats cards hover effects
- [ ] StatsSection.tsx - Add whileHover animation

## 2. Dark mode
- [ ] index.css - CSS custom properties
- [ ] AppContext.tsx - Add darkMode state, remove section
- [ ] Layout.tsx - Apply dark class
- [ ] Navbar.tsx - Dark mode toggle, remove RefreshCw/X, update links
- [ ] Footer.tsx - CSS vars
- [ ] Home.tsx - CSS vars, remove Boys/Girls buttons, add section IDs
- [ ] Events.tsx - CSS vars, remove section toggle
- [ ] EventDetail.tsx - CSS vars, remove section badge
- [ ] Register.tsx - CSS vars, fix redirect
- [ ] StatsSection.tsx - CSS vars
- [ ] HowItWorks.tsx - CSS vars, id, update step 2
- [ ] ScheduleSection.tsx - CSS vars, id
- [ ] TestimonialsSection.tsx - CSS vars
- [ ] FaqSection.tsx - CSS vars, id, update FAQ

## 3. Remove RefreshCw/X from navbar
- [ ] (covered in Navbar.tsx above)

## 4. Replace Code Relay with 4 new technical events
- [ ] mock.ts - Delete e1, add Quiz, Coding Contest, Vibeathon, Cyber Hunt

## 5. Remove My Registrations
- [ ] App.tsx - Remove route
- [ ] Navbar.tsx - Replace with section nav buttons
- [ ] Footer.tsx - Remove link
- [ ] Register.tsx - Change redirect to /events

## 6. Remove Boys/Girls sections
- [ ] mock.ts - Remove section from interface and data
- [ ] AppContext.tsx - Remove section state
- [ ] Home.tsx - Remove Boys/Girls buttons
- [ ] Events.tsx - Remove section toggle/filter
- [ ] EventDetail.tsx - Remove section badge
- [ ] HowItWorks.tsx - Update step 2
- [ ] FaqSection.tsx - Update FAQ answer
