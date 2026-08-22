import { PROJECTS } from './projects.data';

describe('PROJECTS', () => {
  it('only exposes valid absolute URLs for hosted demos', () => {
    const projectsWithDemo = PROJECTS.filter((project) => project.liveUrl);

    expect(projectsWithDemo.length).toBe(3);
    projectsWithDemo.forEach((project) => {
      expect(project.liveUrl).toMatch(/^https:\/\//);
    });
  });
});
