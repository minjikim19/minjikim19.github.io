"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteData } from "../../content/siteData";
import Image from "next/image";
import profilePhoto from "../../content/Minji.jpg";
import contactPhoto from "../../content/Minji2.png";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Modal from "@/components/Modal";
import { AccordionItem } from "@/components/Accordion";
import { FileText, Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeSectionRef = useRef<string | null>("hero");
  const [heroTitle, heroSubtitle] = siteData.hero.headline.split(" | ");

  const defaultExpanded = useMemo(
    () =>
      new Set(
        siteData.experience
          .filter((item) => item.defaultExpanded)
          .map((item) => item.id)
      ),
    []
  );

  const [expandedIds, setExpandedIds] = useState<Set<string>>(defaultExpanded);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[data-observe='true']")
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let nextActive: string | null = activeSectionRef.current;
        entries.forEach((entry) => {
          if (
            entry.intersectionRatio >= 0.4 &&
            entry.intersectionRatio <= 0.6
          ) {
            nextActive = entry.target.id;
          }
        });
        if (nextActive !== activeSectionRef.current) {
          setActiveSection(nextActive);
        }
      },
      { threshold: [0.4, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeProject = siteData.projects.find(
    (project) => project.id === activeProjectId
  );

  const toggleExperience = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="page">
      <Navbar
        items={siteData.nav}
        activeId={activeSection}
        brand={siteData.meta.title}
        ui={siteData.ui}
      />
      <main>
        <Section id="hero" className="hero">
          <div className="hero-grid">
            <div className="hero-text">
              <h1>
                <span className="hero-title">{heroTitle}</span>
                {heroSubtitle ? (
                  <span className="hero-subtitle">{heroSubtitle}</span>
                ) : null}
              </h1>
              {siteData.hero.subheadline ? (
                <p className="muted hero-subcopy">{siteData.hero.subheadline}</p>
              ) : null}
              <div className="hero-actions">
                <Button
                  label={siteData.ui.resumeCta}
                  href={siteData.links.resume as string}
                  ariaLabel={siteData.ui.resumeCta}
                  icon={<FileText size={16} aria-hidden="true" />}
                />
                <Button
                  label={siteData.ui.linkedinCta}
                  href={siteData.links.linkedin as string}
                  ariaLabel={siteData.ui.linkedinCta}
                  variant="secondary"
                  icon={<Linkedin size={16} aria-hidden="true" />}
                />
                <Button
                  label={siteData.ui.githubLink}
                  href={siteData.links.github as string}
                  ariaLabel={siteData.ui.githubLink}
                  variant="secondary"
                  icon={<Github size={16} aria-hidden="true" />}
                />
              </div>
            </div>
            <div className="hero-photo">
              <Image
                src={profilePhoto}
                alt={`${siteData.meta.title} profile photo`}
                width={400}
                priority
              />
            </div>
          </div>
        </Section>

        <Section id="what-i-do" title={siteData.sectionTitles.whatIDo}>
          <div className="grid-3">
            {siteData.whatIDo.map((item) => (
              <Card key={item.id}>
                <h3 className="card-title">{item.title}</h3>
                <p className="muted">{item.description}</p>
                {item.badges ? (
                  <div className="badge-row" style={{ marginTop: 16 }}>
                    {item.badges.map((badge) => (
                      <Badge key={badge} text={badge} />
                    ))}
                  </div>
                ) : null}
              </Card>
            ))}
          </div>
        </Section>

        <Section id="experience" title={siteData.sectionTitles.experience}>
          <div className="accordion">
            {siteData.experience.map((item) => {
              const isOpen = expandedIds.has(item.id);
              const toggleLabel = isOpen
                ? siteData.ui.accordionClose
                : siteData.ui.accordionOpen;

              return (
                <AccordionItem
                  key={item.id}
                  id={item.id}
                  title={`${item.company} — ${item.title}`}
                  subtitle={
                    <>
                      <span>{item.dates}</span>
                      <span>{item.location}</span>
                    </>
                  }
                  isOpen={isOpen}
                  onToggle={() => toggleExperience(item.id)}
                  toggleLabel={toggleLabel}
                >
                  <ul className="list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="badge-row">
                    {item.keySkills.map((skill) => (
                      <Badge key={skill} text={skill} />
                    ))}
                  </div>
                </AccordionItem>
              );
            })}
          </div>
        </Section>

        <Section id="projects" title={siteData.sectionTitles.projects}>
          <div className="grid-5">
            {siteData.projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className="project-card"
                onClick={() => setActiveProjectId(project.id)}
                aria-label={`${siteData.ui.projectOpen} ${project.name}`}
              >
                <Card>
                  <h3 className="card-title project-title">
                    <Image
                      src={project.logo}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                    />
                    <span>{project.name}</span>
                  </h3>
                  {project.period ? (
                    <p className="muted">{project.period}</p>
                  ) : null}
                  <p>{project.oneLiner}</p>
                </Card>
              </button>
            ))}
          </div>
        </Section>

        <Section id="leadership" title={siteData.sectionTitles.leadership}>
          <Card>
            <ul className="list">
              {siteData.leadershipBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Card>
        </Section>

        <Section id="contact" title="Contact me!" className="contact-section">
          <p className="muted">{siteData.contact.description}</p>
          <div className="contact-wrap">
            <div className="contact-photo">
              <Image
                src={contactPhoto}
                alt="Minji Kim contact photo"
                width={300}
              />
            </div>
            <div className="contact-actions">
              {siteData.contact.links.map((link) => {
                const icon =
                  link.label === "Email" ? (
                    <Mail size={16} aria-hidden="true" />
                  ) : link.label === "LinkedIn" ? (
                    <Linkedin size={16} aria-hidden="true" />
                  ) : (
                    <Github size={16} aria-hidden="true" />
                  );

                return (
                  <Button
                    key={link.label}
                    label={link.label}
                    href={link.href}
                    ariaLabel={link.ariaLabel}
                    variant="secondary"
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    icon={icon}
                  />
                );
              })}
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <div className="container">
          <p className="muted">{siteData.meta.description}</p>
        </div>
      </footer>

      <Modal
        isOpen={Boolean(activeProject)}
        title={activeProject?.name ?? ""}
        titleIcon={
          activeProject ? (
            <Image
              src={activeProject.logo}
              alt=""
              width={26}
              height={26}
              aria-hidden="true"
            />
          ) : null
        }
        onClose={() => setActiveProjectId(null)}
        closeLabel={siteData.ui.closeModal}
      >
        {activeProject ? (
          <div>
            <p className="muted">{activeProject.oneLiner}</p>
            <ul className="list">
              {activeProject.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="badge-row" style={{ marginBottom: 16 }}>
              {activeProject.techBadges.map((tech) => (
                <Badge key={tech} text={tech} />
              ))}
            </div>
            <div className="hero-actions">
              {activeProject.links?.live ? (
                <Button
                  label={siteData.ui.liveLink}
                  href={activeProject.links.live}
                  ariaLabel={siteData.ui.liveLink}
                  target="_blank"
                  rel="noreferrer"
                />
              ) : null}
              {activeProject.links?.github ? (
                <Button
                  label={siteData.ui.githubLink}
                  href={activeProject.links.github}
                  ariaLabel={siteData.ui.githubLink}
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
