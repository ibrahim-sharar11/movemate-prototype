# MoveMate Prototype - Project Report Outline

**CSCI 4620U – Human Computer Interaction**  
**Part 3b: Interaction Design and Prototypes**

---

## Cover Page
- [ ] Project Title: MoveMate Prototype
- [ ] Course: CSCI 4620U – Human Computer Interaction
- [ ] Assignment: Part 3b: Interaction Design and Prototypes
- [ ] Due Date: December 1, 11:59 PM
- [ ] Group Members (names and student IDs):
  - [ ] Member 1: [Name] ([Student ID])
  - [ ] Member 2: [Name] ([Student ID])
  - [ ] Member 3: [Name] ([Student ID])
  - [ ] Add more as needed...

---

## 1. Description of Prototypes

### 1.1 Overview
Provide a brief introduction to your prototype:
- What problem does it solve?
- What is the core value proposition?
- Who is the target user?

### 1.2 Prototype Purpose
**What you were attempting to prototype:**

Based on your MoveMate prototype, you should discuss:
- **Functionalities**: 
  - Multi-step booking flow (move details → inventory → estimate)
  - Price estimation with transparent breakdown
  - Mover comparison and selection
  - Real-time tracking simulation
  - Post-move rating system
  - Past moves history

- **Look & Feel**:
  - Modern dark theme UI
  - Card-based information architecture
  - Responsive layout design
  - Visual feedback and transitions

- **Interaction Design**:
  - Progressive disclosure (step-by-step form)
  - Interactive counters for inventory
  - Status timeline visualization
  - Star rating interaction
  - Screen-based navigation flow

### 1.3 Key Features Demonstrated

List and describe the main features your prototype includes:

1. **Booking Flow**
   - Move details collection
   - Inventory estimation
   - Price calculation and display

2. **Mover Selection**
   - Multiple mover profiles
   - Sorting and filtering
   - Comparison of prices and ratings

3. **Tracking Experience**
   - Status timeline visualization
   - Real-time update simulation
   - Map placeholder design

4. **Post-Move Features**
   - Rating system
   - Past moves history

### 1.4 Technical Implementation
- **Technology Stack**: HTML5, CSS3, Vanilla JavaScript
- **Architecture**: Single-page application with screen-based navigation
- **State Management**: In-memory JavaScript state object
- **Design Pattern**: Modular screen system with event-driven interactions

---

## 2. Key Design Decisions

### 2.1 User Experience Decisions

#### Progressive Disclosure
**Decision**: Break the booking process into 3 clear steps rather than a single long form.

**Rationale**: 
- Reduces cognitive load
- Allows users to focus on one aspect at a time
- Makes the process feel less overwhelming
- Enables validation and estimation at each stage

#### Transparent Pricing
**Decision**: Show price estimates early with detailed breakdown and rationale.

**Rationale**:
- Builds trust by being upfront about costs
- Helps users understand what they're paying for
- Allows for informed decision-making before booking
- Addresses common pain point in moving services (hidden fees)

#### Interactive Inventory Counters
**Decision**: Use +/- buttons for inventory rather than text input.

**Rationale**:
- More intuitive for numeric input
- Provides immediate visual feedback
- Prevents invalid input (negative numbers)
- Faster interaction than typing numbers

#### Mover Comparison
**Decision**: Show multiple movers side-by-side with key metrics (rating, price, on-time rate).

**Rationale**:
- Gives users agency in choice
- Builds confidence through transparency
- Different movers for different needs (budget vs. premium)
- Simulates real marketplace dynamics

#### Real-Time Tracking Visualization
**Decision**: Include a status timeline with visual progression indicators.

**Rationale**:
- Addresses anxiety about move day uncertainty
- Provides sense of control and visibility
- Common expectation in modern on-demand services
- Builds trust through transparency

### 2.2 Visual Design Decisions

#### Dark Theme
**Decision**: Use a dark color scheme with gradient accents.

**Rationale**:
- Modern, professional appearance
- Reduces eye strain
- Differentiates from typical light-themed booking sites
- Premium feel

#### Card-Based Layout
**Decision**: Organize information into distinct cards.

**Rationale**:
- Clear visual hierarchy
- Easy to scan and understand
- Familiar pattern from mobile apps
- Helps group related information

#### Responsive Design
**Decision**: Make the prototype work on different screen sizes.

**Rationale**:
- Many users book moves on mobile devices
- Demonstrates consideration of real-world usage
- Shows technical competence

### 2.3 Interaction Design Decisions

#### Screen-Based Navigation
**Decision**: Use full-screen transitions rather than single-page scrolling.

**Rationale**:
- Clear sense of progress
- Prevents overwhelming users with all information at once
- Focuses attention on current task
- Feels more like a mobile app (where most booking happens)

#### Quick Demo Button
**Decision**: Include a button that pre-fills data and jumps to estimate screen.

**Rationale**:
- Allows rapid exploration for evaluators
- Demonstrates the estimation feature quickly
- Useful for presentations and demos
- Shows consideration for different user needs (first-time vs. returning)

#### Disabled State Management
**Decision**: Disable "Continue" buttons until required information is provided.

**Rationale**:
- Prevents user errors
- Clear indication of what's required
- Guides users through the process
- Prevents frustration from broken states

### 2.4 Technical Decisions

#### No External Dependencies
**Decision**: Use only vanilla HTML/CSS/JavaScript with no frameworks or libraries.

**Rationale**:
- Simplicity and portability
- No build process needed
- Easy to understand and modify
- Demonstrates core web development skills
- Fast loading and execution

#### In-Memory State
**Decision**: Store all data in a JavaScript state object rather than backend/database.

**Rationale**:
- Appropriate for a prototype
- No server required
- Easy to reset and test
- Focus on UI/UX rather than backend infrastructure

---

## 3. YouTube Video Link

### 3.1 Video Requirements
- [ ] 5-minute screen-capture video
- [ ] Demonstrate how to use the prototype
- [ ] Highlight main features
- [ ] Upload to YouTube as **unlisted**
- [ ] Include link here: **[Your YouTube URL]**

### 3.2 Suggested Video Structure
1. **Introduction** (30 seconds)
   - Brief overview of MoveMate
   - What will be demonstrated

2. **Landing Screen** (30 seconds)
   - Show value proposition
   - Explain the Quick Demo option

3. **Full Booking Flow** (2 minutes)
   - Move details form
   - Inventory selection
   - Price estimate and mover selection
   - Booking confirmation

4. **Tracking Feature** (1 minute)
   - Show status timeline
   - Demonstrate status advancement
   - Explain tracking concept

5. **Rating & History** (1 minute)
   - Show rating interface
   - Demonstrate past moves history
   - Explain the feedback loop

6. **Closing** (30 seconds)
   - Summary of key features
   - What the prototype demonstrates

---

## 4. Appendices

### Appendix A: Individual Contribution Report

**Instructions**: Detail who completed which parts of the project. Be specific and honest.

Example structure:

**Team Member 1: [Name]**
- [ ] HTML structure and layout
- [ ] CSS styling and responsive design
- [ ] JavaScript state management
- [ ] Price estimation algorithm
- [ ] Report writing: [section]
- [ ] Video recording/editing: [role]

**Team Member 2: [Name]**
- [ ] [Specific contribution]
- [ ] [Specific contribution]
- [ ] [Specific contribution]

**Team Member 3: [Name]**
- [ ] [Specific contribution]
- [ ] [Specific contribution]
- [ ] [Specific contribution]

**Collaborative Work:**
- [ ] Design decisions made together
- [ ] Code review and testing
- [ ] Prototype iteration based on feedback

### Appendix B: Meeting Notes

**Instructions**: Include detailed notes from group meetings. This should show collaboration and decision-making process.

**Meeting 1: [Date]**
- **Attendees**: [Names]
- **Agenda**: Initial planning, feature selection
- **Decisions Made**: 
  - Chose HTML/JS/CSS over other platforms
  - Selected core features to prototype
- **Action Items**:
  - [Task assigned to person]
- **Duration**: [Time]

**Meeting 2: [Date]**
- **Attendees**: [Names]
- **Agenda**: Design decisions, user flow
- **Decisions Made**:
  - Decided on 3-step booking process
  - Chose dark theme for modern look
- **Action Items**:
  - [Task assigned to person]
- **Duration**: [Time]

**Meeting 3: [Date]**
- **Attendees**: [Names]
- **Agenda**: Implementation progress, testing
- **Decisions Made**:
  - [Decision]
- **Action Items**:
  - [Task assigned to person]
- **Duration**: [Time]

[Add more meetings as needed]

### Appendix C: Additional Notes (Optional)
- Challenges encountered
- Solutions found
- Future improvements planned
- References or inspirations

---

## Submission Checklist

Before submitting, ensure:

- [ ] Report is saved as PDF
- [ ] Cover page includes all group member names
- [ ] Description of prototypes is complete
- [ ] Key design decisions are explained with rationale
- [ ] YouTube video link is included and working
- [ ] Appendices include:
  - [ ] Detailed individual contribution report
  - [ ] Meeting notes from all sessions
- [ ] All prototype files are included:
  - [ ] index.html
  - [ ] styles.css
  - [ ] app.js
  - [ ] README.md
- [ ] ZIP file is named using your Slack channel name
- [ ] Prototype runs correctly when opened in a browser
- [ ] Video is set to unlisted on YouTube

---

## Tips for Writing Your Report

1. **Be Specific**: Don't just say "we made it user-friendly" – explain what decisions you made and why.

2. **Show Your Process**: The meeting notes should demonstrate collaboration and iteration.

3. **Be Honest**: In the contribution report, accurately reflect who did what. This shows maturity and integrity.

4. **Connect to Course Concepts**: Where appropriate, reference HCI principles, usability heuristics, or design patterns.

5. **Quantify When Possible**: "We tested with 3 users" is better than "we tested with some users."

6. **Focus on Prototyping Goals**: Remember, the goal is to demonstrate the design, not build a production app.

Good luck with your submission! 🚀

