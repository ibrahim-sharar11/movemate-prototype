// Basic in-memory "state" for the prototype
const state = {
  moveDetails: null,
  inventory: {
    bedroomCount: 1,
    livingCount: 1,
    boxCount: 8,
    heavyCount: 0,
    fragileNotes: ""
  },
  estimate: null,
  movers: [
    {
      id: "careful-movers",
      name: "Careful Movers Co.",
      rating: 4.9,
      jobs: 184,
      basePriceModifier: 1.05,
      tagline: "Great with fragile items and apartments.",
      onTimeRate: 98
    },
    {
      id: "city-packers",
      name: "City Packers & Haul",
      rating: 4.6,
      jobs: 240,
      basePriceModifier: 0.95,
      tagline: "Efficient teams for small & medium moves.",
      onTimeRate: 94
    },
    {
      id: "student-movers",
      name: "Student Movers Collective",
      rating: 4.4,
      jobs: 92,
      basePriceModifier: 0.88,
      tagline: "Budget-friendly movers for short hops.",
      onTimeRate: 91
    }
  ],
  selectedMoverId: null,
  booking: null,
  trackingStatusIndex: 0,
  trackingStatuses: [
    { key: "scheduled", label: "Scheduled", caption: "You’re all set for the selected window." },
    { key: "on_the_way", label: "Mover on the way", caption: "Your mover has started driving to the pickup." },
    { key: "arrived", label: "Arrived", caption: "Your mover has arrived at the pickup location." },
    { key: "in_progress", label: "In progress", caption: "Items are being loaded and transported." },
    { key: "completed", label: "Completed", caption: "The move has finished successfully." }
  ],
  rating: {
    stars: 0,
    comment: ""
  },
  pastMoves: [],
  formErrors: {},
  loading: false
};

// Load saved data from localStorage
function loadSavedData() {
  try {
    const saved = localStorage.getItem("movemate_past_moves");
    if (saved) {
      state.pastMoves = JSON.parse(saved);
    }
    const savedBooking = localStorage.getItem("movemate_current_booking");
    if (savedBooking) {
      state.booking = JSON.parse(savedBooking);
      if (state.booking && state.booking.trackingStatusIndex !== undefined) {
        state.trackingStatusIndex = state.booking.trackingStatusIndex;
      }
    }
  } catch (e) {
    console.log("No saved data found or error loading:", e);
  }
}

// Save data to localStorage
function saveData() {
  try {
    localStorage.setItem("movemate_past_moves", JSON.stringify(state.pastMoves));
    if (state.booking) {
      const toSave = {
        ...state.booking,
        trackingStatusIndex: state.trackingStatusIndex
      };
      localStorage.setItem("movemate_current_booking", JSON.stringify(toSave));
    }
  } catch (e) {
    console.log("Error saving data:", e);
  }
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

// Screen navigation with smooth transitions
function showScreen(screenId) {
  const currentScreen = $(".screen.active");
  const targetScreen = $(`#${screenId}`);
  
  if (!targetScreen || currentScreen === targetScreen) return;
  
  // Add exit animation
  if (currentScreen) {
    currentScreen.classList.add("exiting");
    setTimeout(() => {
      currentScreen.classList.remove("active", "exiting");
      targetScreen.classList.add("active", "entering");
      
      // Trigger entrance animation
      requestAnimationFrame(() => {
        targetScreen.classList.remove("entering");
      });
    }, 200);
  } else {
    targetScreen.classList.add("active");
  }
  
  // Scroll to top on new screen
  $(".app-main").scrollTop = 0;
  
  // Focus management for accessibility
  const firstInput = targetScreen.querySelector("input, button, select, textarea");
  if (firstInput && targetScreen.id !== "screen-landing") {
    setTimeout(() => firstInput.focus(), 300);
  }
}

// Initialize counters on inventory screen with animations
function initCounters() {
  const mapping = state.inventory;
  $all(".counter").forEach(counter => {
    const field = counter.dataset.field;
    const valueSpan = counter.querySelector(".counter-value");
    valueSpan.textContent = mapping[field];

    counter.addEventListener("click", (e) => {
      const btn = e.target.closest(".counter-btn");
      if (!btn) return;
      const action = btn.dataset.action;
      let current = mapping[field];
      if (action === "inc") {
        current++;
        // Add pulse animation
        valueSpan.classList.add("pulse");
        setTimeout(() => valueSpan.classList.remove("pulse"), 300);
      }
      if (action === "dec") {
        current = Math.max(0, current - 1);
        // Add pulse animation
        valueSpan.classList.add("pulse");
        setTimeout(() => valueSpan.classList.remove("pulse"), 300);
      }
      mapping[field] = current;
      valueSpan.textContent = current;
    });
  });
}

// Form validation with error messages
function validateForm(formId) {
  const form = $(`#${formId}`);
  if (!form) return true;
  
  const fields = form.querySelectorAll("[required]");
  let isValid = true;
  state.formErrors = {};
  
  fields.forEach(field => {
    const fieldName = field.name || field.id;
    const value = field.value.trim();
    
    // Remove existing error
    field.classList.remove("error");
    const errorMsg = form.querySelector(`.error-${fieldName}`);
    if (errorMsg) errorMsg.remove();
    
    // Validate required fields
    if (field.hasAttribute("required") && !value) {
      isValid = false;
      state.formErrors[fieldName] = "This field is required";
      field.classList.add("error");
      
      // Add error message
      const errorEl = document.createElement("span");
      errorEl.className = `error-${fieldName} error-message`;
      errorEl.textContent = "This field is required";
      field.parentElement.appendChild(errorEl);
    }
    
    // Special validation for dates (can't be in the past)
    if (field.type === "date" && value) {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        isValid = false;
        state.formErrors[fieldName] = "Date cannot be in the past";
        field.classList.add("error");
        
        const errorEl = form.querySelector(`.error-${fieldName}`) || document.createElement("span");
        errorEl.className = `error-${fieldName} error-message`;
        errorEl.textContent = "Date cannot be in the past";
        if (!form.querySelector(`.error-${fieldName}`)) {
          field.parentElement.appendChild(errorEl);
        }
      }
    }
  });
  
  return isValid;
}

// Loading state management
function setLoading(isLoading) {
  state.loading = isLoading;
  const buttons = $all(".primary-button");
  buttons.forEach(btn => {
    btn.disabled = isLoading;
    if (isLoading) {
      btn.classList.add("loading");
      const originalText = btn.textContent;
      btn.dataset.originalText = originalText;
      btn.innerHTML = '<span class="spinner"></span> Loading...';
    } else {
      btn.classList.remove("loading");
      if (btn.dataset.originalText) {
        btn.textContent = btn.dataset.originalText;
      }
    }
  });
}

// Success animation (confetti effect)
function showSuccessAnimation() {
  const confettiContainer = document.createElement("div");
  confettiContainer.className = "confetti-container";
  document.body.appendChild(confettiContainer);
  
  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti-particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.animationDelay = Math.random() * 0.5 + "s";
    particle.style.animationDuration = (Math.random() * 2 + 2) + "s";
    confettiContainer.appendChild(particle);
  }
  
  setTimeout(() => {
    confettiContainer.remove();
  }, 3000);
}

// Estimate calculation: simple heuristic based on inventory and access
function calculateEstimate() {
  const inv = state.inventory;
  const base = 150;
  const roomFactor = inv.bedroomCount * 60 + inv.livingCount * 50;
  const boxFactor = inv.boxCount * 5;
  const heavyFactor = inv.heavyCount * 40;
  let accessMultiplier = 1.0;

  if (!state.moveDetails) return null;

  const access = state.moveDetails.access;
  if (access === "Stairs – 1 flight") accessMultiplier = 1.08;
  if (access === "Stairs – 2+ flights") accessMultiplier = 1.18;
  if (access === "Elevator") accessMultiplier = 1.03;

  const subtotal = (base + roomFactor + boxFactor + heavyFactor) * accessMultiplier;
  const low = Math.round(subtotal * 0.9 / 10) * 10;
  const high = Math.round(subtotal * 1.15 / 10) * 10;

  const breakdown = {
    baseFee: 180,
    distance: Math.round(subtotal * 0.3 / 10) * 10,
    timeComplexityLow: Math.round(subtotal * 0.2 / 10) * 10,
    timeComplexityHigh: Math.round(subtotal * 0.35 / 10) * 10
  };

  state.estimate = {
    low,
    high,
    breakdown,
    reasons: [
      `${inv.bedroomCount} bedroom${inv.bedroomCount !== 1 ? "s" : ""} with living room and ${inv.boxCount} boxes`,
      access,
      "Typical distance for intra-city moves"
    ]
  };
}

// Render estimate card and reasons
function renderEstimate() {
  if (!state.estimate) return;
  const est = state.estimate;
  $("#estimate-price").textContent = `$${est.low}–$${est.high}`;
  $("#estimate-breakdown").textContent =
    `Base fee $${est.breakdown.baseFee} · Distance $${est.breakdown.distance} · Time & complexity $${est.breakdown.timeComplexityLow}–$${est.breakdown.timeComplexityHigh}`;

  const list = $("#estimate-reasons");
  list.innerHTML = "";
  est.reasons.forEach(reason => {
    const li = document.createElement("li");
    li.textContent = reason;
    list.appendChild(li);
  });
}

// Render movers list
function renderMovers() {
  const container = $("#mover-list");
  container.innerHTML = "";

  let movers = [...state.movers];
  const sort = $("#moverSort").value;
  if (sort === "price") {
    movers.sort((a, b) => a.basePriceModifier - b.basePriceModifier);
  } else if (sort === "rating") {
    movers.sort((a, b) => b.rating - a.rating);
  } else {
    movers.sort((a, b) => b.rating * 0.7 + b.onTimeRate * 0.3 - (a.rating * 0.7 + a.onTimeRate * 0.3));
  }

  movers.forEach(mover => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "mover-card";
    if (mover.id === state.selectedMoverId) {
      card.classList.add("selected");
    }

    const cardMain = document.createElement("div");
    cardMain.className = "mover-card-main";
    const h4 = document.createElement("h4");
    h4.textContent = mover.name;
    const p1 = document.createElement("p");
    p1.textContent = mover.tagline;
    cardMain.appendChild(h4);
    cardMain.appendChild(p1);

    const cardMeta = document.createElement("div");
    cardMeta.className = "mover-card-meta";
    cardMeta.innerHTML = `<span>⭐ ${mover.rating.toFixed(1)} · ${mover.jobs} jobs</span><span>On-time ${mover.onTimeRate}%</span>`;

    const cardPrice = document.createElement("div");
    cardPrice.className = "mover-price";
    const estLow = Math.round(state.estimate.low * mover.basePriceModifier / 10) * 10;
    const estHigh = Math.round(state.estimate.high * mover.basePriceModifier / 10) * 10;
    const p2 = document.createElement("p");
    p2.className = "mover-price-main";
    p2.textContent = `$${estLow}–$${estHigh}`;
    const p3 = document.createElement("p");
    p3.className = "mover-price-sub";
    p3.textContent = "Est. for this move";
    cardPrice.appendChild(p2);
    cardPrice.appendChild(p3);

    card.appendChild(cardMain);
    card.appendChild(cardMeta);
    card.appendChild(cardPrice);

    card.addEventListener("click", () => {
      state.selectedMoverId = mover.id;
      renderMovers();
      
      // Enable continue button with animation
      const continueBtn = $("#btn-continue-booking");
      continueBtn.disabled = false;
      continueBtn.classList.add("pulse");
      setTimeout(() => continueBtn.classList.remove("pulse"), 500);
      
      // Show subtle notification
      setTimeout(() => {
        showNotification("Mover selected! Continue to confirm your booking.", "success");
      }, 200);
    });

    container.appendChild(card);
  });
}

// Summary render
function renderSummary() {
  const dl = $("#summary-move-details");
  const md = state.moveDetails;
  const inv = state.inventory;
  const est = state.estimate;
  if (!md || !est) return;

  dl.innerHTML = `
    <dt>Pickup</dt>
    <dd>${md.pickupAddress}</dd>
    <dt>Drop-off</dt>
    <dd>${md.dropoffAddress}</dd>
    <dt>Date & time</dt>
    <dd>${md.moveDate} · ${md.timeWindow}</dd>
    <dt>Home & access</dt>
    <dd>${md.homeType} · ${md.access}</dd>
    <dt>Inventory</dt>
    <dd>${inv.bedroomCount} bedroom, ${inv.livingCount} living room, ${inv.boxCount} boxes, ${inv.heavyCount} heavy items</dd>
  `;

  const mover = state.movers.find(m => m.id === state.selectedMoverId);
  const summaryMover = $("#summary-mover");
  if (mover) {
    const rangeLow = Math.round(est.low * mover.basePriceModifier / 10) * 10;
    const rangeHigh = Math.round(est.high * mover.basePriceModifier / 10) * 10;
    summaryMover.innerHTML = `
      <p class="summary-mover-name">${mover.name}</p>
      <p class="summary-mover-meta">⭐ ${mover.rating.toFixed(1)} · ${mover.jobs} jobs · On-time ${mover.onTimeRate}%</p>
    `;
    $("#summary-price-main").textContent = `$${rangeLow}–$${rangeHigh}`;
  }
}

// Tracking timeline render
function renderTracking() {
  const list = $("#status-timeline");
  list.innerHTML = "";
  const idx = state.trackingStatusIndex;

  state.trackingStatuses.forEach((status, i) => {
    const li = document.createElement("li");
    li.className = "status-item";

    const icon = document.createElement("div");
    icon.className = "status-icon" + (i <= idx ? " active" : "");
    li.appendChild(icon);

    const textWrap = document.createElement("div");
    const title = document.createElement("div");
    title.className = "status-text";
    title.textContent = status.label;
    const caption = document.createElement("div");
    caption.className = "status-caption";
    caption.textContent = status.caption;
    textWrap.appendChild(title);
    textWrap.appendChild(caption);

    li.appendChild(textWrap);
    list.appendChild(li);
  });

  const pill = $("#tracking-status-pill");
  pill.textContent = state.trackingStatuses[idx].label;
  pill.classList.toggle("status-pill--active", idx > 0);

  $("#tracking-meta").textContent = idx === state.trackingStatuses.length - 1
    ? "Your move is complete. You can now rate your mover."
    : "Use the demo control below to step through updates as if they happened in real time.";

  $("#btn-complete-move").disabled = idx < state.trackingStatuses.length - 1;
}

// Rating stars
function initRatingStars() {
  const container = $("#rating-stars");
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const span = document.createElement("span");
    span.className = "star";
    span.textContent = "⭐";
    span.dataset.value = String(i);
    span.addEventListener("click", () => {
      state.rating.stars = i;
      updateRatingStars();
    });
    container.appendChild(span);
  }
}

function updateRatingStars() {
  $all("#rating-stars .star").forEach(star => {
    const val = Number(star.dataset.value);
    star.classList.toggle("selected", val <= state.rating.stars);
  });
}

// Past moves render
function renderPastMoves() {
  const container = $("#past-moves-list");
  container.innerHTML = "";
  if (!state.pastMoves.length) {
    const p = document.createElement("p");
    p.className = "small";
    p.textContent = "Once you complete a simulated move, it will appear here with basic details.";
    container.appendChild(p);
    return;
  }

  state.pastMoves.slice().reverse().forEach(move => {
    const card = document.createElement("div");
    card.className = "past-move-card";

    const col1 = document.createElement("div");
    const header = document.createElement("div");
    header.className = "past-move-header";
    header.textContent = `${move.homeType} · ${move.date} · ${move.timeWindow}`;
    const row1 = document.createElement("div");
    row1.className = "past-move-row";
    row1.innerHTML = `
      <span>${move.pickup} → ${move.dropoff}</span>
      <span>Est. ${move.priceRange}</span>
    `;
    col1.appendChild(header);
    col1.appendChild(row1);

    const col2 = document.createElement("div");
    const row2 = document.createElement("div");
    row2.className = "past-move-row";
    row2.innerHTML = `
      <span>Mover: ${move.moverName}</span>
      <span>Rating given: ${move.rating || "—"}</span>
    `;
    col2.appendChild(row2);

    card.appendChild(col1);
    card.appendChild(col2);
    container.appendChild(card);
  });
}

function setupEventHandlers() {
  // Simple nav from buttons with data-nav attribute
  $all("[data-nav]").forEach(btn => {
    btn.addEventListener("click", () => {
      const dest = btn.dataset.nav;
      if (dest === "landing") showScreen("screen-landing");
      if (dest === "move-details") showScreen("screen-move-details");
      if (dest === "inventory") showScreen("screen-inventory");
      if (dest === "estimate") showScreen("screen-estimate");
      if (dest === "confirmation") showScreen("screen-confirmation");
    });
  });

  $("#btn-get-started").addEventListener("click", () => {
    showScreen("screen-move-details");
  });

  $("#btn-quick-demo").addEventListener("click", () => {
    // Prefill quick demo typical values and jump to estimate
    const today = new Date();
    const date = today.toISOString().slice(0, 10);
    const md = {
      pickupAddress: "123 King St W, Toronto",
      dropoffAddress: "456 Queen St E, Toronto",
      moveDate: date,
      timeWindow: "10–12 AM",
      homeType: "1 Bedroom",
      access: "Stairs – 1 flight",
      notes: "Please call when outside; elevator booking required."
    };
    state.moveDetails = md;
    state.inventory = {
      bedroomCount: 1,
      livingCount: 1,
      boxCount: 10,
      heavyCount: 0,
      fragileNotes: "Glass desk and full-length mirror."
    };
    calculateEstimate();
    renderEstimate();
    renderMovers();
    showScreen("screen-estimate");
  });

  // Past moves button
  $("#btn-view-past-moves").addEventListener("click", () => {
    renderPastMoves();
    showScreen("screen-past-moves");
  });

  // Move details form with validation
  $("#form-move-details").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm("form-move-details")) {
      // Scroll to first error
      const firstError = $(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        firstError.focus();
      }
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const form = e.target;
      const md = {
        pickupAddress: form.pickupAddress.value.trim(),
        dropoffAddress: form.dropoffAddress.value.trim(),
        moveDate: form.moveDate.value,
        timeWindow: form.timeWindow.value,
        homeType: form.homeType.value,
        access: form.access.value,
        notes: form.notes.value.trim()
      };
      state.moveDetails = md;
      setLoading(false);
      showScreen("screen-inventory");
    }, 500);
  });
  
  // Real-time validation on blur
  $all("#form-move-details input, #form-move-details select").forEach(field => {
    field.addEventListener("blur", () => {
      if (field.hasAttribute("required") && !field.value.trim()) {
        field.classList.add("error");
      } else {
        field.classList.remove("error");
      }
    });
    field.addEventListener("input", () => {
      field.classList.remove("error");
      const errorMsg = $(".error-" + (field.name || field.id));
      if (errorMsg) errorMsg.remove();
    });
  });

  // Inventory form
  $("#form-inventory").addEventListener("submit", (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate calculation delay for realistic feel
    setTimeout(() => {
      const form = e.target;
      state.inventory.fragileNotes = form.fragileNotes.value.trim();
      calculateEstimate();
      renderEstimate();
      renderMovers();
      setLoading(false);
      showScreen("screen-estimate");
    }, 600);
  });

  $("#moverSort").addEventListener("change", () => {
    renderMovers();
  });

  $("#btn-continue-booking").addEventListener("click", () => {
    renderSummary();
    showScreen("screen-confirmation");
  });

  $("#btn-confirm-booking").addEventListener("click", () => {
    setLoading(true);
    
    setTimeout(() => {
      const md = state.moveDetails;
      const est = state.estimate;
      const mover = state.movers.find(m => m.id === state.selectedMoverId);
      state.booking = {
        ...md,
        priceLow: est.low,
        priceHigh: est.high,
        moverName: mover?.name ?? "Selected mover"
      };
      state.trackingStatusIndex = 0;
      setLoading(false);
      
      // Show success animation
      showSuccessAnimation();
      
      // Small delay before showing tracking screen
      setTimeout(() => {
        renderTracking();
        showScreen("screen-tracking");
        saveData();
      }, 800);
    }, 800);
  });

  $("#btn-advance-status").addEventListener("click", () => {
    const newIndex = Math.min(
      state.trackingStatusIndex + 1,
      state.trackingStatuses.length - 1
    );
    
    if (newIndex > state.trackingStatusIndex) {
      // Add notification sound effect (visual only)
      const btn = $("#btn-advance-status");
      btn.classList.add("pulse");
      setTimeout(() => btn.classList.remove("pulse"), 300);
      
      state.trackingStatusIndex = newIndex;
      renderTracking();
      saveData();
      
      // Show notification if status changed significantly
      if (newIndex === 1 || newIndex === 2) {
        showNotification(state.trackingStatuses[newIndex].label + "!", "success");
      }
    }
  });
  

  $("#btn-complete-move").addEventListener("click", () => {
    if (!state.booking) return;
    $("#rating-mover-name").textContent = state.booking.moverName;
    state.rating.stars = 0;
    $("#ratingComment").value = "";
    updateRatingStars();
    showScreen("screen-rating");
  });

  $("#btn-submit-rating").addEventListener("click", () => {
    if (!state.rating.stars) {
      showNotification("Please select a star rating", "error");
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      state.rating.comment = $("#ratingComment").value.trim();
      const md = state.moveDetails;
      const est = state.estimate;
      if (md && est && state.booking) {
        state.pastMoves.push({
          pickup: md.pickupAddress,
          dropoff: md.dropoffAddress,
          date: md.moveDate,
          timeWindow: md.timeWindow,
          homeType: md.homeType,
          priceRange: `$${est.low}–$${est.high}`,
          moverName: state.booking.moverName,
          rating: state.rating.stars ? `${state.rating.stars}★` : null
        });
      }
      setLoading(false);
      saveData();
      showNotification("Thank you for your rating!", "success");
      
      // Clear booking after rating
      state.booking = null;
      localStorage.removeItem("movemate_current_booking");
      
      setTimeout(() => {
        renderPastMoves();
        showScreen("screen-past-moves");
      }, 500);
    }, 500);
  });
}

// Progress indicator for multi-step forms
function updateProgressIndicator(step) {
  const indicators = $all(".progress-dot");
  indicators.forEach((dot, index) => {
    if (index < step) {
      dot.classList.add("completed");
      dot.classList.remove("active");
    } else if (index === step) {
      dot.classList.add("active");
      dot.classList.remove("completed");
    } else {
      dot.classList.remove("active", "completed");
    }
  });
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Escape to go back
  if (e.key === "Escape") {
    const currentScreen = $(".screen.active");
    if (currentScreen && currentScreen.id !== "screen-landing") {
      const backBtn = currentScreen.querySelector(".ghost-button");
      if (backBtn) backBtn.click();
    }
  }
  
  // Enter to submit forms (if focused on submit button)
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    const form = e.target.closest("form");
    if (form && e.target === form.querySelector('button[type="submit"]')) {
      form.dispatchEvent(new Event("submit"));
    }
  }
});

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  // Load saved data
  loadSavedData();
  
  // Initialize components
  initCounters();
  initRatingStars();
  updateRatingStars();
  setupEventHandlers();
  
  // Restore tracking screen if there's an active booking
  if (state.booking && state.trackingStatusIndex < state.trackingStatuses.length - 1) {
    renderTracking();
    showScreen("screen-tracking");
  } else if (state.pastMoves.length > 0) {
    renderPastMoves();
  }
  
  // Set minimum date to today for date picker
  const dateInput = $("#moveDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }
});
