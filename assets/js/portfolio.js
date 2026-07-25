document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 8);
});

const navToggle = document.getElementById("navToggle");
const navTabs = document.getElementById("navTabs");
navToggle.addEventListener("click", () => {
  navTabs.classList.toggle("open");
});
navTabs.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navTabs.classList.remove("open"));
});

const sectionIds = ["home", "about", "experience", "stack", "contact"];
const tabLinks = Array.from(navTabs.querySelectorAll("a[href^='#']"));
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      tabLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sectionIds.forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Hero code block: type out "class Rodrigo < TechLead" line by line.
const codeLines = [
  [{ t: "class ", c: "tok-kw" }, { t: "Rodrigo", c: "tok-class" }, { t: " < ", c: "tok-punc" }, { t: "TechLead", c: "tok-class" }],
  [{ t: "  def ", c: "tok-kw" }, { t: "initialize", c: "tok-class" }],
  [{ t: "    @role     = ", c: "tok-punc" }, { t: '"Tech Lead & Senior Fullstack Engineer"', c: "tok-str" }],
  [{ t: "    @focus    = ", c: "tok-punc" }, { t: '"arquitetura de pagamentos, Ruby on Rails, Go"', c: "tok-str" }],
  [{ t: "    @location = ", c: "tok-punc" }, { t: '"Brasil 🇧🇷"', c: "tok-str" }],
  [{ t: "    @projects = ", c: "tok-punc" }, { t: ":dezenas", c: "tok-sym" }, { t: "  ", c: "tok-punc" }, { t: "# em produção", c: "tok-cmt" }],
  [{ t: "  end", c: "tok-kw" }],
  [{ t: "end", c: "tok-kw" }],
];

const el = document.getElementById("typedCode");

function renderLineStatic(line) {
  const span = document.createElement("div");
  line.forEach((part) => {
    const s = document.createElement("span");
    s.className = part.c;
    s.textContent = part.t;
    span.appendChild(s);
  });
  return span;
}

function renderAll() {
  el.innerHTML = "";
  codeLines.forEach((line) => el.appendChild(renderLineStatic(line)));
}

async function typeCode() {
  el.innerHTML = "";
  for (const line of codeLines) {
    const row = document.createElement("div");
    el.appendChild(row);
    for (const part of line) {
      const span = document.createElement("span");
      span.className = part.c;
      row.appendChild(span);
      for (const ch of part.t) {
        span.textContent += ch;
        await new Promise((r) => setTimeout(r, 10));
      }
    }
    await new Promise((r) => setTimeout(r, 40));
  }
  const caret = document.createElement("span");
  caret.className = "caret";
  el.appendChild(caret);
}

if (prefersReducedMotion) {
  renderAll();
} else {
  typeCode();
}
