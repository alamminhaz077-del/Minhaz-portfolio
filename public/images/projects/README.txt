PROJECT SCREENSHOTS
===================

This folder is for real screenshots of your projects. It is empty on purpose —
the cards currently use `src/components/ProjectCover.jsx`, which draws abstract
cover art. Drawing a fake screenshot of a project would be a fabrication, so the
portfolio does not do it.

HOW TO USE A REAL SCREENSHOT
----------------------------

1. Take a clean screenshot of the project (no browser chrome, 16:10 works best).
2. Save it here as a WebP, 1600x1000:

     public/images/projects/furniture-ecommerce.webp

   Use the project's `slug` from src/data/projects.js as the file name.

3. In src/components/ProjectCard.jsx, replace:

     <ProjectCover variant={project.cover} title={project.title} />

   with:

     <img
       src={`/images/projects/${project.slug}.webp`}
       alt={`${project.title} interface screenshot`}
       width="1600"
       height="1000"
       loading="lazy"
       decoding="async"
       className="h-full w-full object-cover"
     />

4. In src/pages/ProjectDetail.jsx, do the same for the large hero image and
   delete the "Cover illustration · add a real screenshot" caption below it.

5. Run `npm run check` and `npm run build`.

Keep each file under ~200 KB. If a screenshot is heavier, compress it at
https://squoosh.app before adding it.
