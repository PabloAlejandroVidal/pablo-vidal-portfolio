import { PROJECTS } from './projects.data';

describe('PROJECTS', () => {
  it('only exposes valid absolute URLs for hosted demos', () => {
    const projectsWithDemo = PROJECTS.filter((project) => project.liveUrl);

    expect(projectsWithDemo.length).toBe(3);
    projectsWithDemo.forEach((project) => {
      expect(project.liveUrl).toMatch(/^https:\/\//);
    });
  });

  it('includes La Comanda as a repository-only backend project', () => {
    const laComanda = PROJECTS.find((project) => project.id === 'laComanda');

    expect(laComanda).toBeTruthy();
    expect(laComanda?.liveUrl).toBeUndefined();
    expect(laComanda?.repoUrl).toBe('https://github.com/PabloAlejandroVidal/LaComanda-Slim-API');
  });

  it('does not include the portfolio as a featured project', () => {
    expect(PROJECTS.some((project) => String(project.id) === 'portfolio')).toBeFalse();
  });
});
