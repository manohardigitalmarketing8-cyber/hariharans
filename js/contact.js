document.addEventListener("DOMContentLoaded", () => {
  const EVENTS = [
    "Wedding", "Engagement", "Mehndi Ceremony", "Sangeet Ceremony", "Birthday Party",
    "Baby Shower", "Naming Ceremony", "Anniversary", "Bachelor Party", "Get Together",
    "Cultural Event", "Dance Party", "Music Show", "Magic Show", "Stage Show",
    "New Year Celebration", "Office Party", "Annual Day", "Live Show Coverage", "Other"
  ];
  const SHOOTS = [
    "Not sure yet", "Full Event Management", "Traditional Wedding Shoot", "Candid Wedding Shoot",
    "Cinematic Wedding Film", "Pre-Wedding Shoot", "Post-Wedding Shoot", "Save the Date Film",
    "Destination Wedding", "Outdoor Wedding Shoot", "Vintage Wedding Shoot", "Black & White Wedding Shoot",
    "Newborn Shoot", "Kids Shoot", "Maternity Shoot", "Lifestyle Photo Shoot", "Drone / Aerial Shoot",
    "24 Hours Shoot", "Teaser Shoot", "Portfolio & Modeling", "Freelance Shoot", "Passport Shoot",
    "Still Life Shoot", "Travel & Landscape Shoot", "Wildlife Photography"
  ];

  const evSel = document.getElementById("eventType");
  const shSel = document.getElementById("shootPref");
  if (evSel) EVENTS.forEach(v => evSel.add(new Option(v, v)));
  if (shSel) SHOOTS.forEach(v => shSel.add(new Option(v, v)));

  const params = new URLSearchParams(location.search);
  const preEvent = params.get("event");
  const preShoot = params.get("shoot");
  if (preEvent && [...evSel.options].some(o => o.value === preEvent)) evSel.value = preEvent;
  if (preShoot && [...shSel.options].some(o => o.value === preShoot)) shSel.value = preShoot;

  const dateInput = document.getElementById("eventDate");
  if (dateInput) {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    dateInput.min = t.toISOString().split("T")[0];
  }

  const form = document.getElementById("bookingForm");
  const status = document.getElementById("formStatus");
  form && form.addEventListener("submit", e => {
    e.preventDefault();
    const name = (form.elements.name && form.elements.name.value || "").trim();
    const phone = (form.elements.phone && form.elements.phone.value || "").trim();
    if (!name || !phone) {
      status.textContent = "Please enter your name and phone number.";
      status.classList.add("show");
      return;
    }
    const f = form.elements;
    const val = k => (f[k] && f[k].value) || "";
    const lines = [
      "Hello Hariharan Digital Studio & Events!",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      val("email").trim() ? `Email: ${val("email").trim()}` : "",
      `Event Type: ${evSel && evSel.value ? evSel.value : "-"}`,
      `Shoot Preference: ${shSel && shSel.value ? shSel.value : "-"}`,
      dateInput && dateInput.value ? `Preferred Date: ${dateInput.value}` : "",
      val("guests") ? `Guests: ${val("guests")}` : "",
      val("venue").trim() ? `Venue/Location: ${val("venue").trim()}` : "",
      val("message").trim() ? `Requirements: ${val("message").trim()}` : ""
    ].filter(Boolean);
    const url = `https://wa.me/${HDS_CONFIG.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    status.textContent = "Opening WhatsApp with your inquiry... We usually reply within 30 minutes during working hours.";
    status.classList.add("show");
    window.open(url, "_blank", "noopener");
  });
});
