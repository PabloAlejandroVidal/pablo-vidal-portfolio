import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ProjectsComponent } from '../projects/projects.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProjectsComponent, AboutComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  public translation = inject(TranslationService);
  readonly language$ = this.translation.languageChanges$;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private observer?: IntersectionObserver;
  private readonly preloadObservers: IntersectionObserver[] = [];
  private activeSectionId = 'home';
  private alignScrollTimer?: number;
  private pendingAlignmentSectionId?: string;
  private sections: HTMLElement[] = [];
  private isProgrammaticScroll = false;
  private programmaticTarget?: HTMLElement;
  private programmaticScrollTimer?: number;
  private currentRoute = '/';
  private targetRoute = '/';
  private skipNextRouteScroll = false;
  readonly projectsReady = signal(false);
  readonly aboutReady = signal(false);
  readonly contactReady = signal(false);

  ngAfterViewInit(): void {
    this.sections = Array.from(
      document.querySelectorAll<HTMLElement>('.home__section[data-route]'),
    );

    this.route.params.subscribe((params) => {
      const section = params['section'] ?? 'home';
      this.currentRoute = section === 'home' ? '/' : `/${section}`;
      if (this.skipNextRouteScroll) {
        this.skipNextRouteScroll = false;
        return;
      }
      if (section !== this.activeSectionId) {
        requestAnimationFrame(() => this.scrollToSection(section));
      }
    });

    this.observer = new IntersectionObserver(
      () => this.updateActiveSection(),
      { threshold: [0, 0.5, 1] },
    );

    this.sections.forEach((section) => {
      this.observer?.observe(section);

      const preloadObserver = new IntersectionObserver(
        () => this.prepareSection(section.id),
        { rootMargin: '800px 0px' },
      );
      this.preloadObservers.push(preloadObserver);
      preloadObserver.observe(section);
    });

    window.addEventListener('scroll', this.onWindowScroll, { passive: true });
    this.scheduleActiveSectionUpdate();
  }

  private readonly onWindowScroll = (): void => this.scheduleActiveSectionUpdate();

  private scheduleActiveSectionUpdate(): void {
    if (this.isProgrammaticScroll) {
      this.finishProgrammaticScrollIfAtTarget();
      return;
    }
    window.clearTimeout(this.alignScrollTimer);
    this.updateActiveSection();
    this.schedulePendingAlignment();
  }

  private updateActiveSection(): void {
    const viewportHeight = window.innerHeight;
    const currentSection = this.sections.reduce((mostVisible, section) => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.max(
        0,
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0),
      );
      const mostVisibleRect = mostVisible.getBoundingClientRect();
      const mostVisibleHeight = Math.max(
        0,
        Math.min(mostVisibleRect.bottom, viewportHeight) - Math.max(mostVisibleRect.top, 0),
      );

      // In a tie, keep the current section to avoid flickering at boundaries.
      return visibleHeight > mostVisibleHeight ? section : mostVisible;
    }, this.sections[0]);

    if (!currentSection || currentSection.id === this.activeSectionId) return;

    this.sections.forEach((section) =>
      section.classList.toggle('home__section--active', section === currentSection),
    );

    this.activeSectionId = currentSection.id;
    this.targetRoute = currentSection.dataset['route'] ?? '/';
    this.updateRouteFromScroll();
  }

  private updateRouteFromScroll(): void {
    if (!this.isProgrammaticScroll && this.targetRoute !== this.currentRoute) {
      this.skipNextRouteScroll = true;
      this.router.navigateByUrl(this.targetRoute, { replaceUrl: true });
      const sectionId = this.targetRoute === '/' ? 'home' : this.targetRoute.slice(1);
      this.pendingAlignmentSectionId = sectionId;
      this.schedulePendingAlignment();
      return;
    }
  }

  private schedulePendingAlignment(): void {
    if (!this.pendingAlignmentSectionId || this.isProgrammaticScroll) return;

    const sectionId = this.pendingAlignmentSectionId;
    window.clearTimeout(this.alignScrollTimer);
    this.alignScrollTimer = window.setTimeout(() => {
      if (this.pendingAlignmentSectionId !== sectionId) return;
      this.pendingAlignmentSectionId = undefined;
      this.scrollToSection(sectionId);
    }, 200);
  }

  private prepareSection(sectionId: string): void {
    if (sectionId === 'projects') this.projectsReady.set(true);
    if (sectionId === 'about') this.aboutReady.set(true);
    if (sectionId === 'contact') this.contactReady.set(true);
  }

  private scrollToSection(sectionId: string): void {
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    this.isProgrammaticScroll = true;
    this.programmaticTarget = target;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.clearTimeout(this.programmaticScrollTimer);
    this.programmaticScrollTimer = window.setTimeout(
      () => this.finishProgrammaticScroll(),
      1200,
    );
  }

  private finishProgrammaticScrollIfAtTarget(): void {
    if (!this.programmaticTarget) return;

    const targetTop = this.programmaticTarget.getBoundingClientRect().top;
    const scrollMarginTop = parseFloat(
      getComputedStyle(this.programmaticTarget).scrollMarginTop,
    ) || 0;
    if (Math.abs(targetTop - scrollMarginTop) <= 2) {
      this.finishProgrammaticScroll();
    }
  }

  private finishProgrammaticScroll(): void {
    window.clearTimeout(this.programmaticScrollTimer);
    this.programmaticScrollTimer = undefined;
    this.isProgrammaticScroll = false;
    this.programmaticTarget = undefined;
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.preloadObservers.forEach((observer) => observer.disconnect());
    window.removeEventListener('scroll', this.onWindowScroll);
    window.clearTimeout(this.alignScrollTimer);
    window.clearTimeout(this.programmaticScrollTimer);
    this.pendingAlignmentSectionId = undefined;
  }
}
