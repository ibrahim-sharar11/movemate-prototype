# MoveMate Prototype

## Overview

MoveMate is an interactive prototype for an on-demand movers booking platform. This prototype demonstrates the core customer journey from initial booking to post-move rating, featuring transparent pricing, mover selection, and real-time tracking.

## Technology Stack

- **HTML5** for structure
- **CSS3** with custom properties for styling
- **Vanilla JavaScript** for interactivity
- No external dependencies (runs entirely in the browser)

## Features Prototyped

### 1. Landing Screen
- Welcome interface with value proposition
- Quick demo button for rapid prototyping exploration
- Mock booking preview

### 2. Move Details Form (Step 1 of 3)
- Pickup and drop-off address input
- Date and time window selection
- Home type selection
- Access details (elevator, stairs, etc.)
- Special notes field

### 3. Inventory Collection (Step 2 of 3)
- Interactive counters for:
  - Bedroom items
  - Living room items
  - Boxes
  - Heavy items
- Fragile items text area

### 4. Price Estimate & Mover Selection (Step 3 of 3)
- **Price Estimation Algorithm**: Calculates estimate range based on:
  - Base fee ($150)
  - Room complexity (bedrooms, living rooms)
  - Box count
  - Heavy items
  - Access difficulty multipliers
- **Price Breakdown**: Shows base fee, distance, and time/complexity components
- **Mover Comparison**: 
  - Three pre-loaded movers with ratings, job counts, and on-time rates
  - Sorting by: Best match, Price, or Rating
  - Individual pricing estimates per mover
- **Estimate Rationale**: Explains why the estimate was calculated

### 5. Booking Confirmation
- Summary of all move details
- Selected mover information
- Final price estimate
- Confirmation action

### 6. Real-Time Tracking
- **Status Timeline**: Visual progress indicator showing:
  - Scheduled
  - Mover on the way
  - Arrived
  - In progress
  - Completed
- **Map Placeholder**: Visual representation of pickup/drop-off locations
- **Demo Controls**: "Advance status" button to simulate real-time updates

### 7. Post-Move Rating
- 5-star rating system
- Optional comment field
- Rating submission and storage

### 8. Past Moves History
- List of completed moves
- Move details (locations, dates, prices, movers)
- Ratings given
- Persists in browser memory for demo purposes

## Getting Started

### Running the Prototype

1. Clone or download this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge)
3. No build process or server required - the prototype runs entirely client-side

### Quick Demo

Click the **"Quick Demo"** button on the landing screen to automatically populate the form with sample data and jump directly to the estimate screen for rapid exploration.

### Navigation

- Use the **"Back"** buttons to navigate between screens
- The prototype uses a single-page application approach with screen switching
- All data is stored in browser memory (resets on page refresh)

## Design Decisions

### User Experience
- **Progressive Disclosure**: Information is revealed step-by-step (3-step booking process)
- **Transparent Pricing**: Estimates are calculated immediately with clear breakdowns
- **Confidence Building**: Mover profiles include ratings, job counts, and on-time rates
- **Feedback Loop**: Post-move rating creates accountability and improves recommendations

### Visual Design
- **Dark Theme**: Modern dark UI with gradient accents
- **Card-Based Layout**: Information organized in clear, scannable cards
- **Responsive Design**: Works on desktop and tablet viewports
- **Accessibility**: High contrast, clear typography, semantic HTML

### Technical Approach
- **No External Dependencies**: Pure HTML/CSS/JS for simplicity and portability
- **In-Memory State Management**: Simple state object manages all prototype data
- **Modular Screen System**: Easy to add or modify screens
- **Simulated Data**: Movers, estimates, and tracking use realistic but simulated data

## File Structure

```
movemate_prototype/
├── index.html      # Main HTML structure
├── styles.css      # All styling and layout
├── app.js          # Interactive functionality and state management
└── README.md       # This file
```

## Limitations & Future Enhancements

### Current Limitations
- Data is stored only in browser memory (not persistent)
- No actual API calls or backend integration
- Map tracking is a visual placeholder (not a real map)
- Movers and pricing are simulated
- No payment processing
- No user authentication

### Potential Enhancements
- Integration with mapping APIs (Google Maps, Mapbox)
- Real mover database and availability checking
- User accounts and booking history persistence
- Payment gateway integration
- Push notifications for tracking updates
- Mobile app version

## Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Notes for Evaluators

- This is a **prototype**, not a production application
- All interactions are simulated for demonstration purposes
- The prototype focuses on demonstrating the **user journey** and **interaction design**
- Pricing calculations are simplified algorithms for demonstration
- The "Quick Demo" button helps quickly explore features without manual form filling

## Contact

For questions about this prototype, please refer to the project report.

