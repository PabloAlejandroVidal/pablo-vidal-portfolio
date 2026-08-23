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
  private currentRoute = '/';
  private targetRoute = '/';
  private skipNextRouteScroll = false;
  private readonly debugEnabled = true;
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
      this.debug('route received', {
        section,
        currentRoute: this.currentRoute,
        skipNextRouteScroll: this.skipNextRouteScroll,
      });
      if (this.skipNextRouteScroll) {
        this.skipNextRouteScroll = false;
        this.debug('route scroll skipped: navigation came from user scroll');
        return;
      }
      if (section !== this.activeSectionId) {
        this.debug('route requests programmatic scroll', { section });
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
      this.debug('scroll event ignored: programmatic scroll');
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
    this.debug('active section updated', {
      section: currentSection.id,
      targetRoute: this.targetRoute,
    });
    this.updateRouteFromScroll();
  }

  private updateRouteFromScroll(): void {
    if (!this.isProgrammaticScroll && this.targetRoute !== this.currentRoute) {
      this.skipNextRouteScroll = true;
      this.debug('route changing from user scroll', {
        from: this.currentRoute,
        to: this.targetRoute,
      });
      this.router.navigateByUrl(this.targetRoute, { replaceUrl: true });
      const sectionId = this.targetRoute === '/' ? 'home' : this.targetRoute.slice(1);
      this.pendingAlignmentSectionId = sectionId;
      this.schedulePendingAlignment();
      return;
    }
    this.debug('route unchanged after scroll', {
      currentRoute: this.currentRoute,
      targetRoute: this.targetRoute,
    });
  }

  private schedulePendingAlignment(): void {
    if (!this.pendingAlignmentSectionId || this.isProgrammaticScroll) return;

    const sectionId = this.pendingAlignmentSectionId;
    window.clearTimeout(this.alignScrollTimer);
    this.alignScrollTimer = window.setTimeout(() => {
      if (this.pendingAlignmentSectionId !== sectionId) return;
      this.pendingAlignmentSectionId = undefined;
      this.debug('delayed section alignment', { sectionId });
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
      this.debug('programmatic scroll target not found', { sectionId });
      return;
    }

    this.isProgrammaticScroll = true;
    this.debug('programmatic scroll started', { sectionId });
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      this.isProgrammaticScroll = false;
      this.updateActiveSection();
      this.targetRoute = sectionId === 'home' ? '/' : `/${sectionId}`;
      this.debug('programmatic scroll ended', {
        sectionId,
        currentRoute: this.currentRoute,
        targetRoute: this.targetRoute,
      });
    }, 1000);
  }

  private debug(message: string, details?: Record<string, unknown>): void {
    if (!this.debugEnabled) return;
    console.log(`[landing-debug] ${message}`, details ?? '');
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.preloadObservers.forEach((observer) => observer.disconnect());
    window.removeEventListener('scroll', this.onWindowScroll);
    window.clearTimeout(this.alignScrollTimer);
    this.pendingAlignmentSectionId = undefined;
    console.log('[landing-debug] ngOnDestroy');
  }
}
