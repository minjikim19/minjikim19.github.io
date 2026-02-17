"use client";

import { useMemo, useState } from "react";
import { siteData } from "../../content/siteData";
import Image from "next/image";
import profilePhoto from "../../content/Minji.jpg";
import contactPhoto from "../../content/Minji2.png";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { AccordionItem } from "@/components/Accordion";
import { ExternalLink, FileText, Github, Linkedin, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [selectedProjectImageIndex, setSelectedProjectImageIndex] = useState(0);
  const [heroTitle, heroSubtitle] = siteData.hero.headline.split(" | ");
  const reduceMotion = useReducedMotion();

  const defaultExpanded = useMemo(
    () =>
      new Set(
        siteData.experience
          .filter((item) => item.defaultExpanded)
          .map((item) => item.id),
      ),
    [],
  );

  const [expandedIds, setExpandedIds] = useState<Set<string>>(defaultExpanded);
  const [expandedLeadershipIds, setExpandedLeadershipIds] = useState<Set<string>>(
    () => new Set(siteData.leadership.map((item) => item.id)),
  );

  const activeProject = siteData.projects.find(
    (project) => project.id === activeProjectId,
  );

  const openProjectModal = (projectId: string) => {
    setSelectedProjectImageIndex(0);
    setActiveProjectId(projectId);
  };

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

  const toggleLeadership = (id: string) => {
    setExpandedLeadershipIds((prev) => {
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
                  label={siteData.ui.githubLink}
                  href={siteData.links.github as string}
                  ariaLabel={siteData.ui.githubLink}
                  variant="secondary"
                  icon={<Github size={16} aria-hidden="true" />}
                />
                <Button
                  label={siteData.ui.linkedinCta}
                  href={siteData.links.linkedin as string}
                  ariaLabel={siteData.ui.linkedinCta}
                  variant="secondary"
                  icon={<Linkedin size={16} aria-hidden="true" />}
                />
              </div>
            </div>
            <div className="hero-photo">
              <Image
                src={profilePhoto}
                alt={`${siteData.meta.title} profile photo`}
                width={390}
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
            {siteData.experience.map((item, index) => {
              const isOpen = expandedIds.has(item.id);
              const toggleLabel = isOpen
                ? siteData.ui.accordionClose
                : siteData.ui.accordionOpen;

              return (
                <motion.div
                  key={item.id}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: reduceMotion ? 0.01 : 0.5,
                    ease: "easeOut",
                    delay: reduceMotion ? 0 : index * 0.18,
                  }}
                >
                  <AccordionItem
                    id={item.id}
                    title={
                      <span className="experience-title">
                        <Image
                          src={item.logo}
                          alt={`${item.company} logo`}
                          width={22}
                          height={22}
                          className="experience-logo"
                        />
                        <span>{`${item.company} - ${item.title}`}</span>
                      </span>
                    }
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
                </motion.div>
              );
            })}
          </div>
        </Section>

        <Section id="projects" title={siteData.sectionTitles.projects}>
          <div className="grid-5">
            {siteData.projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => openProjectModal(project.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openProjectModal(project.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${siteData.ui.projectOpen} ${project.name}`}
              >
                <Card
                  hoverY={-2}
                  hoverShadow="0 12px 24px rgba(12, 12, 12, 0.1)"
                >
                  <h3 className="card-title project-title">
                    <span className="project-title-main">
                      <Image
                        src={project.logo}
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                      />
                      <span>{project.name}</span>
                    </span>
                    <span className="project-hint-icon" aria-hidden="true">
                    </span>
                  </h3>
                  <button
                    type="button"
                    className="project-preview-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openProjectModal(project.id);
                    }}
                    aria-label={`${siteData.ui.projectOpen} ${project.name}`}
                  >
                    <Image
                      src={project.screenshots[0]}
                      alt={`${project.name} screenshot preview`}
                      className="project-preview-image"
                    />
                  </button>
                  <p>{project.oneLiner}</p>
                </Card>
              </div>
            ))}
          </div>
        </Section>

        <Section id="leadership" title={siteData.sectionTitles.leadership}>
          <div className="accordion">
            {siteData.leadership.map((item) => {
              const isOpen = expandedLeadershipIds.has(item.id);
              const toggleLabel = isOpen
                ? `Collapse leadership details for ${item.organization}`
                : `Expand leadership details for ${item.organization}`;

              return (
                <AccordionItem
                  key={item.id}
                  id={item.id}
                  title={item.role}
                  subtitle={
                    <>
                      <span>{item.organization}</span>
                      <span>{item.dates}</span>
                    </>
                  }
                  isOpen={isOpen}
                  onToggle={() => toggleLeadership(item.id)}
                  toggleLabel={toggleLabel}
                >
                  {isOpen && item.image ? (
                    <Image
                      src={item.image}
                      alt={`${item.organization} activity`}
                      width={110}
                      className="experience-logo"
                      style={{
                        float: "right",
                        marginLeft: 12,
                        marginBottom: 8,
                        borderRadius: 12,
                        border: "1px solid var(--border)",
                        boxShadow: "0 8px 16px rgba(12, 12, 12, 0.08)",
                        filter: "saturate(0.9)",
                      }}
                    />
                  ) : null}
                  <ul className="list">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </AccordionItem>
              );
            })}
          </div>
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
            {activeProject.screenshots.length === 1 ? (
              <Image
                src={activeProject.screenshots[0]}
                alt={`${activeProject.name} screenshot`}
                className="modal-project-image"
              />
            ) : (
              <div className="modal-gallery">
                <div className="modal-gallery-main">
                  <Image
                    src={
                      activeProject.screenshots[
                        Math.min(
                          selectedProjectImageIndex,
                          activeProject.screenshots.length - 1,
                        )
                      ]
                    }
                    alt={`${activeProject.name} screenshot ${
                      selectedProjectImageIndex + 1
                    }`}
                    className="modal-project-image"
                  />
                  <span className="modal-gallery-count" aria-hidden="true">
                    {selectedProjectImageIndex + 1}/{activeProject.screenshots.length}
                  </span>
                </div>
                <div className="modal-thumbs" role="list">
                  {activeProject.screenshots.map((screenshot, index) => (
                    <button
                      key={`${activeProject.id}-shot-${index + 1}`}
                      type="button"
                      className={`modal-thumb${
                        index === selectedProjectImageIndex ? " active" : ""
                      }`}
                      onClick={() => setSelectedProjectImageIndex(index)}
                      aria-label={`View screenshot ${index + 1} of ${activeProject.screenshots.length}`}
                    >
                      <Image
                        src={screenshot}
                        alt=""
                        width={100}
                        height={60}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                  variant="secondary"
                  target="_blank"
                  rel="noreferrer"
                  icon={<ExternalLink size={16} aria-hidden="true" />}
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
                  icon={<Github size={16} aria-hidden="true" />}
                />
              ) : null}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
