# AI Prompt Journal — Threadly Fashion Recommendation App

**Source → Target:** Concept → React Native/Expo with File-based Routing

This journal logs prompts, summarized responses, and reflections following the 4-step learning flow.

---

## Step 1: Conceptual Understanding

**Prompt (use as-is):**

I want to create a React Native project called Threadly using Expo. 
Before diving into code:
1. What's the difference between Expo and React Native CLI?
2. How does Expo Router's file-based routing work?
3. What are the key considerations for mobile app navigation?
4. What are the limitations I should be aware of?

**Response Summary (concise):**

- **Expo vs CLI:** Expo provides managed workflow with built-in tools; CLI gives more control but requires native setup (Xcode/Android Studio).
- **File-based routing:** Files in `app/` directory automatically become routes; `index.tsx` is the home page; folders create nested routes.
- **Navigation considerations:** Mobile uses stack navigation by default; back buttons are automatic; pass data via params; consider user flow carefully.
- **Limitations:** Expo Go has touch delays on newer Android; some native modules require custom development builds; localStorage/sessionStorage not supported in artifacts.

**Reflection:** Chose Expo for faster development. File-based routing simplifies navigation compared to React Navigation setup. Must plan multi-page flow early.

---

## Step 2: Step-by-Step Breakdown (Concept Focus)

**Concept chosen:** Multi-page Data Flow & State Management

**Prompt:**

I want to understand how to pass user data through multiple pages in my fashion app:
1. How does `useRouter` and `useLocalSearchParams` work in Expo Router?
2. What's the best way to pass data between pages (height, weight, skin tone, color, material)?
3. Should I use global state management or route params?
4. How do I handle form validation across pages?

**Response Summary:**

- **Router hooks:** `useRouter()` provides `push()` method with params; `useLocalSearchParams()` retrieves params in destination page.
- **Data passing:** For simple wizard flows, URL params work well; for complex state, consider Context API or Zustand.
- **Route params approach:** Clean for linear flows; data visible in navigation; easy debugging; limited to serializable data.
- **Form validation:** Validate on each page before allowing navigation; disable buttons until form is complete; store validation state locally.

**Reflection:** Route params are perfect for this linear wizard flow (user details → preferences → recommendations). Simple and transparent. Will consider global state if app grows.

---

## Step 3: Guided Implementation

### Phase 1: Project Setup & Landing Page

**Prompt:**

Guide me to create the Threadly app with Expo. I want:
- A landing page with "Welcome" text (bold, size 50)
- A background image
- A button that navigates to the second page

**Implementation Summary:**

- Created project with `npx create-expo-app@latest Threadly`
- Used `ImageBackground` component for background
- Learned file path resolution: `../../assets/images/` from `app/(tabs)/`
- Used `Link` component with `href` for navigation
- Styled with React Native StyleSheet

**Key Learnings:**
- React Native uses different components than web (`View` not `div`, `Text` not `p`)
- Image requires need correct relative paths from file location
- Expo needs cache clearing (`-c` flag) when adding new assets

---

### Phase 2: User Input Form

**Prompt:**

Add a second page that collects:
- Height (in cm) - numeric input
- Weight (in kg) - numeric input  
- Skin tone - dropdown with 9 options
- Only allow navigation when all fields are filled

**Implementation Summary:**

- Used `TextInput` with `keyboardType="numeric"` for height/weight
- Created custom dropdown using `Modal` (Picker package had installation issues)
- Implemented form validation with `isFormComplete` state
- Conditional rendering for disabled button state
- Passed data via router params: `router.push({ pathname: '/third', params: { height, weight, skinTone }})`

**Challenges & Solutions:**
- **Problem:** `@react-native-picker/picker` module not found
- **Solution:** Created custom dropdown with Modal component - more control, no dependencies
- **Problem:** Button should only work when form complete
- **Solution:** Conditional rendering - show disabled View or active Pressable based on validation

---

### Phase 3: Interactive Color Wheel & Material Selection

**Prompt:**

Create a color wheel on the third page where:
- User can select colors arranged in a circle
- Each color has multiple shades (light to dark)
- Show material options with images
- Pass selections to recommendation page

**Implementation Summary:**

- Used `react-native-svg` for color wheel rendering
- Generated color shades programmatically using HSL
- Created 20 hue segments × 8 shade levels = 160 selectable colors
- Wrapped SVG in `TouchableOpacity` with custom hit detection
- Material selection using `Image` components with `TouchableOpacity`
- State management: `selectedColor`, `selectedMaterial`

**Technical Details:**
- **Color wheel math:** Converted touch coordinates to angle/distance to determine selected color
- **Path rendering:** Used SVG `Path` components with arc calculations
- **Touch handling:** `onPress` on SVG paths doesn't work reliably; used container-level touch detection
- **Hex input:** Added `TextInput` for manual color entry with validation

**Reflection:** SVG touch events are tricky on mobile. Container-level detection with coordinate math works better. Color wheel provides great UX.

---

### Phase 4: Personalized Recommendations

**Prompt:**

Based on user inputs (height, weight, skin tone, color, material), generate fashion recommendations considering:
- Color coordination (skin tone matching, contrast balance)
- Materials & textures
- Body proportions (height/weight)
- Specific outfit ideas
- Accessories
- Practical tips

Make recommendations concise - users shouldn't be overwhelmed.

**Implementation Summary:**

- Created recommendation algorithm based on user profile
- Skin tone categories: fair, medium, deep - each gets tailored color advice
- Height categories: shorter (<160cm), average, taller (>180cm) - specific styling tips
- Generated 3 outfit combinations using selected color/material
- Clean, scannable format with emojis and sections
- Mock data approach (API integration not needed for MVP)

**Recommendation Logic:**
```
IF skin_tone IN [very_fair, fair, light]
  → Recommend jewel tones, pastels
ELSE IF skin_tone IN [light_medium, medium, medium_tan]
  → Recommend earth tones, versatile palette
ELSE
  → Recommend bold colors, deep jewel tones

IF height < 160cm
  → Vertical lines, monochrome, high-waisted
ELSE IF height > 180cm
  → Bold patterns, oversized fits, layering
ELSE
  → Versatile styling options
```

**Reflection:** Initially tried Anthropic API integration but hit authentication issues in React Native. Mock recommendations work perfectly and are actually more predictable/controllable. Good learning: sometimes simpler is better.

---

## Step 4: Understanding Verification

**Current Implementation:**

The Threadly app consists of 4 pages:
1. **Landing (`index.tsx`):** Welcome screen with background image, navigation button
2. **User Input (`second.tsx`):** Form collecting height, weight, skin tone with validation
3. **Preferences (`third.tsx`):** Interactive color wheel (160 shades), material selection, hex input
4. **Recommendations (`recommendation.tsx`):** Personalized fashion advice based on all inputs

**Code Review Questions:**

1. Have I followed React Native best practices?
2. Are there better ways to handle multi-page data flow?
3. Should I add data persistence (save user preferences)?
4. What improvements should I make for production?

---

### Verification Checklist:

✅ **Good Practices:**
- File-based routing properly implemented
- Form validation before navigation
- Type safety with TypeScript
- Clean component structure
- Proper state management with `useState`
- Conditional rendering for UX
- Responsive styling with StyleSheet

⚠️ **Areas for Improvement:**
- No data persistence - user selections lost on app close
- Color wheel touch detection could be more precise
- No error boundaries for crash protection
- Missing loading states on navigation
- No analytics tracking
- Form data not validated for reasonable ranges (e.g., height 50-250cm)
- No accessibility labels for screen readers

🔄 **Refactoring Opportunities:**
- Extract color wheel into separate component
- Create reusable form input components
- Move recommendation logic to separate module
- Add TypeScript interfaces for user profile data
- Consider Context API if app grows beyond 4 pages

---

### Next Topics to Explore:

1. **Data Persistence:** 
   - AsyncStorage for saving user preferences
   - SQLite for recommendation history
   - Cloud sync with Firebase/Supabase

2. **Enhanced UX:**
   - Add animations with Reanimated
   - Implement gesture handling (swipe between pages)
   - Add haptic feedback on selections
   - Loading skeletons instead of spinners

3. **Features:**
   - Save favorite outfits
   - Share recommendations (image export)
   - Multiple user profiles
   - Wardrobe management
   - Shopping links integration

4. **Production Readiness:**
   - Error tracking (Sentry)
   - Analytics (Firebase Analytics)
   - App icon and splash screen
   - Build and deploy (EAS Build)
   - App store submission

5. **Code Quality:**
   - Unit tests with Jest
   - Component tests with React Native Testing Library
   - E2E tests with Detox
   - CI/CD pipeline

---

## Log Table

| Date | Step | Prompt (title) | Response Summary | Reflection / What I changed |
|------|------|----------------|------------------|----------------------------|
| 2025-12-15 | 1 | Project Setup | Expo vs CLI, file routing | Chose Expo for speed; learned about (tabs) folder |
| 2025-12-15 | 1 | Background Image | ImageBackground usage | Fixed path: `../../assets/` from nested route |
| 2025-12-15 | 2 | User Input Form | TextInput, validation | Created custom dropdown; conditional button |
| 2025-12-15 | 2 | Skin Tone Dropdown | Picker vs Modal | Modal approach: no dependencies, more control |
| 2025-12-15 | 3 | Color Wheel | SVG rendering, touch | Container-level touch detection works better |
| 2025-12-15 | 3 | Touch Not Working | Event handling debug | Wrapped SVG in TouchableOpacity with custom logic |
| 2025-12-15 | 4 | API Integration | Anthropic API error | Switched to mock data - simpler, more reliable |
| 2025-12-15 | 4 | Data Passing | Route params issue | Added skinTone to all param objects |
| 2025-12-15 | 4 | Overwhelming Content | Concise recommendations | Reduced from 100+ to 30 lines of content |

---

## Key Takeaways:

1. **File-based routing is intuitive** once you understand the folder structure
2. **React Native ≠ React Web** - different components, different constraints
3. **Touch events on mobile are different** - what works on web may not work on mobile
4. **Simple solutions often win** - custom dropdown and mock data worked better than packages/APIs
5. **User flow matters** - linear wizard with validation at each step creates good UX
6. **Mobile-first thinking** - consider screen size, touch targets, scrolling from the start

---

## Technologies Used:

- **Framework:** React Native with Expo SDK 54
- **Routing:** Expo Router (file-based)
- **Language:** TypeScript
- **Styling:** React Native StyleSheet
- **Graphics:** react-native-svg
- **State:** React hooks (useState, useEffect)
- **Navigation:** useRouter, useLocalSearchParams

---

## Project Structure:

```
Threadly/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Landing page
│   │   ├── second.tsx         # User input form
│   │   ├── third.tsx          # Color wheel & materials
│   │   └── recommendation.tsx # Fashion recommendations
│   └── _layout.tsx            # Root layout
├── assets/
│   └── images/
│       └── Three_abstracts.jpg
├── data/
│   └── materials.ts           # Material options data
├── app.json
└── package.json
```

---

## Conclusion:

Threadly demonstrates core React Native concepts: navigation, forms, data flow, touch interactions, and dynamic content generation. The app successfully guides users through a multi-step process to receive personalized fashion recommendations. Future enhancements would focus on data persistence, enhanced UX with animations, and production deployment.
