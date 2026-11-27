(function () {
  "use strict";

  var config = window.PORTFOLIO_CONFIG || {};

  function buildWhatsAppUrl(message) {
    var cleanNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
    var text = encodeURIComponent(message || config.defaultWhatsappMessage || "");
    if (!cleanNumber) {
      return "#contato";
    }
    return "https://wa.me/" + cleanNumber + "?text=" + text;
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ========================================================================
     1. HIDRATAÇÃO DE CONTATOS, FOTO E ANO
     ======================================================================== */
  function hydrateStaticData() {
    var yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    var defaultWaUrl = buildWhatsAppUrl(config.defaultWhatsappMessage);
    document.querySelectorAll("[data-whatsapp-default]").forEach(function (link) {
      link.setAttribute("href", defaultWaUrl);
    });

    var emailLink = document.getElementById("contact-email-link");
    if (emailLink && config.email) {
      emailLink.textContent = config.email;
      emailLink.setAttribute("href", "mailto:" + config.email);
    }

    var instaLink = document.getElementById("contact-instagram");
    var instaHandle = document.getElementById("contact-instagram-handle");
    if (instaLink && config.instagram) {
      instaLink.setAttribute("href", config.instagram);
    }
    if (instaHandle && config.instagramHandle) {
      instaHandle.textContent = config.instagramHandle;
    }

    var linkedinLink = document.getElementById("contact-linkedin");
    if (linkedinLink && config.linkedin) {
      linkedinLink.setAttribute("href", config.linkedin);
    }

    var githubLink = document.getElementById("contact-github");
    if (githubLink && config.github) {
      githubLink.setAttribute("href", config.github);
    }

    var photoSlot = document.getElementById("about-photo-slot");
    if (photoSlot && config.photoUrl) {
      photoSlot.innerHTML =
        '<img src="' +
        escapeHtml(config.photoUrl) +
        '" alt="Foto de ' +
        escapeHtml(config.name || "Gabriel Castro Cavalcante") +
        '">';
    }
  }

  /* ========================================================================
     2. PÁGINA DEMONSTRATIVA COMPLETA (PARA SLIDES SEM LIVEURL)
     ======================================================================== */
  function buildDemoPageHtml(project) {
    var d = project.previewData;
    var itemsHtml = (d.items || [])
      .map(function (item) {
        return (
          '<article class="demo-item-card">' +
          '<span class="demo-item-meta" style="color:' +
          escapeHtml(d.accent) +
          '">' +
          escapeHtml(item.meta) +
          "</span>" +
          "<strong>" +
          escapeHtml(item.title) +
          "</strong>" +
          "<p>" +
          escapeHtml(item.desc) +
          "</p>" +
          "</article>"
        );
      })
      .join("");

    var stepsHtml = (d.steps || [])
      .map(function (step) {
        return (
          '<article class="demo-step-card">' +
          '<span class="demo-step-num" style="background:' +
          escapeHtml(d.accentSoft) +
          ";color:" +
          escapeHtml(d.accent) +
          '">' +
          escapeHtml(step.num) +
          "</span>" +
          "<strong>" +
          escapeHtml(step.title) +
          "</strong>" +
          "<p>" +
          escapeHtml(step.desc) +
          "</p>" +
          "</article>"
        );
      })
      .join("");

    return (
      '<div class="demo-scroll-viewport">' +
      '<div class="demo-site">' +
      '<div class="demo-header" data-demo-section="#topo">' +
      '<span class="demo-brand" style="color:' +
      escapeHtml(d.accent) +
      '">' +
      escapeHtml(d.brandMark) +
      "</span>" +
      '<div class="demo-nav">' +
      d.navLinks
        .map(function (nav) {
          return "<span>" + escapeHtml(nav) + "</span>";
        })
        .join("") +
      "</div>" +
      "</div>" +
      '<div class="demo-hero" style="background:' +
      escapeHtml(d.surfaceTint) +
      '">' +
      '<span class="demo-badge" style="background:' +
      escapeHtml(d.accentSoft) +
      ";color:" +
      escapeHtml(d.accent) +
      '">' +
      escapeHtml(d.badge) +
      "</span>" +
      "<h3>" +
      escapeHtml(d.headline) +
      "</h3>" +
      "<p>" +
      escapeHtml(d.subheadline) +
      "</p>" +
      '<div class="demo-cta-row">' +
      '<button type="button" class="demo-btn demo-btn--primary" style="background:' +
      escapeHtml(d.accent) +
      '" data-demo-action="primary">' +
      escapeHtml(d.ctaPrimary) +
      "</button>" +
      '<button type="button" class="demo-btn demo-btn--ghost" data-demo-jump="#destaques">' +
      escapeHtml(d.ctaSecondary) +
      "</button>" +
      "</div>" +
      '<div class="demo-action-feedback" aria-live="polite"></div>' +
      "</div>" +
      '<div class="demo-section" data-demo-section="#destaques">' +
      '<h4 class="demo-section-title">' +
      escapeHtml(d.sectionTitle) +
      "</h4>" +
      '<div class="demo-items-grid">' +
      itemsHtml +
      "</div>" +
      "</div>" +
      '<div class="demo-section demo-section--tinted" data-demo-section="#diferenciais">' +
      '<h4 class="demo-section-title">' +
      escapeHtml(d.stepsTitle || "Como funciona") +
      "</h4>" +
      '<div class="demo-steps-grid">' +
      stepsHtml +
      "</div>" +
      "</div>" +
      '<div class="demo-proof">' +
      "<blockquote>" +
      escapeHtml(d.proofQuote) +
      "</blockquote>" +
      "<cite>" +
      escapeHtml(d.proofAuthor) +
      "</cite>" +
      "</div>" +
      '<div class="demo-cta-band" data-demo-section="#contato" style="background:' +
      escapeHtml(d.accent) +
      '">' +
      "<div>" +
      "<h4>" +
      escapeHtml(d.ctaBoxTitle || "Vamos conversar?") +
      "</h4>" +
      "<p>" +
      escapeHtml(d.ctaBoxSub || "Atendimento direto pelo WhatsApp.") +
      "</p>" +
      "</div>" +
      '<button type="button" class="demo-btn demo-btn--ghost" data-demo-action="primary">' +
      escapeHtml(d.ctaPrimary) +
      "</button>" +
      "</div>" +
      '<div class="demo-footer">' +
      escapeHtml(d.footerNote) +
      "</div>" +
      "</div>" +
      "</div>"
    );
  }

  /* ========================================================================
     3. CARROSSEL INTERATIVO DE LARGURA TOTAL
     ======================================================================== */
  function buildSlideStageHtml(project, index) {
    var baseLive = project.liveUrl ? project.liveUrl.replace(/#.*$/, "") : "";
    if (project.liveUrl) {
      var srcAttr =
        index === 0
          ? 'src="' + escapeHtml(baseLive) + '"'
          : 'data-src="' + escapeHtml(baseLive) + '"';

      return (
        '<div class="stage-viewport stage-viewport--live">' +
        '<iframe class="live-iframe" ' +
        srcAttr +
        ' data-base-url="' +
        escapeHtml(baseLive) +
        '" title="Prévia ao vivo do site ' +
        escapeHtml(project.title) +
        '" loading="lazy"></iframe>' +
        '<button type="button" class="iframe-guard" aria-label="Ativar rolagem e cliques dentro do site ' +
        escapeHtml(project.title) +
        '">' +
        '<span class="guard-pill">🖱️ Clique aqui para rolar e testar o site ao vivo</span>' +
        "</button>" +
        "</div>"
      );
    }

    return (
      '<div class="stage-viewport stage-viewport--demo">' +
      buildDemoPageHtml(project) +
      "</div>"
    );
  }

  function setupProjectsCarousel() {
    var carousel = document.getElementById("projects-carousel");
    var track = document.getElementById("carousel-track");
    var dotsContainer = document.getElementById("carousel-dots");
    var counterEl = document.getElementById("carousel-counter");
    var prevBtn = document.getElementById("carousel-prev");
    var nextBtn = document.getElementById("carousel-next");

    if (!carousel || !track || !Array.isArray(config.projects) || !config.projects.length) {
      return;
    }

    var projects = config.projects;
    var total = projects.length;
    var currentIndex = 0;
    var defaultDevice = window.innerWidth <= 640 ? "mobile" : "desktop";

    track.innerHTML = projects
      .map(function (project, index) {
        var tagClass = "tag-pill--" + escapeHtml(project.tagColor || "blue");

        var visitBtn = project.liveUrl
          ? '<a href="' +
            escapeHtml(project.liveUrl) +
            '" class="neo-btn neo-btn--yellow neo-btn--sm" target="_blank" rel="noopener noreferrer">Visitar site ↗</a>'
          : "";

        var highlightsHtml = (project.highlights || [])
          .map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
          })
          .join("");

        var waMessage =
          "Olá Gabriel! Vi o projeto '" +
          project.title +
          "' (" +
          project.category +
          ") na sua vitrine e quero um site nesse nível para o meu negócio.";

        return (
          '<div class="carousel-slide" data-slide-index="' +
          index +
          '" aria-hidden="' +
          (index === 0 ? "false" : "true") +
          '">' +
          '<article class="project-card--slide">' +
          '<div class="showcase-top">' +
          '<div class="showcase-info">' +
          '<div class="showcase-badges">' +
          '<span class="tag-pill ' +
          tagClass +
          '">' +
          escapeHtml(project.category) +
          "</span>" +
          "</div>" +
          "<h3>" +
          escapeHtml(project.title) +
          "</h3>" +
          '<p class="project-summary">' +
          escapeHtml(project.summary) +
          "</p>" +
          "</div>" +
          '<div class="showcase-actions">' +
          '<div class="device-switch" role="group" aria-label="Tamanho da tela">' +
          '<button type="button" class="device-btn' +
          (defaultDevice === "desktop" ? " is-active" : "") +
          '" data-slide-device="desktop" aria-pressed="' +
          (defaultDevice === "desktop" ? "true" : "false") +
          '">💻 Computador</button>' +
          '<button type="button" class="device-btn' +
          (defaultDevice === "mobile" ? " is-active" : "") +
          '" data-slide-device="mobile" aria-pressed="' +
          (defaultDevice === "mobile" ? "true" : "false") +
          '">📱 Celular</button>' +
          "</div>" +
          visitBtn +
          "</div>" +
          "</div>" +
          '<div class="showcase-stage">' +
          '<div class="browser-shell is-' +
          defaultDevice +
          '">' +
          '<div class="window-bar">' +
          '<div class="window-dots" aria-hidden="true"><span></span><span></span><span></span></div>' +
          '<span class="window-title">' +
          escapeHtml(project.domain) +
          "</span>" +
          '<button type="button" class="unlock-status-btn" hidden>Travar rolagem ✕</button>' +
          "</div>" +
          buildSlideStageHtml(project, index) +
          "</div>" +
          "</div>" +
          '<div class="showcase-bottom">' +
          '<ul class="project-highlights">' +
          highlightsHtml +
          "</ul>" +
          '<a href="' +
          escapeHtml(buildWhatsAppUrl(waMessage)) +
          '" class="neo-btn neo-btn--green neo-btn--sm" target="_blank" rel="noopener noreferrer">Quero um site nesse estilo →</a>' +
          "</div>" +
          "</article>" +
          "</div>"
        );
      })
      .join("");

    if (dotsContainer) {
      dotsContainer.innerHTML = projects
        .map(function (project, index) {
          return (
            '<button type="button" class="carousel-dot' +
            (index === 0 ? " is-active" : "") +
            '" data-slide-to="' +
            index +
            '" aria-label="Ver projeto ' +
            (index + 1) +
            ": " +
            escapeHtml(project.title) +
            '" aria-pressed="' +
            (index === 0 ? "true" : "false") +
            '"></button>'
          );
        })
        .join("");
    }

    var slides = Array.prototype.slice.call(track.querySelectorAll(".carousel-slide"));
    var dots = dotsContainer
      ? Array.prototype.slice.call(dotsContainer.querySelectorAll(".carousel-dot"))
      : [];

    function lockAllLiveIframes() {
      slides.forEach(function (slide) {
        var viewport = slide.querySelector(".stage-viewport--live");
        var lockBtn = slide.querySelector(".unlock-status-btn");
        if (viewport) {
          viewport.classList.remove("is-interactive");
        }
        if (lockBtn) {
          lockBtn.hidden = true;
        }
      });
    }

    function applyDesktopScalingForSlide(slide) {
      var stage = slide.querySelector(".showcase-stage");
      var shell = slide.querySelector(".browser-shell");
      var viewport = slide.querySelector(".stage-viewport");
      if (!stage || !shell || !viewport) {
        return;
      }

      var targetEl =
        viewport.querySelector(".live-iframe") ||
        viewport.querySelector(".demo-scroll-viewport");
      if (!targetEl) {
        return;
      }

      var isDesktopMode = shell.classList.contains("is-desktop");
      var stageStyles = window.getComputedStyle(stage);
      var padX =
        (parseFloat(stageStyles.paddingLeft) || 0) +
        (parseFloat(stageStyles.paddingRight) || 0);
      var shellBorderX = 6;
      var targetDesktopWidth = stage.clientWidth - padX - shellBorderX;

      if (isDesktopMode && targetDesktopWidth > 0 && targetDesktopWidth < 820) {
        var virtualWidth = 1140;
        var scale = targetDesktopWidth / virtualWidth;
        var viewportHeight = viewport.clientHeight || 460;
        shell.classList.add("is-scaled");
        targetEl.style.width = virtualWidth + "px";
        targetEl.style.height = Math.round(viewportHeight / scale) + "px";
        targetEl.style.transform = "scale(" + scale.toFixed(4) + ")";
        targetEl.style.transformOrigin = "top left";
      } else {
        shell.classList.remove("is-scaled");
        targetEl.style.width = "";
        targetEl.style.height = "";
        targetEl.style.transform = "";
        targetEl.style.transformOrigin = "";
      }
    }

    function refreshAllScaling() {
      slides.forEach(applyDesktopScalingForSlide);
    }

    function setSlideDevice(slide, mode) {
      var shell = slide.querySelector(".browser-shell");
      if (!shell) {
        return;
      }

      shell.classList.remove("is-desktop", "is-mobile");
      shell.classList.add(mode === "mobile" ? "is-mobile" : "is-desktop");

      slide.querySelectorAll("[data-slide-device]").forEach(function (btn) {
        var active = btn.getAttribute("data-slide-device") === mode;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });

      applyDesktopScalingForSlide(slide);
    }

    function updateSlideFocusability(activeIdx) {
      slides.forEach(function (slide, idx) {
        var isHidden = idx !== activeIdx;
        slide.setAttribute("aria-hidden", isHidden ? "true" : "false");
        slide.querySelectorAll("a, button, iframe, [tabindex]").forEach(function (el) {
          if (isHidden) {
            if (!el.hasAttribute("data-orig-tabindex")) {
              el.setAttribute("data-orig-tabindex", el.getAttribute("tabindex") || "");
            }
            el.setAttribute("tabindex", "-1");
          } else {
            var orig = el.getAttribute("data-orig-tabindex");
            if (orig) {
              el.setAttribute("tabindex", orig);
            } else if (el.hasAttribute("data-orig-tabindex")) {
              el.removeAttribute("tabindex");
            }
          }
        });
      });
    }

    function ensureSlideIframeLoaded(slide) {
      var iframe = slide.querySelector(".live-iframe[data-src]");
      if (iframe) {
        iframe.setAttribute("src", iframe.getAttribute("data-src"));
        iframe.removeAttribute("data-src");
      }
    }

    function goToSlide(targetIndex) {
      lockAllLiveIframes();
      currentIndex = ((targetIndex % total) + total) % total;
      track.style.transform = "translateX(-" + currentIndex * 100 + "%)";

      if (counterEl) {
        counterEl.textContent = currentIndex + 1 + " / " + total;
      }

      dots.forEach(function (dot, idx) {
        var active = idx === currentIndex;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", active ? "true" : "false");
      });

      ensureSlideIframeLoaded(slides[currentIndex]);
      updateSlideFocusability(currentIndex);
      window.requestAnimationFrame(function () {
        applyDesktopScalingForSlide(slides[currentIndex]);
      });
    }

    track.addEventListener("click", function (event) {
      var slide = event.target.closest(".carousel-slide");
      if (!slide) {
        return;
      }

      var deviceBtn = event.target.closest("[data-slide-device]");
      if (deviceBtn) {
        setSlideDevice(slide, deviceBtn.getAttribute("data-slide-device"));
        return;
      }

      var guardBtn = event.target.closest(".iframe-guard");
      if (guardBtn) {
        var viewport = slide.querySelector(".stage-viewport--live");
        var lockBtn = slide.querySelector(".unlock-status-btn");
        if (viewport) {
          viewport.classList.add("is-interactive");
        }
        if (lockBtn) {
          lockBtn.hidden = false;
        }
        return;
      }

      var unlockBtn = event.target.closest(".unlock-status-btn");
      if (unlockBtn) {
        lockAllLiveIframes();
        return;
      }

      var demoJump = event.target.closest("[data-demo-jump]");
      if (demoJump) {
        var jumpHash = demoJump.getAttribute("data-demo-jump");
        var demoVp = slide.querySelector(".demo-scroll-viewport");
        var dest = slide.querySelector('[data-demo-section="' + jumpHash + '"]');
        if (demoVp && dest) {
          demoVp.scrollTo({ top: dest.offsetTop, behavior: "smooth" });
        }
        return;
      }

      var demoAction = event.target.closest("[data-demo-action]");
      if (demoAction) {
        var feedback = slide.querySelector(".demo-action-feedback");
        if (feedback) {
          feedback.innerHTML =
            '<span class="demo-toast">Botão de demonstração: no seu site real, ele abre direto o seu WhatsApp!</span>';
        }
      }
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".browser-shell")) {
        lockAllLiveIframes();
      }
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goToSlide(Number(dot.getAttribute("data-slide-to")));
      });
    });

    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToSlide(currentIndex - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });

    track.addEventListener("transitionend", function (event) {
      if (event.target.classList && event.target.classList.contains("browser-shell")) {
        var slide = event.target.closest(".carousel-slide");
        if (slide) {
          applyDesktopScalingForSlide(slide);
        }
      }
    });

    window.addEventListener("resize", refreshAllScaling);
    goToSlide(0);
  }

  /* ========================================================================
     4. CHIPS DE ASSUNTO DO CONTATO E COPIAR E-MAIL
     ======================================================================== */
  function setupContactInteractions() {
    var mainCta = document.getElementById("main-whatsapp-cta");
    var chips = document.querySelectorAll(".topic-chip");

    if (mainCta && chips.length) {
      var initialChip = document.querySelector(".topic-chip.is-selected") || chips[0];
      mainCta.setAttribute(
        "href",
        buildWhatsAppUrl(initialChip.getAttribute("data-topic"))
      );

      chips.forEach(function (chip) {
        chip.addEventListener("click", function () {
          chips.forEach(function (item) {
            item.classList.remove("is-selected");
            item.setAttribute("aria-checked", "false");
          });
          chip.classList.add("is-selected");
          chip.setAttribute("aria-checked", "true");
          mainCta.setAttribute(
            "href",
            buildWhatsAppUrl(chip.getAttribute("data-topic"))
          );
        });
      });
    }

    var copyBtn = document.getElementById("copy-email-btn");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var emailText = config.email || "gabriel.ccavalcante@gmail.com";

        function showCopiedState() {
          copyBtn.textContent = "Copiado!";
          copyBtn.classList.add("is-copied");
          window.setTimeout(function () {
            copyBtn.textContent = "Copiar";
            copyBtn.classList.remove("is-copied");
          }, 2200);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(emailText)
            .then(showCopiedState)
            .catch(function () {
              fallbackCopy(emailText);
              showCopiedState();
            });
        } else {
          fallbackCopy(emailText);
          showCopiedState();
        }
      });
    }
  }

  function fallbackCopy(text) {
    var input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      // Silencioso caso o navegador bloqueie cópia programática
    }
    document.body.removeChild(input);
  }

  /* ========================================================================
     5. MENU MOBILE
     ======================================================================== */
  function setupMobileMenu() {
    var toggleBtn = document.getElementById("mobile-menu-toggle");
    var drawer = document.getElementById("mobile-drawer");
    if (!toggleBtn || !drawer) {
      return;
    }

    function setOpen(open) {
      drawer.hidden = !open;
      toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
      toggleBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    }

    toggleBtn.addEventListener("click", function () {
      setOpen(drawer.hidden);
    });

    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  /* ========================================================================
     INICIALIZAÇÃO
     ======================================================================== */
  document.addEventListener("DOMContentLoaded", function () {
    hydrateStaticData();
    setupProjectsCarousel();
    setupContactInteractions();
    setupMobileMenu();
  });
})();
