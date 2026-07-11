/* ============================================================
   API SERVICE LAYER
   ------------------------------------------------------------
   Every fetch() call in the entire project lives in this file.
   Rendering/UI code never calls fetch() directly — it calls
   one of the exported functions below, which always returns
   a Promise that either resolves with data or rejects with a
   normalized Error. This keeps the "API logic" and "UI logic"
   fully separated, per Week 4 architecture requirements.
============================================================ */

const API_BASE_PATH = 'data';

/**
 * Generic JSON fetcher used internally by every getX() function.
 * Centralizes:
 *  - the actual fetch() call
 *  - response.ok checking
 *  - JSON parsing
 *  - error normalization (so callers always catch a real Error)
 *
 * @param {string} resource - filename inside /data, e.g. "profile.json"
 * @returns {Promise<any>}
 */
async function fetchResource(resource) {
  const url = `${API_BASE_PATH}/${resource}`;

  let response;
  try {
    response = await fetch(url);
  } catch (networkErr) {
    // Network failure, offline, CORS issue, etc.
    throw new Error(`Network error while fetching ${resource}: ${networkErr.message}`);
  }

  if (!response.ok) {
    throw new Error(`Failed to load ${resource} (status ${response.status})`);
  }

  try {
    return await response.json();
  } catch (parseErr) {
    throw new Error(`Failed to parse ${resource} as JSON: ${parseErr.message}`);
  }
}

/* ============================================================
   PUBLIC API — one function per resource
============================================================ */

/**
 * Hero + About section content (name, bio, socials, stats, etc.)
 * @returns {Promise<Object>}
 */
export function getProfile() {
  return fetchResource('profile.json');
}

/**
 * Skills array for the Skills section.
 * @returns {Promise<Array>}
 */
export function getSkills() {
  return fetchResource('skills.json');
}

/**
 * Projects array for the Projects section + Project Modal.
 * @returns {Promise<Array>}
 */
export function getProjects() {
  return fetchResource('projects.json');
}

/**
 * Contact details (email, phone, address, social links).
 * @returns {Promise<Object>}
 */
export function getContact() {
  return fetchResource('contact.json');
}

/**
 * Blog articles for the Blog section + Article Modal.
 * @returns {Promise<Array>}
 */
export function getBlogPosts() {
  return fetchResource('blog.json');
}
