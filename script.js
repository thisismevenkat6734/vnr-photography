
"use strict";

/* =========================================
   VNR PHOTOGRAPHY & CAR RENTALS
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     CONFIGURATION
  ===================================== */

  const VNR_WHATSAPP = "917893953413";


  /* =====================================
     1. MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {

    menuToggle.setAttribute("aria-expanded", "false");

    const closeMenu = () => {
      navigation.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {

      const isOpen = navigation.classList.toggle("active");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });

    // Close menu after clicking navigation link

    navigation.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", closeMenu);

    });

    // Close menu when clicking outside

    document.addEventListener("click", event => {

      if (
        !menuToggle.contains(event.target) &&
        !navigation.contains(event.target)
      ) {
        closeMenu();
      }

    });

    // Close menu using Escape key

    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });

  }


  /* =====================================
     2. WHATSAPP URL GENERATOR
  ===================================== */

  function openWhatsApp(message) {

    const url =
      "https://wa.me/" +
      VNR_WHATSAPP +
      "?text=" +
      encodeURIComponent(message);

    const newWindow = window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    // Fallback if browser blocks new window

    if (!newWindow) {
      window.location.href = url;
    }

  }


  /* =====================================
     3. SERVICE AUTO SELECTION
  ===================================== */

  const serviceSelect = document.querySelector("#service-type");

  const serviceButtons = document.querySelectorAll(
    "[data-service]"
  );

  serviceButtons.forEach(button => {

    button.addEventListener("click", () => {

      const selectedService = button.dataset.service;

      if (serviceSelect && selectedService) {

        const matchingOption = Array.from(
          serviceSelect.options
        ).find(option => option.value === selectedService);

        if (matchingOption) {
          serviceSelect.value = selectedService;
        }

      }

    });

  });


  /* =====================================
     4. WHATSAPP ENQUIRY FORM
  ===================================== */

  const enquiryForm = document.querySelector("#enquiry-form");

  if (enquiryForm) {

    enquiryForm.addEventListener("submit", event => {

      event.preventDefault();

      if (!enquiryForm.reportValidity()) {
        return;
      }

      const customerName =
        document.querySelector("#customer-name").value.trim();

      const customerPhone =
        document.querySelector("#customer-phone").value.trim();

      const selectedService =
        document.querySelector("#service-type").value;

      const customerMessage =
        document.querySelector("#customer-message").value.trim();


      // Validate name

      if (customerName.length < 2) {

        alert("Please enter your full name.");

        return;

      }


      // Validate phone number

      const phoneDigits = customerPhone.replace(/\D/g, "");

      if (
        !/^[0-9+\-\s()]+$/.test(customerPhone) ||
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
      ) {

        alert("Please enter a valid phone number.");

        return;

      }


      // Validate service

      if (!selectedService) {

        alert("Please select a service.");

        return;

      }


      // Create WhatsApp enquiry message

      const whatsappMessage =

        "Hello VNR Photography & Car Rentals!\n\n" +

        "I would like to make an enquiry.\n\n" +

        "Name: " + customerName + "\n" +

        "Phone: " + customerPhone + "\n" +

        "Service: " + selectedService + "\n\n" +

        "Message: " + customerMessage + "\n\n" +

        "Location: Guntur, Andhra Pradesh.";


      openWhatsApp(whatsappMessage);

    });

  }


  /* =====================================
     5. 3D VNR LOGO INTERACTION
  ===================================== */

  const logo = document.querySelector(".logo-main");

  if (
    logo &&
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) {

    logo.addEventListener("mousemove", event => {

      const rect = logo.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;

      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 16;

      const rotateX = (0.5 - y) * 12;

      logo.style.filter =
        "drop-shadow(0 3px 0 #98640f) " +
        "drop-shadow(0 6px 0 #543608) " +
        "drop-shadow(0 12px 12px rgba(0,0,0,.8))";

      logo.style.setProperty(
        "--mouse-rotate-x",
        rotateX + "deg"
      );

      logo.style.setProperty(
        "--mouse-rotate-y",
        rotateY + "deg"
      );

    });

    logo.addEventListener("mouseleave", () => {

      logo.style.removeProperty("--mouse-rotate-x");

      logo.style.removeProperty("--mouse-rotate-y");

    });

  }


  /* =====================================
     6. AUTOMATIC COPYRIGHT YEAR
  ===================================== */

  const currentYear = document.querySelector("#current-year");

  if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

  }


  /* =====================================
     7. PREVENT EMPTY FORM SUBMISSION
  ===================================== */

  if (enquiryForm) {

    enquiryForm.setAttribute("novalidate", "false");

  }


  /* =====================================
     8. PERFORMANCE FRIENDLY IMAGE LOADING
  ===================================== */

  document.querySelectorAll("img").forEach(img => {

    if (!img.hasAttribute("loading")) {

      img.setAttribute("loading", "lazy");

    }

    img.setAttribute("decoding", "async");

  });


  /* =====================================
     9. INITIALIZE WEBSITE
  ===================================== */

  console.log(
    "VNR Photography & Car Rentals website initialized."
  );

});
