    /* =========================
          Smooth Scroll Navigation
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", e => {
        const targetId = link.getAttribute("href");
        if (targetId.length > 1) {
          e.preventDefault();
          document.querySelector(targetId).scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    });

    /* =========================
       Active Nav Link on Scroll
    ========================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
      let current = "";

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });


    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
      header.style.background =
        window.scrollY > 50
          ? "rgba(7,9,15,0.9)"
          : "rgba(7,9,15,0.6)";
    });


    const counters = document.querySelectorAll(".stat h5");
    let statsStarted = false;

    function animateCounters() {
      counters.forEach(counter => {
        const target = counter.innerText.replace("+", "").replace("%", "");
        if (isNaN(target)) return;

        let count = 0;
        const increment = target / 80;

        const update = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.floor(count) + (counter.innerText.includes("+") ? "+" : "%");
            requestAnimationFrame(update);
          } else {
            counter.innerText = counter.innerText.includes("+")
              ? target + "+"
              : target + "%";
          }
        };
        update();
      });
    }

    window.addEventListener("scroll", () => {
      const workSection = document.querySelector("#work");
      const sectionTop = workSection.getBoundingClientRect().top;

      if (sectionTop < window.innerHeight && !statsStarted) {
        animateCounters();
        statsStarted = true;
      }
    });

    const form = document.querySelector("form");

    form.addEventListener("submit", async e => {
      e.preventDefault();

      const formData = new FormData(form);
      const button = form.querySelector("button");
      button.innerText = "Sending...";
      button.disabled = true;

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" }
        });

        if (response.ok) {
          form.reset();
          button.innerText = "Message Sent ✓";
          setTimeout(() => {
            button.innerText = "Send Inquiry";
            button.disabled = false;
          }, 3000);
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        button.innerText = "Error! Try Again";
        button.disabled = false;
      }
    });
