# Timezone Converter Tool

A comprehensive timezone conversion tool that allows users to convert times between different timezones and display multiple timezone clocks simultaneously for easy global time reference.

**Experience Qualities**:
1. **Intuitive** - Time conversion should feel natural with clear visual hierarchy and immediate feedback
2. **Precise** - Accurate timezone calculations with support for daylight saving time transitions
3. **Efficient** - Quick access to common timezones with the ability to customize and save preferred zones

**Complexity Level**: Light Application (multiple features with basic state)
- Multiple interactive features including time input, timezone selection, and clock displays with persistent user preferences

## Essential Features

### Time Zone Converter
- **Functionality**: Convert a specific time from one timezone to another with real-time updates
- **Purpose**: Primary tool for calculating meeting times and coordinating across timezones
- **Trigger**: User selects source timezone, enters time, and selects target timezone
- **Progression**: Select source zone → Enter time → Select target zone → View converted time → Add to world clock
- **Success Criteria**: Accurate time conversion with DST handling and intuitive timezone selection

### World Clock Display
- **Functionality**: Display current time in multiple selected timezones simultaneously
- **Purpose**: Quick reference for current times in important locations
- **Trigger**: User adds timezones to their world clock collection
- **Progression**: Browse/search timezones → Add to collection → View live updating clocks → Reorder/remove zones
- **Success Criteria**: Real-time clock updates with clear timezone labels and easy management

### Timezone Search & Selection
- **Functionality**: Search and select from comprehensive timezone database with city names
- **Purpose**: Quick access to any timezone without memorizing technical names
- **Trigger**: User needs to add or change a timezone
- **Progression**: Open timezone picker → Search by city/region → Select from results → Apply selection
- **Success Criteria**: Fast search with predictive results and common timezone shortcuts

### Quick Timezone Shortcuts
- **Functionality**: Preset buttons for common business timezones (UTC, EST, PST, GMT, etc.)
- **Purpose**: Instant access to frequently used timezones
- **Trigger**: User clicks a preset timezone button
- **Progression**: Click preset → Timezone applied immediately → Continue with conversion/clock
- **Success Criteria**: One-click access to major business timezones

## Edge Case Handling

- **Invalid Time Input**: Graceful handling of invalid time formats with helpful correction suggestions
- **DST Transitions**: Accurate handling of daylight saving time changes and ambiguous/non-existent times
- **Timezone Database Updates**: Fallback handling if timezone data is unavailable or outdated
- **Browser Timezone Detection**: Automatic detection of user's local timezone with manual override option
- **Empty States**: Helpful guidance when no timezones are selected for world clock

## Design Direction

The design should feel professional and precise like a high-quality business tool, with clean typography and subtle animations that reinforce the sense of time and precision. The interface should be minimal and focused, avoiding visual clutter that could interfere with quick time reference tasks.

## Color Selection

Complementary (opposite colors) - Using a sophisticated blue and warm orange palette to create visual distinction between different timezone elements while maintaining professional aesthetics.

- **Primary Color**: Deep Blue (oklch(0.45 0.15 240)) - Communicates trust, precision, and professionalism
- **Secondary Colors**: Light Blue (oklch(0.85 0.08 240)) for subtle backgrounds and Slate Gray (oklch(0.6 0.02 240)) for supporting text
- **Accent Color**: Warm Orange (oklch(0.7 0.15 45)) - Attention-grabbing highlight for active times and important actions
- **Foreground/Background Pairings**:
  - Background White (oklch(1 0 0)): Dark Slate text (oklch(0.2 0.02 240)) - Ratio 12.6:1 ✓
  - Primary Blue (oklch(0.45 0.15 240)): White text (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Secondary Light Blue (oklch(0.85 0.08 240)): Dark Slate text (oklch(0.2 0.02 240)) - Ratio 9.8:1 ✓
  - Accent Orange (oklch(0.7 0.15 45)): White text (oklch(1 0 0)) - Ratio 5.1:1 ✓

## Font Selection

Typography should convey clarity and precision with excellent readability for time displays, using a clean sans-serif that performs well at various sizes from large clock displays to small timezone labels.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing  
  - Time Display (Large): Inter Bold/48px/tabular nums for alignment
  - Time Display (Small): Inter Medium/18px/tabular nums
  - Body Text: Inter Regular/16px/normal spacing
  - Labels: Inter Medium/14px/slightly tight spacing

## Animations

Animations should be subtle and functional, emphasizing the precision and flow of time while providing gentle feedback for user interactions without overwhelming the tool's professional nature.

- **Purposeful Meaning**: Smooth transitions when switching timezones reinforce the connection between different time zones, while gentle hover states on interactive elements provide immediate feedback
- **Hierarchy of Movement**: Time updates should animate smoothly to draw attention to changes, timezone selection should have subtle scaling effects, and clock hands or digits should transition naturally

## Component Selection

- **Components**: 
  - Card components for world clock displays and converter sections
  - Select dropdowns for timezone selection with search functionality
  - Input components for time entry with proper validation
  - Button components for quick timezone shortcuts and actions
  - Badge components for timezone labels and UTC offsets
- **Customizations**: 
  - Custom digital clock component with tabular number fonts
  - Enhanced timezone search with city/country filtering
  - Drag-and-drop reordering for world clock zones
- **States**: 
  - Buttons with subtle hover scaling and color transitions
  - Input fields with focused borders and validation feedback
  - Clock cards with gentle shadow elevation on hover
- **Icon Selection**: 
  - Clock icon for time displays
  - Globe icon for world clock section
  - Plus/Minus icons for adding/removing timezones
  - Search icon for timezone picker
- **Spacing**: 
  - Consistent 4-unit (16px) padding within cards
  - 6-unit (24px) gaps between major sections
  - 2-unit (8px) spacing for form elements
- **Mobile**: 
  - Stack world clocks vertically on mobile
  - Simplified timezone picker with bottom sheet on mobile
  - Touch-friendly button sizes (minimum 44px)
  - Collapsible converter section on smaller screens