# V2 resource organization

The repository keeps its existing buildless HTML/CSS/JavaScript structure. No media was moved, renamed, compressed or duplicated; current resource URLs remain valid.

| Folder | Contents prepared for Git |
| --- | --- |
| `assets/Registro ML/v2/` | Registro ML artwork, shared icons, posters and approved review copy |
| `assets/Motion DS/v2/` | Motion Level artwork, demos, posters and approved review copy |
| `assets/Menores/v2/` | Accounts for minors artwork, diagram assets and posters |
| `assets/Videos/Registro/` | Referenced Registro ML walkthroughs |
| `assets/Videos/Motion DS/` | Referenced Motion Level videos |
| `assets/Videos/Menores/` | Referenced accounts-for-minors walkthroughs |
| `assets/Videos/` | Explicitly allowed public Home videos and posters |
| `work/menores-mexico.html`, `js/menores-v2.js` | Existing local case page and bilingual configuration |
| `css/analytics.css`, `js/analytics.js` | Existing consent and analytics implementation |

`v2-public-resources.json` inventories 145 files (92,175,208 bytes) with relative paths, sizes and SHA-256 checksums. It covers resources previously unavailable from the committed V2, not every file in the site. None exceeds GitHub's 100 MiB per-file threshold. Existing public resources already in Git remain where they were.

## Protected local files

Switch HTML, case configuration, artwork, full videos, Home preview video and Home poster remain excluded from Git. An additional exclusion covers the untracked `assets/Switch países/` source folder. Unlisted videos stay excluded by default.

Use Git to prepare the repository: `.gitignore` does not filter a folder manually uploaded or copied through a web interface. The working folder still contains the protected files for local review; it is not a sanitized deployment directory. Do not upload the entire working folder manually.

## Scope and pending launch work

This change prepares the existing resources for versioning. It does not commit, push, publish, grant employer content clearance, or implement authentication. Review the resource inventory and the intended public content before publishing.

The next points remain separate: migrate the loopback-only review-copy loading; enable the minors public destination; reconcile content discrepancies; update SEO and analytics scope; implement authenticated delivery for Switch. The Home currently references Switch's excluded preview, so a public release must replace that reference or provide an explicitly authorized public teaser.

## Local verification — October 15, 2026

- All 145 inventoried files exist and are eligible for Git.
- Switch HTML/configuration, case artwork and videos, Home video/poster and the alternate source-art folder remain ignored.
- Existing paths and file bytes were preserved.
- No commit or deployment was performed.
